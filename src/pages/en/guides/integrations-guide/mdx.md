---
# NOTE: This file is auto-generated from 'scripts/generate-integration-pages.ts'
#       and pulls content directly from the package’s README.
#       DO NOT MAKE EDITS TO THIS FILE DIRECTLY, THEY WILL BE OVERWRITTEN!
#       For corrections, please edit the package README at
#       https://github.com/withastro/astro/tree/main/packages/integrations/mdx/

layout: ~/layouts/IntegrationLayout.astro
title: '@astrojs/mdx'
version: '0.2.1'
githubURL: 'https://github.com/withastro/astro/tree/main/packages/integrations/mdx/'
category: renderer
i18nReady: false
setup : |
  import Video from '~/components/Video.astro'
---

This **[Astro integration][astro-integration]** enables the usage of [MDX](https://mdxjs.com/) components and allows you to create pages as `.mdx` files.

## Why MDX?

MDX is the defacto solution for embedding components, such as interactive charts or alerts, within Markdown content. If you have existing content authored in MDX, this integration makes migrating to Astro a breeze.

**Want to learn more about MDX before using this integration?**\
Check out [“What is MDX?”](https://mdxjs.com/docs/what-is-mdx/), a deep-dive on the MDX format.

## Installation

<details>
  <summary>Quick Install</summary>

The `astro add` command-line tool automates the installation for you. Run one of the following commands in a new terminal window. (If you aren't sure which package manager you're using, run the first command.) Then, follow the prompts, and type "y" in the terminal (meaning "yes") for each one.

```sh
# Using NPM
npx astro add mdx
# Using Yarn
yarn astro add mdx
# Using PNPM
pnpx astro add mdx
```

Then, restart the dev server by typing `CTRL-C` and then `npm run astro dev` in the terminal window that was running Astro.

Because this command is new, it might not properly set things up. If that happens, [feel free to log an issue on our GitHub](https://github.com/withastro/astro/issues) and try the manual installation steps below.

</details>

<details>
  <summary>Manual Install</summary>

First, install the `@astrojs/mdx` package using your package manager. If you're using npm or aren't sure, run this in the terminal:

```sh
npm install @astrojs/mdx
```

Then, apply this integration to your `astro.config.*` file using the `integrations` property:

**`astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  // ...
  integrations: [mdx()],
});
```

Finally, restart the dev server.

</details>

## Usage

To write your first MDX page in Astro, head to our [UI framework documentation][astro-ui-frameworks]. You'll explore:

*   📦 how framework components are loaded,
*   💧 client-side hydration options, and
*   🪆 opportunities to mix and nest frameworks together

[**Client Directives**](/en/reference/directives-reference/) are still required in `.mdx` files.

> **Note**: `.mdx` files adhere to strict JSX syntax rather than Astro's HTML-like syntax.

Also check our [Astro Integration Documentation][astro-integration] for more on integrations.

### Variables

MDX supports `export` statements to add variables to your templates. These variables are accessible both from the template itself *and* as named properties when importing the template somewhere else.

For instance, you can export a `title` field from an MDX page or component to use as a heading with `{JSX expressions}`:

```mdx
export const title = 'My first MDX post'

# {title}
```

This `title` will be accessible from `import` and [glob](/en/reference/api-reference/) statements as well:

```astro
---
// src/pages/index.astro
const posts = await Astro.glob('./*.mdx');
---

{posts.map(post => <p>{post.title}</p>)}
```

See [the official "how MDX works" guide](https://mdxjs.com/docs/using-mdx/#how-mdx-works) for more on MDX variables.

### Frontmatter

Astro also supports YAML-based frontmatter out-of-the-box using the [remark-mdx-frontmatter](https://github.com/remcohaszing/remark-mdx-frontmatter) plugin. By default, all variables declared in a frontmatter fence (`---`) will be accessible via the `frontmatter` export. See the `frontmatterOptions` configuration to customize this behavior.

For example, we can add a `title` and `publishDate` to an MDX page or component like so:

```mdx
---
title: 'My first MDX post'
publishDate: '21 September 2022'
---

# {frontmatter.title}
```

Now, this `title` and `publishDate` will be accessible from `import` and [glob](/en/reference/api-reference/) statements via the `frontmatter` property. This matches the behavior of [plain markdown in Astro](/en/reference/api-reference/) as well!

```astro
---
// src/pages/index.astro
const posts = await Astro.glob('./*.mdx');
---

{posts.map(post => (
  <Fragment>
    <h2>{post.frontmatter.title}</h2>
    <time>{post.frontmatter.publishDate}</time>
  </Fragment>
))}
```

## Configuration

<details>
  <summary><strong>remarkPlugins</strong></summary>

**Default plugins:** [remark-gfm](https://github.com/remarkjs/remark-gfm), [remark-smartypants](https://github.com/silvenon/remark-smartypants)

[Remark plugins](https://github.com/remarkjs/remark/blob/main/doc/plugins.md) allow you to extend your Markdown with new capabilities. This includes [auto-generating a table of contents](https://github.com/remarkjs/remark-toc), [applying accessible emoji labels](https://github.com/florianeckerstorfer/remark-a11y-emoji), and more. We encourage you to browse [awesome-remark](https://github.com/remarkjs/awesome-remark) for a full curated list!

We apply [GitHub-flavored Markdown](https://github.com/remarkjs/remark-gfm) and [Smartypants](https://github.com/silvenon/remark-smartypants) by default. This brings some niceties like auto-generating clickable links from text (ex. `https://example.com`) and formatting quotes for readability. When applying your own plugins, you can choose to preserve or remove these defaults.

To apply plugins *while preserving* Astro's default plugins, use a nested `extends` object like so:

```js
// astro.config.mjs
import remarkToc from 'remark-toc';

export default {
  integrations: [mdx({
    // apply remark-toc alongside GitHub-flavored markdown and Smartypants
    remarkPlugins: { extends: [remarkToc] },
  })],
}
```

To apply plugins *without* Astro's defaults, you can apply a plain array:

```js
// astro.config.mjs
import remarkToc from 'remark-toc';

export default {
  integrations: [mdx({
    // apply remark-toc alone, removing other defaults
    remarkPlugins: [remarkToc],
  })],
}
```

</details>

<details>
  <summary><strong>rehypePlugins</strong></summary>

**Default plugins:** none

[Rehype plugins](https://github.com/rehypejs/rehype/blob/main/doc/plugins.md) allow you to transform the HTML that your Markdown generates. We recommend checking the [Remark plugin](https://github.com/remarkjs/remark/blob/main/doc/plugins.md) catalog first *before* considering rehype plugins, since most users want to transform their Markdown syntax instead. If HTML transforms are what you need, we encourage you to browse [awesome-rehype](https://github.com/rehypejs/awesome-rehype) for a full curated list of plugins!

To apply rehype plugins, use the `rehypePlugins` configuration option like so:

```js
// astro.config.mjs
import rehypeMinifyHtml from 'rehype-minify';

export default {
  integrations: [mdx({
    rehypePlugins: [rehypeMinifyHtml],
  })],
}
```

</details>

<details>
  <summary><strong>frontmatterOptions</strong></summary>

**Default:** `{ name: 'frontmatter' }`

We use [remark-mdx-frontmatter](https://github.com/remcohaszing/remark-mdx-frontmatter) to parse YAML-based frontmatter in your MDX files. If you want to override our default configuration or extend remark-mdx-frontmatter (ex. to [apply a custom frontmatter parser](https://github.com/remcohaszing/remark-mdx-frontmatter#parsers)), you can supply a `frontmatterOptions` configuration.

For example, say you want to access frontmatter as root-level variables without a nested `frontmatter` object. You can override the [`name` configuration option](https://github.com/remcohaszing/remark-mdx-frontmatter#name) like so:

```js
// astro.config.mjs
export default {
  integrations: [mdx({
    frontmatterOptions: {
      name: '',
    }
  })],
}
```

```mdx
---
title: I'm just a variable now!
---

# {title}
```

See the [remark-mdx-frontmatter README](https://github.com/remcohaszing/remark-mdx-frontmatter#options) for a complete list of options.

</details>

## Examples

*   The [Astro MDX example](https://github.com/withastro/astro/tree/latest/examples/with-mdx) shows how to use MDX files in your Astro project.

## Troubleshooting

For help, check out the `#support-threads` channel on [Discord](https://astro.build/chat). Our friendly Support Squad members are here to help!

You can also check our [Astro Integration Documentation][astro-integration] for more on integrations.

## Contributing

This package is maintained by Astro's Core team. You're welcome to submit an issue or PR!

## Changelog

See [CHANGELOG.md](https://github.com/withastro/astro/tree/main/packages/integrations/mdx/CHANGELOG.md) for a history of changes to this integration.

[astro-integration]: /en/guides/integrations-guide/

[astro-ui-frameworks]: /en/core-concepts/framework-components/
