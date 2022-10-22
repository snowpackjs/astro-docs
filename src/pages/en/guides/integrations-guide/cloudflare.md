---
# NOTE: This file is auto-generated from 'scripts/generate-integration-pages.ts'
#       and pulls content directly from the package’s README.
#       DO NOT MAKE EDITS TO THIS FILE DIRECTLY, THEY WILL BE OVERWRITTEN!
#       For corrections, please edit the package README at
#       https://github.com/withastro/astro/tree/main/packages/integrations/cloudflare/
#
# TRANSLATORS: please remove this note and the <DontEditWarning/> component.

layout: ~/layouts/IntegrationLayout.astro
title: '@astrojs/cloudflare'
description: Learn how to use the @astrojs/cloudflare SSR adapter to deploy your Astro project.
githubURL: 'https://github.com/withastro/astro/tree/main/packages/integrations/cloudflare/'
hasREADME: true
category: adapter
i18nReady: false
setup: |
  import Video from '~/components/Video.astro';
  import DontEditWarning from '../../../../components/DontEditWarning.astro';
---

<DontEditWarning/>

An SSR adapter for use with Cloudflare Pages Functions targets. Write your code in Astro/Javascript and deploy to Cloudflare Pages.

## Install

Add the Cloudflare adapter to enable SSR in your Astro project with the following `astro add` command. This will install the adapter and make the appropriate changes to your `astro.config.mjs` file in one step.

```sh
# Using NPM
npx astro add cloudflare
# Using Yarn
yarn astro add cloudflare
# Using PNPM
pnpm astro add cloudflare
```

If you prefer to install the adapter manually instead, complete the following two steps:

1.  Add the Cloudflare adapter to your project's dependencies using your preferred package manager. If you’re using npm or aren’t sure, run this in the terminal:

```bash
npm install @astrojs/cloudflare
```

2.  Add the following to your `astro.config.mjs` file:

```js title="astro.config.mjs" ins={2, 5-6}
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server',
  adapter: cloudflare()
});
```

## Options

### Mode

`mode: "advanced" | "directory"`

default `"advanced"`

Cloudflare Pages has 2 different modes for deploying functions, `advanced` mode which picks up the `_worker.js` in `dist`, or a directory mode where pages will compile the worker out of a functions folder in the project root.

For most projects the adaptor default of `advanced` will be sufficiant, when in this mode the `dist` folder will contain your compiled project. However if you'd like to use [pages plugins](https://developers.cloudflare.com/pages/platform/functions/plugins/) such as [Sentry](https://developers.cloudflare.com/pages/platform/functions/plugins/sentry/) for example to enable logging, you'll need to use directory mode.

In directory mode the adaptor will compile the client side part of you app the same way, but it will move the worker script into a `functions` folder in the project root. The adaptor will only ever place a `[[path]].js` in that folder, allowing you to add additional plugins and pages middleware which can be checked into version control.

```ts
// directory mode
export default defineConfig({
  adapter: cloudflare({ mode: "directory" }),
});

```

## Enabling Preview

In order for preview to work you must install `wrangler`

```sh
$ pnpm install wrangler --save-dev
```

It's then possible to update the preview script in your `package.json` to `"preview": "wrangler pages dev ./dist"`.This will allow you run your entire application locally with [Wrangler](https://github.com/cloudflare/wrangler2), which supports secrets, environment variables, KV namespaces, Durable Objects and [all other supported Cloudflare bindings](https://developers.cloudflare.com/pages/platform/functions/#adding-bindings).

## Streams

Some integrations such as [React](https://github.com/withastro/astro/tree/main/packages/integrations/react) rely on web streams. Currently Cloudflare Pages functions are in beta and don't support the `streams_enable_constructors` feature flag.

In order to work around this:

*   install the `"web-streams-polyfill"` package
*   add `import "web-streams-polyfill/es2018";` to the top of the front matter of every page which requires streams, such as server rendering a React component.

## Environment Variables

As Cloudflare Pages Functions [provides environment variables differently](https://developers.cloudflare.com/pages/platform/functions/#adding-environment-variables-locally), private environment variables needs to be set through [`vite.define`](https://vitejs.dev/config/shared-options.html#define) to work in builds.

```js
// astro.config.mjs
export default {
  vite: {
    define: {
      'process.env.MY_SECRET': JSON.stringify(process.env.MY_SECRET),
    },
  },
}
```

## Troubleshooting

For help, check out the `#support` channel on [Discord](https://astro.build/chat). Our friendly Support Squad members are here to help!

You can also check our [Astro Integration Documentation][astro-integration] for more on integrations.

## Contributing

This package is maintained by Astro's Core team. You're welcome to submit an issue or PR!

[astro-integration]: /en/guides/integrations-guide/
