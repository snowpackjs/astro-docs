import type { AstroGlobal } from 'astro';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { getLanguageFromURL } from '../util';
import type {
	DocSearchTranslation,
	NavDict,
	UIDict,
	UIDictionaryKeys,
	UILanguageKeys,
} from './translation-checkers';

/**
 * Convert the map of modules returned by `import.meta.globEager` to an object
 * mapping the language code from each module’s filepath to the module’s default export.
 */
function mapDefaultExports<T>(modules: Record<string, { default: T }>) {
	const exportMap: Record<string, T> = {};
	for (const [path, module] of Object.entries(modules)) {
		const [_dot, lang] = path.split('/');
		exportMap[lang] = module.default;
	}
	return exportMap;
}

/**
 * Get paths for all Markdown files that are contained in `dir` and its children.
 * We’re doing this manually instead of using `import.meta.glob` because that was triggering
 * all Markdown files to be reloaded by Astro when one file changed, which was exteremely slow.
 * @param dir The directory to search in.
 */
async function getAllMarkdownPaths(dir: URL, files: URL[] = []) {
	// Ensure a trailing slash so files are resolved correctly relative to this directory.
	if (dir.href.at(-1) !== '/') dir.pathname += '/';
	const entries = await readdir(dir, { withFileTypes: true });
	await Promise.all(
		entries.map(async (entry) => {
			if (entry.isDirectory()) {
				return await getAllMarkdownPaths(new URL(entry.name, dir), files);
			} else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
				files.push(new URL(entry.name, dir));
			}
		})
	);
	return files;
}

/** If a nav entry’s slug is not found, mark it as needing fallback content. */
async function markFallbackNavEntries(lang: string, nav: NavDict) {
	const dirURL = pathToFileURL(path.join(process.cwd(), `src/pages/${lang}/`));
	const urlToSlug = (url: URL) =>
		url.pathname.split(`/src/pages/${lang}/`)[1].replace(/\.mdx?$/, '');
	const markdownSlugs = new Set((await getAllMarkdownPaths(dirURL)).map(urlToSlug));

	for (const entry of nav) {
		if ('header' in entry) continue;
		if (!(markdownSlugs.has(entry.slug) || markdownSlugs.has(entry.slug + '/index'))) {
			entry.isFallback = true;
		}
	}
	return nav;
}

const translations = mapDefaultExports<UIDict>(import.meta.globEager('./*/ui.ts'));
const docsearchTranslations = mapDefaultExports<DocSearchTranslation>(
	import.meta.globEager('./*/docsearch.ts')
);
const navTranslations = mapDefaultExports<NavDict>(import.meta.globEager('./*/nav.ts'));

const fallbackLang = 'en';

/** Returns a dictionary of strings for use with DocSearch. */
export function getDocSearchStrings(Astro: AstroGlobal): DocSearchTranslation {
	const lang = getLanguageFromURL(Astro.url.pathname) || fallbackLang;
	// A shallow merge is sufficient here as most of the actual fallbacks are provided by DocSearch.
	return { ...docsearchTranslations[fallbackLang], ...docsearchTranslations[lang] };
}

/** Get the navigation sidebar content for the current language. */
export async function getNav(Astro: AstroGlobal): Promise<NavDict> {
	const lang = getLanguageFromURL(Astro.url.pathname) || fallbackLang;
	return await markFallbackNavEntries(lang, navTranslations[lang]);
}

/**
 * Create a helper function for getting translated strings.
 *
 * Within an Astro component, prefer the `UIString` component,
 * which only needs the key as it has access to the global Astro object.
 *
 * However, you can’t pass an Astro component as a prop to a framework component,
 * so this function creates a look-up method to get the string instead:
 *
 * @example
 * ---
 * import { useTranslations } from '~/i18n/util';
 * const t = useTranslations(Astro);
 * ---
 * <FrameworkComponent label={t('articleNav.nextPage')} />
 */
export function useTranslations(Astro: Readonly<AstroGlobal>): (key: UIDictionaryKeys) => string {
	const lang = getLanguageFromURL(Astro.url.pathname) || 'en';
	return useTranslationsForLang(lang as UILanguageKeys);
}

export function useTranslationsForLang(lang: UILanguageKeys): (key: UIDictionaryKeys) => string {
	return function getTranslation(key: UIDictionaryKeys) {
		const str = translations[lang]?.[key] || translations[fallbackLang][key];
		if (str === undefined) throw new Error(`Missing translation for “${key}” in “${lang}”.`);
		return str;
	};
}
