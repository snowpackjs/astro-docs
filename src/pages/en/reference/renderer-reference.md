---
layout: ~/layouts/MainLayout.astro
title: UI Renderer Reference
---

Astro is designed to support your favorite UI frameworks. [React](https://npm.im/@astrojs/renderer-react), [Svelte](https://npm.im/@astrojs/renderer-svelte), [Vue](https://npm.im/@astrojs/renderer-vue), and [Preact](https://npm.im/@astrojs/renderer-preact) are all offically supported.

Internally, each framework is supported via a framework **renderer.** A renderer is a type of Astro plugin that adds support for a framework. To use a renderer, install the appropriate renderer package and add it to [Astro's configuration](/en/reference/configuration-reference#renderers). You can even provide your own third-party renderers to add Astro support for new frameworks.

## What is a renderer?

A renderer is an NPM package that has two responsibilities:

1. _render a component to a static string of HTML_ at build time.
2. _rehydrate that HTML to create an interactive component_ on the client.

Take a look at any one of Astro’s built-in [`renderers`](https://github.com/withastro/astro/tree/main/packages/renderers) to see this in action. We'll go into more detail in the following sections.

## Building Your Own Renderer

> **Building a renderer?** We'd love for you to contribute renderers for popular frameworks back to the Astro repo. Feel free to open an issue or pull request to discuss.

A simple renderer only needs a few files:

```
/my-custom-renderer/
├── package.json
├── index.js
├── server.js
└── client.js
```

### Package Manifest (`package.json`)

A renderer should include any framework dependencies as package dependencies. For example, `@astrojs/renderer-react` includes `react` & `react-dom` as dependencies in the `package.json` manifest.

```js
// package.json
"name": "@astrojs/renderer-react",
"dependencies": {
  "react": "^17.0.2",
  "react-dom": "^17.0.2"
}
```

This means that Astro users don't need to install the UI framework packages themselves. The renderer is the only package that your users will need to install.

### Renderer Entrypoint (`index.js`)

The main entrypoint of a renderer is a simple JS file which exports a manifest for the renderer. The required values are `name`, `server`, and `client`.

Additionally, this entrypoint can define a [Vite config object](https://vitejs.dev/config/) that should be used to load non-JavaScript files.

```js
import myVitePlugin from 'vite-plugin-myplugin';

export default {
  name: '@astrojs/renderer-xxx', // the renderer name
  client: './client.js', // relative path to the client entrypoint
  server: './server.js', // (optional) relative path to the server entrypoint
  viteConfig(options = { mode: 'development', command: 'serve' }) {
    // (optional) return config object for Vite (https://vitejs.dev/config/)
    return {
      plugins: [myVitePlugin()], // tip: usually this will depend on a Vite plugin
      optimizeDeps: {
        include: ['my-client-dep'], // tip: it’s always a good idea to specify any client-side hydration deps here
      },
      ssr: {
        external: ['my-client-dep/node/server.js'], // tip: use ssr.external in case you encounter code meant only for Node
      },
    };
  },
  polyfills: ['./shadow-dom-polyfill.js'], // (optional) scripts that should be injected on the page for the component
  hydrationPolyfills: ['./hydrate-framework.js'], // (optional) polyfills that need to run before hydration ever occurs
  jsxImportSource: 'preact', // (optional) the name of the library from which JSX is imported ("react", "preact", "solid-js", etc.)
  jsxTransformOptions: async (options = { mode: 'development', ssr: true }) => {
    // (optional) a function to transform JSX files
    const {
      default: { default: jsx },
    } = await import('@babel/plugin-transform-react-jsx');
    return {
      plugins: [jsx({}, { runtime: 'automatic', importSource: 'preact' })],
    };
  },
};
```

### JSX Support

Astro is unique in that it allows you to mix multiple types of JSX/TSX files in a single project. It does this by reading the `jsxImportSource` and `jsxTransformOptions` from renderers and transforming a file with [Babel](https://babeljs.io/).

#### `jsxImportSource`

This is the name of your library (for example `preact` or `react` or `solid-js`) which, if encountered in a file, will signal to Astro that this renderer should be used.

Users may also manually define `/** @jsxImportSource preact */` in to ensure that the file is processed by this renderer (if, for example, the file has no imports).

#### `jsxTransformOptions`

This is an `async` function that returns information about how to transform matching JSX files with [Babel](https://babeljs.io/). It supports [`plugins`](https://babeljs.io/docs/en/plugins) or [`presets`](https://babeljs.io/docs/en/presets) to be passed directly to Babel.

> Keep in mind that this transform doesn't need to handle TSX separately from JSX, Astro handles that for you!

`jsxTransformOptions` receives context about whether it’s running in `development` or `production` mode, as well as whether or not it’s running in SSR or client hydration. These allow you to pass separate Babel configurations for various conditions, like if your files should be compiled differently in SSR mode.

```ts
export interface JSXTransformOptions {
  (context: {
    /** "development" or "production" */
    mode: string;
    /** True if builder is in SSR mode */
    ssr: boolean;
  }) => {
    plugins?: any[];
    presets?: any[];
  }
}
```

### Server Entrypoint (`server.js`)

The server entrypoint of a renderer is responsible for checking if a component should use this renderer, and if so, how that component should be rendered to a string of static HTML.

```js
export default {
  // should Component use this renderer?
  check(Component, props, childHTML) {},
  // Component => string of static HTML
  renderToStaticMarkup(Component, props, childHTML) {},
};
```

#### `check`

`check` is a function that determines whether a Component should be "claimed" by this renderer.

In its simplest form, it can check for the existence of a flag on Object-based components.

```js
function check(Component) {
  return Component.isMyFrameworkComponent;
}
```

In more complex scenarios, like when a Component is a `Function` without any flags, you may need to use `try/catch` to attempt a full render. This result is cached so that it only runs once per-component.

```js
function check(Component, props, childHTML) {
  try {
    const { html } = renderToStaticMarkup(Component, props, childHTML);
    return Boolean(html);
  } catch (e) {}
  return false;
}
```

#### `renderToStaticMarkup`

`renderToStaticMarkup` is a function that renders a Component to a static string of HTML. There’s usually a method exported by frameworks named something like `renderToString`.

```js
import { h, renderToString } from 'xxx';

function renderToStaticMarkup(Component, props, childHTML) {
  const html = renderToString(h(Component, { ...props, innerHTML: childHTML }));
  return { html };
}
```

Note that `childHTML` is an HTML string representing this component’s children. If your framework does not support rendering HTML directly, you are welcome to use a wrapper component. By convention, Astro uses the `astro-fragment` custom element to inject `childHTML` into. Your renderer should use that, too.

```js
import { h, renderToString } from 'xxx';

const Wrapper = ({ value }) =>
  h('astro-fragment', { dangerouslySetInnerHTML: { __html: value } });

function renderToStaticMarkup(Component, props, childHTML) {
  const html = renderToString(
    h(Component, props, h(Wrapper, { value: childHTML }))
  );
  return { html };
}
```

The `renderToStaticMarkup` function also supports `async/await` for render functions that return a `Promise`.

```js
import { h, renderToString } from 'xxx';

async function renderToStaticMarkup(Component, props, childHTML) {
  const html = await renderToString(
    h(Component, { ...props, innerHTML: childHTML })
  );
  return { html };
}
```

### Client Entrypoint (`client.js`)

The client entrypoint of a renderer is responsible for rehydrating static HTML (the result of `renderToStaticMarkup`) back into a fully interactive component. Its `default` export should be a `function` which accepts the host element of the Component, an `astro-root` custom element.

> If your framework supports non-destructive component hydration (as opposed to a destructive `render` method), be sure to use that! Following your framework’s Server Side Rendering (SSR) guide should point you in the right direction.

```js
import { h, hydrate } from 'xxx';

export default (element) => {
  return (Component, props, childHTML) => {
    hydrate(h(Component, { ...props, innerHTML: childHTML }), element);
  };
};
```

Note that `childHTML` is an HTML string representing this component’s children. If your framework does not support rendering HTML directly, you should use the same wrapper component you used for the server entrypoint.

```js
import { h, hydrate } from 'xxx';
import SharedWrapper from './SharedWrapper.js';

export default (element) => {
  return (Component, props, childHTML) => {
    hydrate(
      h(Component, props, h(SharedWrapper, { value: childHTML })),
      element
    );
  };
};
```
