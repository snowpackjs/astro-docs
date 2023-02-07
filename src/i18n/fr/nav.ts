/**
 * Ceci configure la barre latérale de navigation.
 * Toutes les autres langues suivent cet ordre/structure et reviendront à l'anglais pour toutes les entrées non traduites.
 */
import { NavDictionary } from '../translation-checkers';

export default NavDictionary({
	// Start Here
	startHere: 'Commencez ici',
	'getting-started': 'Bien démarrer',
	install: 'Installation',
	'editor-setup': "Configuration de l'éditeur de code",

	// Core Concepts
	coreConcepts: 'Concepts Fondamentaux',
	'concepts/why-astro': 'Pourquoi Astro ?',
	'concepts/mpa-vs-spa': 'MPA vs. SPA',
	'concepts/islands': 'Les îles Astro',

	// Basics
	basics: 'Les Bases',
	'core-concepts/project-structure': 'Structure du Projet',
	'core-concepts/astro-components': 'Composants',
	'core-concepts/astro-pages': 'Pages',
	'core-concepts/layouts': 'Layouts',
	'guides/markdown-content': 'Markdown et MDX',
	'guides/imports': 'Fichiers Statiques',
	'guides/troubleshooting': 'Dépannage',

	// Features
	features: 'Fonctionnalités',
	'guides/configuring-astro': 'Configurer Astro',
	'guides/styling': 'CSS et Style',
	'guides/fonts': 'Polices de Caractères',
	'guides/data-fetching': 'Récupération de Données',
	'guides/deploy': 'Déployer',
	'guides/environment-variables': "Variables d'Environnement",
	'guides/aliases': 'Alias d’Importation',
	'guides/integrations-guide': 'Intégrations',
	'guides/rss': 'Flux RSS',
	'guides/server-side-rendering': 'Rendu côté serveur (SSR)',
	'guides/typescript': 'TypeScript',
	'core-concepts/framework-components': 'Composants de Frameworks',

	// Référence
	reference: 'Référence',
	'reference/configuration-reference': 'Configuration',
	'reference/cli-reference': 'Lignes de Commandes',
	'reference/api-reference': "API d'Exécution",
	'reference/integrations-reference': "API d'Intégration",
	'reference/adapter-reference': 'API des adaptateurs (expérimental)',
	'core-concepts/routing': 'Règles de Routage',
	'reference/directives-reference': 'Utilisation des Directives',
	'guides/publish-to-npm': 'Format de Packet NPM',
});
