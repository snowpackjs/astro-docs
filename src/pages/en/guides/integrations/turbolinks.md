---
# NOTE: This file is auto-generated from 'scripts/generate-integration-pages.ts'
# Do not make edits to it directly, they will be overwritten.

layout: ~/layouts/MainLayout.astro
title: 'This integration is no longer actively supported'
i18nReady: false
---

[Turbolinks](https://github.com/turbolinks/turbolinks) is no longer under active development. The `@astrojs/turbolinks` integration has been deprecated.

## Looking for an alternative?

Check out [swup](https://swup.js.org/)! If you are using any `client:*` script for partial hydration, make sure to install the `@swup/scripts-plugin` to ensure components are rehydrated after a page navigation.

# @astrojs/turbolinks ⚡️

This **[Astro integration][astro-integration]** brings [Turbo](https://github.com/hotwired/turbo) to your Astro project.

Turbolinks is a plug-and-play solution to bring single page app (SPA) routing to your site. This brings performant navigation without the added complexity of a client-side JavaScript framework.

## Installation

There are two ways to add integrations to your project. Let's try the most convenient option first!

### (experimental) `astro add` command

Astro includes a CLI tool for adding first party integrations: `astro add`. This command will:

1.  (Optionally) Install all necessary dependencies and peer dependencies
2.  (Also optionally) Update your `astro.config.*` file to apply this integration

To install `@astrojs/turbolinks`, run the following from your project directory and follow the prompts:

```sh
# Using NPM
npx astro add turbolinks
# Using Yarn
yarn astro add turbolinks
# Using PNPM
pnpx astro add turbolinks
```

If you run into any hiccups, [feel free to log an issue on our GitHub](https://github.com/withastro/astro/issues) and try the manual installation steps below.

### Install dependencies manually

First, install the `@astrojs/turbolinks` integration like so:

    npm install @astrojs/turbolinks

Then, apply this integration to your `astro.config.*` file using the `integrations` property:

**astro.config.mjs**

```js
import turbolinks from '@astrojs/turbolinks';

export default {
  // ...
  integrations: [turbolinks()],
}
```

## Getting started

Turbo links, frames, and more should be ready-to-use with zero config. For instance, try navigating between different pages via links. You should no longer see browser refreshes! You will also find each page request passing through `turbolinks` under the "Network" tab in [your browser's dev tools](https://developer.chrome.com/docs/devtools/).

Head to [the Turbo handbook](https://turbo.hotwired.dev/handbook/introduction) for all options and features available. You can also check our [Astro Integration Documentation][astro-integration] for more on integrations.

[astro-integration]: https://docs.astro.build/en/guides/integrations-guide/

[astro-ui-frameworks]: https://docs.astro.build/en/core-concepts/framework-components/#using-framework-components
