// Worker based on https://gist.github.com/JMPerez/8ca8d5ffcc0cc45a8b4e1c279efd8a94

/// <reference lib="webworker" />

// Force typescript to treat this file like a module, which will let us re-type `self`.
export type {};

//Use correct type for `self` inside of a service worker.
declare const self: ServiceWorkerGlobalScope;

const astroPriorityFiles = [
	/* $%_priority_files_%$ */
];
const astroOtherFiles = [
	/* $%_other_files_%$ */
];

const currentCache = 'main-/* $%_hash_%$ */';

const offlinePage = '/offline';

const networkTimeout = 3000;

function logInfo(...toLog) {
	console.info('%c[Offline worker]', 'color: #7e22ce', ...toLog);
}

function logWarning(...toLog) {
	console.warn('%c[Offline worker]', 'color: #ff5e00', ...toLog);
}

function clearAllOldCaches() {
	return caches.keys().then((cacheNames) => {
		return Promise.all(
			cacheNames.map((cacheName) => {
				if (cacheName !== currentCache) {
					logInfo(`Found old cache ${cacheName}. Removing...`);
					return caches.delete(cacheName);
				}
			})
		);
	});
}

async function addPriorityFiles() {
	logInfo('Downloading priority files...');

	try {
		const cache = await caches.open(currentCache);
		await cache.addAll(astroPriorityFiles);
	} catch (error) {
		logWarning(`Error downloading priority files: ${error}`);
	}

	logInfo('Priority files downloaded.');
}

async function addNonPriorityFiles() {
	logInfo('Downloading non-priority files...');

	try {
		const cache = await caches.open(currentCache);
		await cache.addAll(astroOtherFiles);
	} catch (error) {
		logWarning(`Error downloading non-priority files: ${error}`);
	}

	logInfo('Non-priority files downloaded.');
}

// Fetch the resource from the network
async function fromNetwork(request: Request): Promise<Response | undefined> {
	try {
		const { abort, signal } = new AbortController();

		const timeoutId = setTimeout(abort, networkTimeout);

		const response = await fetch(request, { signal });

		clearTimeout(timeoutId);

		updateCache(request, response);

		return response;
	} catch (error) {
		logWarning(`Failed to get file from network: ${error}`);
	}
}

// Fetch the resource from the cache
async function fromCache(request: Request): Promise<Response> {
	const cache = await caches.open(currentCache);

	const matching = await cache.match(request);
	const matchingRes = matching || (await cache.match(offlinePage));

	// If both the requested page & the offline page aren't cached, just don't
	// respond to the request and let the browser show it's offline UI
	if (!matchingRes) return new Response();

	matchingRes.headers.append('X-From-SW-Cache', 'true');
	matchingRes.headers.append('X-SW-Cache-name', currentCache);

	if (matchingRes.headers.get('Content-Type')?.startsWith('text/html')) {
		const body = await matchingRes.text();
		const bodyWithMetaTag =
			body + `<meta data-from-sw-cache="true" data-sw-cache-name="${currentCache}" />`;

		// Basically a clone of the original response, with a custom body
		return new Response(bodyWithMetaTag, {
			headers: matchingRes.headers,
			status: matchingRes.status,
			statusText: matchingRes.statusText,
		});
	}

	return matchingRes;
}

// Cache the current page to make it available for offline
function updateCache(request: Request, response: Response): Promise<void>;
function updateCache(request: Request): Promise<void>;
async function updateCache(arg1: Request, arg2?: Response) {
	const cache = await caches.open(currentCache);

	try {
		if (arg2 instanceof Request) await cache.put(arg1, arg2);
		else await cache.put(arg1, await fetch(arg1));
	} catch (error) {
		logWarning(`Failed to update cached file: ${error}`);
	}
}

// On install we download the priority files only,
// so that we can start handling requests as soon as possible
self.addEventListener('install', async (event) => {
	logInfo(`Installed.`);

	event.waitUntil(addPriorityFiles());
});

// Once the priority files are downloaded and the service worker
// is activated, we can start downloading the non-priority files
// and cleaning up old caches.
self.addEventListener('activate', async (event) => {
	logInfo('Activated.');

	self.clients.claim();

	event.waitUntil(addNonPriorityFiles());

	event.waitUntil(clearAllOldCaches());
});

// General strategy when making a request (eg if online try to fetch it
// from the network with a timeout, if something fails serve from cache).
// Also this function can't be async because that can lead to loads of weird
// issues with the browser 'responding' to the event when `event.respondWith`
// hasn't actually been called.
self.addEventListener('fetch', (event) => {
	const request: Request = event.request;
	const url = new URL(request.url);

	// Only cache GET requests. All other methods (including OPTIONS) should never be cached.
	// Also only cache requests to the same origin. This will avoid caching
	// analytics scripts and so on.
	if (request.method !== 'GET' || url.origin !== location.origin)
		return event.respondWith(fetch(request));

	event.respondWith(
		fromNetwork(request)
			.then((response) => {
				if (!response) return fromCache(request);
				return response;
			})
			.catch((error) => {
				logWarning(error);
				return new Response();
			})
	);
});
