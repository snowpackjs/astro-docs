import { LinkCheckerOptions, LinkCheckerState } from './lib/linkcheck/base/base';
import { getPagePathnamesFromSitemap, parsePages } from './lib/linkcheck/steps/build-index';
import { findLinkIssues, addSourceFileAnnotations } from './lib/linkcheck/steps/find-issues';
import { outputIssues, outputAnnotationsForGitHub } from './lib/linkcheck/steps/output-issues';
import { handlePossibleAutofix } from './lib/linkcheck/steps/optional-autofix';
import { TargetExists } from './lib/linkcheck/checks/target-exists';
import { SameLanguage } from './lib/linkcheck/checks/same-language';
import { CanonicalUrl } from './lib/linkcheck/checks/canonical-url';
import { RelativeUrl } from './lib/linkcheck/checks/relative-url';

/**
 * Contains all link checking logic.
 */
class LinkChecker {
	readonly options: LinkCheckerOptions;
	readonly state: LinkCheckerState;

	constructor (options: LinkCheckerOptions) {
		this.options = options;
		this.state = new LinkCheckerState();
	}

	/**
	 * Checks all pages referenced by the sitemap for link issues
	 * and outputs the result to the console.
	 */
	run () {
		const options = this.options;
		const state = this.state;

		// Get the pathnames of all content pages from the sitemap contained in the build output
		const pagePathnames = getPagePathnamesFromSitemap(options);

		// Parse all pages referenced by the sitemap and build an index of their contents
		const allPages = parsePages(pagePathnames, options);

		// Find all link issues
		const linkIssues = findLinkIssues(allPages, options, state);
		
		// If issues were found, let our caller know through the process exit code
		process.exitCode = linkIssues.length > 0 ? 1 : 0;

		// Try to annotate all found issues with their Markdown source code locations
		addSourceFileAnnotations(linkIssues, options);

		// Output all found issues to the console
		outputIssues(linkIssues, state);

		// Run autofix logic
		const performedAutofix = handlePossibleAutofix(linkIssues, options, state);
		if (performedAutofix) {
			// If we just performed an autofix, repeat our entire run
			// to show the user what's left for them to fix manually
			this.run();
			return;
		}

		// If we're being run by a CI workflow, output annotations in GitHub format
		if (process.env.CI) {
			outputAnnotationsForGitHub(linkIssues);
		}
	}
}

// Use our class to check for link issues
const linkChecker = new LinkChecker({
	baseUrl: 'https://docs.astro.build',
	buildOutputDir: './dist',
	pageSourceDir: './src/pages',
	checks: [
		new TargetExists(),
		new SameLanguage({
			ignoredLinkPathnames: [
				'/lighthouse/',
			],
		}),
		new CanonicalUrl({
			ignoreMissingCanonicalUrl: [
				'/lighthouse/',
			],
		}),
		new RelativeUrl(),
	],
	autofix: process.argv.includes('--autofix'),
});

linkChecker.run();
