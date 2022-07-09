---
# NOTE: This file is auto-generated from 'scripts/generate-integration-pages.ts'
#       and pulls content directly from the package’s README.
#       DO NOT MAKE EDITS TO THIS FILE DIRECTLY, THEY WILL BE OVERWRITTEN!
#       For corrections, please edit the package README at
#       https://github.com/withastro/astro/tree/main/packages/integrations/prefetch

layout: ~/layouts/MainLayout.astro
title: '@astrojs/prefetch 🔗'
category: other
i18nReady: false
---

## Why Prefetch?

Page load times play a big role in usability and overall enjoyment of a site. This integration brings the benefits of near-instant page navigations to your multi-page application (MPA) by prefetching page links when they are visible on screen.

To further improve the experience, especially on similar pages, stylesheets are also prefetched along with the HTML. This is particularly useful when navigating between tabs on a static site, where most of the page's content and styles don't change.

## Installation

<details>
  <summary>Quick Install</summary>
  <br/>

The experimental `astro add` command-line tool automates the installation for you. Run one of the following commands in a new terminal window. (If you aren't sure which package manager you're using, run the first command.) Then, follow the prompts, and type "y" in the terminal (meaning "yes") for each one.

```sh
# Using NPM
npx astro add prefetch
# Using Yarn
yarn astro add prefetch
# Using PNPM
pnpx astro add prefetch
```

Then, restart the dev server by typing `CTRL-C` and then `npm run astro dev` in the terminal window that was running Astro.

Because this command is new, it might not properly set things up. If that happens, [feel free to log an issue on our GitHub](https://github.com/withastro/astro/issues) and try the manual installation steps below.

</details>

<details>
  <summary>Manual Install</summary>

<br/>

First, install the `@astrojs/prefetch` package using your package manager. If you're using npm or aren't sure, run this in the terminal:

```sh
npm install @astrojs/prefetch
```

Then, apply this integration to your `astro.config.*` file using the `integrations` property:

**astro.config.mjs**

```js
import prefetch from '@astrojs/prefetch';

export default {
  // ...
  integrations: [prefetch()],
}
```

Then, restart the dev server.

</details>

## Usage

When you install the integration, the prefetch script is automatically added to every page in the project. Just add `rel="prefetch"` to any `<a />` links on your page and you're ready to go!

## Configuration

The Astro Prefetch integration handles which links on the site are prefetched and it has its own options. Change these in the `astro.config.mjs` file which is where your project's integration settings live.

<details>
  <summary><strong>config.selector</strong></summary>

  <br/>

By default the prefetch script searches the page for any links that include a `rel="prefetch"` attribute, ex: `<a rel="prefetch" />` or `<a rel="nofollow prefetch" />`. This behavior can be changed in your `astro.config.*` file to use a custom query selector when finding prefetch links.

  <br/>

```js
import prefetch from '@astrojs/prefetch';

export default {
  // ...
  integrations: [prefetch({
    // Only prefetch links with an href that begins with `/products`
    selector: "a[href^='/products']"
  })],
}
```

</details>

<details>
  <summary><strong>config.throttle</strong></summary>

  <br/>

By default the prefetch script will only prefetch one link at a time. This behavior can be changed in your `astro.config.*` file to increase the limit for concurrent downloads.

  <br/>

```js
import prefetch from '@astrojs/prefetch';

export default {
  // ...
  integrations: [prefetch({
    // Allow up to three links to be prefetched concurrently
    throttle: 3
  })],
}
```

</details>

## Examples

> Coming soon!

## Troubleshooting

*   If your installation doesn't seem to be working, make sure to restart the dev server.
*   If a link doesn't seem to be prefetching, make sure that the link is pointing to a page on the same domain and matches the integration's `selector` option.

## Contributing

This package is maintained by Astro's Core team. You're welcome to submit an issue or PR!
