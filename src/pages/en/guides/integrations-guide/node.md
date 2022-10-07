---
# NOTE: This file is auto-generated from 'scripts/generate-integration-pages.ts'
#       and pulls content directly from the package’s README.
#       DO NOT MAKE EDITS TO THIS FILE DIRECTLY, THEY WILL BE OVERWRITTEN!
#       For corrections, please edit the package README at
#       https://github.com/withastro/astro/tree/main/packages/integrations/node/
#
# TRANSLATORS: please remove this note and the <DontEditWarning/> component.

layout: ~/layouts/IntegrationLayout.astro
title: '@astrojs/node'
githubURL: 'https://github.com/withastro/astro/tree/main/packages/integrations/node/'
hasREADME: true
category: adapter
i18nReady: false
setup: |
  import Video from '~/components/Video.astro';
  import DontEditWarning from '../../../../components/DontEditWarning.astro';
---

<DontEditWarning/>

This adapter allows Astro to deploy your SSR site to Node targets.

## Why Astro Node

If you're using Astro as a static site builder—its behavior out of the box—you don't need an adapter.

If you wish to [use server-side rendering (SSR)](/en/guides/server-side-rendering/), Astro requires an adapter that matches your deployment runtime.

[Node](https://nodejs.org/en/) is a JavaScript runtime for server-side code. Frameworks like [Express](https://expressjs.com/) are built on top of it and make it easier to write server applications in Node. This adapter provides access to Node's API and creates a script to run your Astro project that can be utilized in Node applications.

## Installation

Add the Node adapter to enable SSR in your Astro project with the following `astro add` command. This will install the adapter and make the appropriate changes to your `astro.config.mjs` file in one step.

```sh
# Using NPM
npx astro add node
# Using Yarn
yarn astro add node
# Using PNPM
pnpm astro add node
```

If you prefer to install the adapter manually instead, complete the following two steps:

1.  Install the Node adapter to your project’s dependencies using your preferred package manager. If you’re using npm or aren’t sure, run this in the terminal:

    ```bash
      npm install @astrojs/node
    ```

2.  Add two new lines to your `astro.config.mjs` project configuration file.

    ```js title="astro.config.mjs" ins={2, 5-6}
    import { defineConfig } from 'astro/config';
    import node from '@astrojs/node';

    export default defineConfig({
      output: 'server',
      adapter: node(),
    });
    ```

## Usage

After [performing a build](/en/guides/deploy/) there will be a `dist/server/entry.mjs` module that exposes a `handler` function. This works like a [middleware](https://expressjs.com/en/guide/using-middleware.html) function: it can handle incoming requests and respond accordingly.

### Using a middleware framework

You can use this `handler` with any framework that supports the Node `request` and `response` objects.

For example, with Express:

```js
import express from 'express';
import { handler as ssrHandler } from './dist/server/entry.mjs';

const app = express();
app.use(express.static('dist/client/'))
app.use(ssrHandler);

app.listen(8080);
```

### Using `http`

This output script does not require you use Express and can work with even the built-in `http` and `https` node modules. The handler does follow the convention calling an error function when either

*   A route is not found for the request.
*   There was an error rendering.

You can use these to implement your own 404 behavior like so:

```js
import http from 'http';
import { handler as ssrHandler } from './dist/server/entry.mjs';

http.createServer(function(req, res) {
  ssrHandler(req, res, err => {
    if(err) {
      res.writeHead(500);
      res.end(err.toString());
    } else {
      // Serve your static assets here maybe?
      // 404?
      res.writeHead(404);
      res.end();
    }
  });
}).listen(8080);
```

## Configuration

This adapter does not expose any configuration options.

## Troubleshooting

### SyntaxError: Named export 'compile' not found

You may see this when running the entry script if it was built with npm or Yarn. This is a [known issue](https://github.com/withastro/astro/issues/4974) that will be fixed in a future release. As a workaround, add `"path-to-regexp"` to the `noExternal` array:

```js title="astro.config.mjs" ins={8-12}
import { defineConfig } from 'astro/config';

import node from "@astrojs/node";

export default defineConfig({
  output: "server",
  adapter: node(),
  vite: {
    ssr: {
      noExternal: ["path-to-regexp"]
    }
  }
});
```

For more help, check out the `#support` channel on [Discord](https://astro.build/chat). Our friendly Support Squad members are here to help!

You can also check our [Astro Integration Documentation][astro-integration] for more on integrations.

## Contributing

This package is maintained by Astro's Core team. You're welcome to submit an issue or PR!

## Changelog

See [CHANGELOG.md](https://github.com/withastro/astro/tree/main/packages/integrations/node/CHANGELOG.md) for a history of changes to this integration.

[astro-integration]: /en/guides/integrations-guide/
