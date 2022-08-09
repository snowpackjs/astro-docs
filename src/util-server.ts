/*
	This file contains server-side utilities using features that don't work in a browser.
	Do not import this file from a hydrated client-side component.
*/

import EleventyFetch from '@11ty/eleventy-fetch';

export type CachedFetchOptions = {
	duration?: string;
	verbose?: boolean;
};

export async function cachedFetch(
	url: string,
	fetchOptions = {},
	{ duration = '5m', verbose = false }: CachedFetchOptions = {}
) {
	let status = 200;
	let statusText = 'OK';
	let buffer: Buffer | undefined;

	try {
		buffer = await EleventyFetch(url, {
			duration,
			verbose,
			type: 'buffer',
			fetchOptions,
		});
	} catch (error) {
		const msg: string = error?.message || error.toString();
		const matches = msg.match(/^Bad response for (.*) \(.*?\): (.*)$/);
		status = parseInt(matches?.[2] || '') || 404;
		statusText = matches?.[3] || msg;
	}

	return {
		ok: status >= 200 && status <= 299,
		status,
		statusText,
		body: buffer,
		json: () => buffer && JSON.parse(buffer.toString()),
		text: () => buffer?.toString(),
	};
}
