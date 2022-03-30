export const SIDEBAR = {
	en: [
		{ text: 'Start Here', header: true, type: 'learn' },
		{ text: 'Getting Started', link: 'en/getting-started' },
		{ text: 'Installation', link: 'en/install' },
		{ text: 'Editor Setup', link: 'en/editor-setup' },
		{ text: 'Migration Guide', link: 'en/migrate' },
		// REMOVE "Built with Astro": (Move into astro.build)
		{ text: 'Built with Astro', link: `en/integrations/integrations` },
		{ text: 'Astro vs. X', link: 'en/comparing-astro-vs-other-tools' },

		{ text: 'Core Concepts', header: true, type: 'learn' },
		// ADD: Why Astro?
		{ text: 'Partial Hydration', link: 'en/core-concepts/partial-hydration' },
		// ADD: Island Architecture

		{ text: 'Basics', header: true, type: 'learn' },
		{ text: 'Project Structure', link: 'en/core-concepts/project-structure' },
		{ text: 'Components', link: 'en/core-concepts/astro-components' },
		{ text: 'Pages', link: 'en/core-concepts/astro-pages' },
		{ text: 'Layouts', link: 'en/core-concepts/layouts' },
		{ text: 'Markdown', link: 'en/guides/markdown-content' },
		{ text: 'Static Assets', link: 'en/guides/imports' },

		{ text: 'Features', header: true, type: 'learn' },
		{ text: 'Configuring Astro', link: 'en/guides/configuring-astro' },
		{ text: 'CSS & Styling', link: 'en/guides/styling' },
		{ text: 'Debugging', link: 'en/guides/debugging' },
		{ text: 'Data Fetching', link: 'en/guides/data-fetching' },
		{ text: 'Deploy', link: 'en/guides/deploy' },
		{ text: 'Environment Variables', link: 'en/guides/environment-variables' },
		{ text: 'Import Aliases', link: 'en/guides/aliases' },
		{ text: 'Integrations', link: 'en/guides/integrations-guide' },
		{ text: 'RSS', link: 'en/guides/rss' },
		{ text: 'UI Frameworks', link: 'en/core-concepts/framework-components' },
		
		{ text: 'Reference', header: true, type: 'api' },
		{
			text: 'Configuration',
			link: 'en/reference/configuration-reference',
		},
		{ text: 'CLI', link: 'en/reference/cli-reference' },
		{ text: 'Runtime API', link: 'en/reference/api-reference' },
		{ text: 'Integrations API', link: 'en/reference/integrations-reference' },
		{ text: 'Routing Rules', link: 'en/core-concepts/routing' },
		// ADD: Astro Component Syntax
		// ADD: Markdown Syntax
		{ text: 'NPM Package Format', link: 'en/guides/publish-to-npm' },
	],
	de: [
		{ text: 'Einrichtung', header: true, type: 'learn' },
		{ text: 'Erste Schritte', link: 'de/getting-started' },
		{ text: 'Schnellstart', link: 'de/quick-start' },
		{ text: 'Installation', link: 'de/installation' },
		{ text: 'Astro vs. X', link: 'de/comparing-astro-vs-other-tools' },
		{ text: 'Umstellung auf v0.21', link: 'de/migration/0.21.0' },

		{ text: 'Grundlagen', header: true, type: 'learn' },
		{ text: 'Projektstruktur', link: 'de/core-concepts/project-structure' },
		{ text: 'Astro-Komponenten', link: 'de/core-concepts/astro-components' },
		{ text: 'Astro-Seiten', link: 'de/core-concepts/astro-pages' },
		{ text: 'Layouts', link: 'de/core-concepts/layouts' },
		{ text: 'Routing', link: 'de/core-concepts/routing' },
		{ text: 'Partial Hydration', link: 'de/core-concepts/component-hydration' },

		{ text: 'Anleitungen', header: true, type: 'learn' },
		{ text: 'Styling & CSS', link: 'de/guides/styling' },

		{ text: 'Referenz', header: true, type: 'api' },
	],
	nl: [
		{ text: 'Welkom', header: true, type: 'learn' },
		{ text: 'Beginnen', link: 'nl/getting-started' },
		{ text: 'Snel start', link: 'nl/quick-start' },
	],
	fi: [
		{ text: 'Tervetuloa', header: true, type: 'learn' },
		{ text: 'Aloittaminen', link: 'fi/getting-started' },
		{ text: 'Pika-aloitus', link: 'fi/quick-start' },
		{ text: 'Asennus', link: 'fi/installation' },
	],
	es: [
		{ text: 'Configuración', header: true, type: 'learn' },
		{ text: 'Empezando', link: 'es/getting-started' },
		{ text: 'Comienzo rápido', link: 'es/quick-start' },
		{ text: 'Instalación', link: 'es/installation' },
		{ text: 'Astro vs. X', link: 'es/comparing-astro-vs-other-tools' },

		{ text: 'Fundamentos', header: true, type: 'learn' },
		{
			text: 'Estructura del Proyecto',
			link: 'es/core-concepts/project-structure',
		},
		{
			text: 'Sintaxis del Componente',
			link: 'es/core-concepts/astro-components',
		},
		{ text: 'Páginas', link: 'es/core-concepts/astro-pages' },
		{ text: 'Maquetas', link: 'es/core-concepts/layouts' },
		{ text: 'Enrutamiento', link: 'es/core-concepts/routing' },
		{
			text: 'Hidratación parcial',
			link: 'es/core-concepts/component-hydration',
		},

		{ text: 'Guías', header: true, type: 'learn' },
		{ text: 'Estilo y CSS', link: 'es/guides/styling' },
		{ text: 'Markdown', link: 'es/guides/markdown-content' },
		{ text: 'Depuración', link: 'es/guides/debugging' },
		{ text: 'Obtención de datos', link: 'es/guides/data-fetching' },
		{ text: 'RSS', link: 'es/guides/rss' },
		{ text: 'Importaciones admitidas', link: 'es/guides/imports' },
		{ text: 'Alias', link: 'es/guides/aliases' },
		{ text: 'Desplegar en la web', link: 'es/guides/deploy' },
		{ text: 'Publicar en npm', link: 'es/guides/publish-to-npm' },

		{ text: 'Referencia', header: true, type: 'api' },

		{ text: 'Referencia de API', link: 'es/reference/api-reference' },
		{ text: 'Referencia de CLI', link: 'es/reference/cli-reference' },
		{
			text: 'Referencia de configuración',
			link: 'es/reference/configuration-reference',
		},

	],
	'zh-CN': [
		{ text: '起步', header: true, type: 'learn' },
		{ text: '入门指南', link: 'zh-CN/getting-started' },
		{ text: '快速入门', link: 'zh-CN/quick-start' },
		{ text: '安装指南', link: 'zh-CN/installation' },
		{ text: '模板样例', link: 'zh-CN/examples' },
		{
			text: 'Astro 对比其他框架',
			link: 'zh-CN/comparing-astro-vs-other-tools',
		},
	],
	'zh-TW': [
		{ text: '設定', header: true, type: 'learn' },
		{ text: '新手上路', link: 'zh-TW/getting-started' },
		{ text: '快速開始', link: 'zh-TW/quick-start' },
		{ text: '安裝', link: 'zh-TW/installation' },
	],
	bg: [
		{ text: 'Главни', header: true, type: 'learn' },
		{ text: 'Започваме!', link: 'bg/getting-started' },
	],
	fr: [
		{ text: 'Bienvenue', header: true, type: 'learn' },
		{ text: 'Bien démarrer', link: 'fr/getting-started' },
		{ text: 'Démarrage rapide', link: 'fr/quick-start' },
		{ text: 'Installation', link: 'fr/installation' },
	],
	bn: [
		{ text: 'সেটআপ', header: true, type: 'learn' },
		{ text: 'শুরু করুন', link: 'bn/getting-started' },
	],
	kr: [
		{ text: '환영합니다', header: true, type: 'learn' },
		{ text: '시작하기', link: 'kr/getting-started' },
	],
	ar: [
		{ text: 'التهيئة', header: true, type: 'learn' },
		{ text: 'باشر البدأ', link: 'ar/getting-started' },
	],
	da: [
		{ text: 'Velkommen', header: true, type: 'learn' },
		{ text: 'Introduktion', link: 'da/getting-started' },
	],
	ja: [
		{ text: 'セットアップ', header: true, type: 'learn' },
		{ text: 'はじめに', link: 'ja/getting-started' },
		{ text: 'クイックスタート', link: 'ja/quick-start' },
		{ text: 'インストール', link: 'ja/installation' },
		{ text: 'Astro vs. X', link: 'ja/comparing-astro-vs-other-tools' },

		{ text: '基本', header: true, type: 'learn' },
		{ text: 'ディレクトリ構成', link: 'ja/core-concepts/project-structure' },
	],
	ru: [
		{ text: 'Введение', header: true, type: 'learn' },
		{ text: 'Начало работы', link: 'ru/getting-started' },
		{ text: 'Быстрый старт', link: 'ru/quick-start' },
	],
	it: [
		{ text: 'Impostare', header: true, type: 'learn' },
		{ text: 'Come iniziare', link: 'it/getting-started' },
	],
	pl: [
		{ text: 'Konfiguracja', header: true, type: 'learn' },
		{ text: 'Na początek', link: 'pl/getting-started' },
	],
	hu: [
		{ text: 'Beállítás', header: true, type: 'learn' },
		{ text: 'Első Lépések', link: 'hu/getting-started' },
		{ text: 'Gyors Beállítás', link: 'hu/quick-start' },
		{ text: 'Telepítés', link: 'hu/installation' },
	],
};

export const SITE = {
	title: 'Astro Documentation',
	description: 'Build faster websites with less client-side Javascript.',
};

export const OPEN_GRAPH = {
	locale: 'en_US',
	image: {
		src: '/default-og-image.png?v=1',
		alt: 'astro logo on a starry expanse of space,' + ' with a purple saturn-like planet floating in the right foreground',
	},
	twitter: 'astrodotbuild',
};
