/**
 * Map of language codes to a written out language name.
 * Used to populate the language switcher in the navbar.
 */
let languages = {
	en: 'English',
	de: 'Deutsch',
	'pt-br': 'Português do Brasil',
	es: 'Español',
	'zh-cn': '简体中文',
	'zh-tw': '正體中文',
	fr: 'Français',
	ar: 'العربية',
	ja: '日本語',
	ko: '한국어',
	pl: 'Polski',
	ru: 'Русский',
} as const;

// Build for two languages only to speed up Astro's smoke tests
if (import.meta.env.PUBLIC_TWO_LANG) {
	// @ts-expect-error This conflicts with the const type above, but it's fine when building
	languages = {
		en: 'English',
		ko: '한국어',
	};
}

export default languages;

export const rtlLanguages = new Set(['ar']);
