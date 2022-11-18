---
layout: ~/layouts/MainLayout.astro
title: Markdown & MDX
description: Learn how to create content using Markdown or MDX with Astro
i18nReady: true
---

[Markdown](https://daringfireball.net/projects/markdown/) is commonly used to author text-heavy content like blog posts and documentation. Astro includes built-in support for standard Markdown files. 

With the [@astrojs/mdx integration](/en/guides/integrations-guide/mdx/) installed, Astro also supports [MDX](https://mdxjs.com/) (`.mdx`) files which bring added features like support for JavaScript expressions and components in your Markdown content. 

Use either or both types of files to write your Markdown content!

## Markdown and MDX Pages

### File-based Routing

Astro treats any `.md` (or alternative supported extension) or `.mdx` file inside of the `/src/pages/` directory as a page.

Placing a file in this directory, or any sub-directory, will automatically build a page route using the pathname of the file.

```markdown
---
# Example: src/pages/page-1.md
title: Hello, World
---

# Hi there!

This Markdown file creates a page at `your-domain.com/page-1/`
```

📚 Read more about Astro's [file-based routing](/en/core-concepts/routing/) or options for creating [dynamic routes](/en/core-concepts/routing/#dynamic-routes).

### Markdown Drafts

`draft: true` is an optional frontmatter value that will mark an individual Markdown or MDX page or post as "unpublished." By default, this page will be excluded from the site build.

Pages without the `draft` property or those with `draft: false` are unaffected and will be included in the final build.

```markdown {5}
---
# src/pages/post/blog-post.md
layout: ../../layouts/BaseLayout.astro
title: My Blog Post
draft: true
---

This is my in-progress blog post.

No page will be built for this post.

To build and publish this post:

- update the frontmatter to `draft: false` or
- remove the `draft` property entirely.
```

:::caution[Drafts and Astro.glob()]
Although `draft: true` will prevent a page from being built on your site at that page route, [`Astro.glob()`](/en/reference/api-reference/#astroglob) currently returns **all matching files**.
:::

To exclude draft posts from being included in a post archive, or list of most recent posts, you can filter the results returned by your `Astro.glob()`.

```js
const posts = await Astro.glob('../pages/post/*.md');
const nonDraftPosts = posts.filter((post) => !post.frontmatter.draft);
```

#### Enable building draft pages

To enable building draft pages by default, update `astro.config.mjs` by adding `drafts: true` to `markdown` or to the `mdx` integration:

```js ins={4, 7}
// astro.config.mjs
export default defineConfig({
  markdown: {
    drafts: true,
  },
  integrations: [mdx({
    drafts: true,
  })],
});
```

:::tip
You can also pass the `--drafts` flag when running `astro build` to build draft pages!
:::

## Markdown Features

### Frontmatter `layout`

Astro provides Markdown and MDX pages with a special frontmatter `layout` property.

This must be a relative path (or [alias](/en/guides/aliases/)) to an Astro [layout component](/en/core-concepts/layouts/#markdownmdx-layouts). This component will wrap your Markdown content, providing a page shell and any other included page template elements.

**`src/pages/posts/post-1.md`**

```markdown {2}
---
layout: ../../layouts/BlogPostLayout.astro
title: Astro in brief
author: Himanshu
description: Find out what makes Astro awesome!
--- 
This is a post written in Markdown.
```

When a Markdown or MDX file includes a layout, it passes a `frontmatter` property to the `.astro` component which includes its frontmatter properties and the final HTML output of the page.


**`src/layouts/BlogPostLayout.astro`**

```astro /frontmatter(?:.\w+)?/
---
const {frontmatter} = Astro.props;
---
<html>
  <!-- ... -->
  <h1>{frontmatter.title}</h1>
  <h2>Post author: {frontmatter.author}</h2>
  <p>{frontmatter.description}<p>
  <slot /> <!-- Markdown content is injected here -->
   <!-- ... -->
</html>
```

📚 Learn more about [Markdown Layouts](/en/core-concepts/layouts/#markdownmdx-layouts).


### Heading IDs

Using headings in Markdown and MDX will automatically give you anchor links so you can link directly to certain sections of your page.

```markdown title="src/pages/page-1.md"
---
title: My page of content
---
## Introduction

I can link internally to [my conclusion](#conclusion) on the same page when writing Markdown.

## Conclusion

I can use the URL `https://my-domain.com/page-1/#introduction` to navigate directly to my Introduction on the page. 
```


### Escaping special characters

Certain characters have a special meaning in Markdown and MDX. You may need to use a different syntax if you want to display them. To do this, you can use [HTML entities](https://developer.mozilla.org/en-US/docs/Glossary/Entity) for these characters instead.

For example, to prevent `<` being interpreted as the beginning of an HTML element, write `&lt;`. Or, to prevent `{` being interpreted as the beginning of a JavaScript expression in MDX, write `&lcub;`.

## MDX-only Features

Adding the Astro [MDX integration](/en/guides/integrations-guide/mdx/) enhances your Markdown authoring with JSX variables, expressions and components. 

It also adds extra features to standard MDX, including support for [Markdown-style frontmatter in MDX](https://mdxjs.com/guides/frontmatter/). This allows you to use most of Astro's built-in Markdown features like a [frontmatter `layout`](#frontmatter-layout) property and a setting for [draft pages](#markdown-drafts).

`.mdx` files must be written in [MDX syntax](https://mdxjs.com/docs/what-is-mdx/#mdx-syntax) rather than Astro’s HTML-like syntax.

### Using Exported Variables in MDX

MDX supports using `export` statements to add variables to your MDX content. These variables are accessible both in the template itself and as named properties when [importing the the file](#importing-markdown) somewhere else.

For example, you can export a `title` field from an MDX page or component to use as a heading with `{JSX expressions}`:

```mdx title="/src/pages/posts/post-1.mdx"
export const title = 'My first MDX post'

# {title}
```
### Using Frontmatter Variables in MDX

The Astro MDX integration includes support for using frontmatter in MDX by default. Add frontmatter properties just as you would in Markdown files, and these variables are accessible to use in the template, in its [`layout` component](#frontmatter-layout), and as named properties when [importing the the file](#importing-markdown) somewhere else. 

```mdx title="/src/pages/posts/post-1.mdx"
---
layout: '../../layouts/BlogPostLayout.astro'
title: 'My first MDX post'
---

# {title}
```

### Using Components in MDX

After installing the MDX integration, you can import and use both [Astro components](/en/core-concepts/astro-components/#component-props) and [UI framework components](/en/core-concepts/framework-components/#using-framework-components) in MDX (`.mdx`) files just as you would use them in any other Astro component. 

Don't forget to include a `client:directive` on your UI framework components, if necessary!

See more examples of using import and export statements in the [MDX docs](https://mdxjs.com/docs/what-is-mdx/#esm).

```astro title="src/pages/about.mdx" {5-6} /<.+\/>/
---
layout: ../layouts/BaseLayout.astro
title: About me
---
import Button from '../components/Button.astro';
import ReactCounter from '../components/ReactCounter.jsx';

I live on **Mars** but feel free to <Button title="Contact me" />.

Here is my counter component, working in MDX:

<ReactCounter client:load />
```

#### Assigning Custom Components to HTML elements in MDX

MDX allows some common HTML elements to be written either with Markdown syntax or with JSX expressions. For example, `*italics*` for emphasis can also be written inside a JSX expression as `<em>italics</em>`.

It is also possible to map these Markdown symbols to `.astro` components instead of their standard HTML elements. This allows you to write in standard Markdown syntax without adding components in your Markdown content.

Import your custom component into your `.mdx` file, then export a `components` object that maps the standard HTML element to your custom component:

```mdx title="src/pages/about.mdx"
import Blockquote from `../components/Blockquote.astro';
export const components = {blockquote: Blockquote}
```

Now, when you type `>`, you can render a custom `<Blockquote />` component instead of a regular `<blockquote>` HTML element:

```astro title="src/components/Blockquote.astro"
---
const props = Astro.props;
---
<blockquote {...props} class="bg-blue-50 p-4">
  <span class="text-4xl text-blue-600 mb-2">“</span>
  <slot /> <!-- Be sure to add a `<slot/>` for child content! -->
</blockquote>
```
Visit the [MDX website](https://mdxjs.com/table-of-components/) for a full list of HTML elements that can be overwritten as custom components.

## Importing Markdown

You can import Markdown and MDX files directly into your Astro files. This gives you access to their Markdown content, as well as other properties such as frontmatter values that can be used within Astro's JSX-like expressions. 

You can import one specific page with an `import` statement, or multiple pages with [`Astro.glob()`](/en/guides/imports/#astroglob).

```astro title="src/pages/index.astro"
---
// Import a single file
import * as myPost from '../pages/post/my-post.md';

// Import multiple files with Astro.glob
const posts = await Astro.glob('../pages/post/*.md');
---
```

Importing Markdown and MDX files makes their [exported properties](#exported-properties) available in the `.astro` component.

```md title="/src/pages/posts/great-post.md"
---
title: 'The best post I've ever written'
author: 'Ben'
---

Here is my _great_ post!
```

```astro title="src/pages/my-posts.astro"
---
import * as greatPost from '../pages/post/great-post.md';

const posts = await Astro.glob('../pages/post/*.md');
---

<p>{greatPost.frontmatter.title}</p>
<p>Written by: {greatPost.frontmatter.author}</p>

<p>Post Archive:</p>
<ul>
  {posts.map(post => <li><a href={post.url}>{post.frontmatter.title}</a></li>)}
</ul>
```

In MDX files, you can access properties from both frontmatter and `export` statements:

```mdx title="/src/pages/posts/mdx-post.mdx"
---
title: 'The best post I've ever written'
author: 'Ben'
---
export const description = 'Get comfortable! This is going to be a great read.'

Here is my _great_ post!
```

```astro title="src/pages/my-posts.astro"
---
import * as greatPost from '../pages/post/mdx-post.mdx';
---

<p>{greatPost.frontmatter.title}</p>
<p>Written by: {greatPost.frontmatter.author}</p>
<p>{greatPost.description}</p>
```

You can optionally provide a type for the `frontmatter` variable using a TypeScript generic:

```astro title="src/pages/index.astro" ins={2-5} ins="<Frontmatter>"
---
interface Frontmatter {
  title: string;
  description?: string;
}
const posts = await Astro.glob<Frontmatter>('../pages/post/*.md');
---

<ul>
  {posts.map(post => <li>{post.frontmatter.title}</li>)}
  <!-- post.frontmatter.title will be `string`! -->
</ul>
```

### Exported Properties

:::note[Using an Astro layout?]
See the [properties exported to an Astro layout component](/en/core-concepts/layouts/#markdown-layout-props) when using Astro's special [frontmatter layout](#frontmatter-layout).
:::

The following properties are available to a `.astro` component when using an `import` statement or `Astro.glob()`:

- **`file`** - The absolute file path (e.g. `/home/user/projects/.../file.md`).
- **`url`** - If it's a page, the URL of the page (e.g. `/en/guides/markdown-content`).
- **`frontmatter`** - Contains any data specified in the file’s YAML frontmatter.
- **`getHeadings`** - An async function that returns an array of all headings (i.e. `h1 -> h6` elements) in the file. Each heading’s `slug` corresponds to the generated ID for a given heading and can be used for anchor links. This list follows the type: `{ depth: number; slug: string; text: string }[]`.
- **`Content`** - A component that returns the full, rendered contents of the file.
- **(Markdown only) `rawContent()`** - A function that returns the raw Markdown document as a string.
- **(Markdown only) `compiledContent()`** - A function that returns the Markdown document compiled to an HTML string. Note this does not include layouts configured in your frontmatter! Only the markdown document itself will be returned as HTML.
- **(MDX only)** - MDX files can also export data with an `export` statement.


### The `Content` Component

Import `Content` to render a component that returns the full rendered contents of a Markdown or MDX file:

```astro title="src/pages/content.astro" "Content"
---
import {Content as PromoBanner} from '../components/promoBanner.md';
---

<h2>Today's promo</h2>
<PromoBanner />
```

#### Example: Dynamic page routing

Instead of putting your Markdown/MDX files in the `src/pages/` directory to create page routes, you can [generate pages dynamically](/en/core-concepts/routing/#dynamic-routes).

To access your Markdown content, pass the `<Content/>` component through the Astro page’s `props`. You can then retrieve the component from `Astro.props` and render it in your page template. 

```astro title="src/pages/[slug].astro" {9-11} "Content" "Astro.props.post"
---
export async function getStaticPaths() {
  const posts = await Astro.glob('../posts/**/*.md')

  return posts.map(post => ({
    params: { 
      slug: post.frontmatter.slug 
    },
    props: {
      post
    },
  }))
}

const { Content } = Astro.props.post
---
<article>
  <Content/>
</article>
```


### MDX-only Exports

MDX files can also export data with an `export` statement.

For example, you can export a `title` field from an MDX page or component.

```mdx title="/src/pages/posts/post-1.mdx"
export const title = 'My first MDX post'
```

This `title` will be accessible from `import` and [Astro.glob()](/en/reference/api-reference/#astroglob) statements:

```astro
---
// src/pages/index.astro
const posts = await Astro.glob('./*.mdx');
---

{posts.map(post => <p>{post.title}</p>)}
```

### Custom components with imported MDX

When rendering imported MDX content, [custom components](#assigning-custom-components-to-html-elements-in-mdx) can be passed via the `components` prop.

Note: Custom components defined and exported in an MDX file must be imported and then passed back to the `<Content />` component via the `components` property.

```astro title="src/pages/page.astro" "components={{...components, h1: Heading }}"
---
import { Content, components } from '../content.mdx';
import Heading from '../Heading.astro';
---
<!-- Creates a custom <h1> for the # syntax, _and_ applies any custom components defined in `content.mdx` -->
<Content components={{...components, h1: Heading }} />
```

## Configuring Markdown and MDX

Markdown support in Astro is powered by [remark](https://remark.js.org/), a powerful parsing and processing tool with an active ecosystem. Other Markdown parsers like Pandoc and markdown-it are not currently supported.

Astro applies the [GitHub-flavored Markdown](https://github.com/remarkjs/remark-gfm) and [Smartypants](https://github.com/silvenon/remark-smartypants) plugins by default. This brings some niceties like generating clickable links from text and formatting quotes for readability. 

You can customize how remark parses your Markdown in `astro.config.mjs`. See the full list of [Markdown configuration options](/en/reference/configuration-reference/#markdown-options).

### Markdown Plugins

Astro supports adding third-party [remark](https://github.com/remarkjs/remark) and [rehype](https://github.com/rehypejs/rehype) plugins for Markdown and MDX. 

These plugins allow you to extend your Markdown with new capabilities, like [auto-generating a table of contents](https://github.com/remarkjs/remark-toc), [applying accessible emoji labels](https://github.com/florianeckerstorfer/remark-a11y-emoji), and more. 

We encourage you to browse [awesome-remark](https://github.com/remarkjs/awesome-remark) and [awesome-rehype](https://github.com/rehypejs/awesome-rehype) for popular plugins! See each plugin's own README for specific installation instructions.

:::tip
When adding your own plugins, Astro's default plugins are removed. You can preserve these defaults with the [`markdown.extendDefaultPlugins` flag](/en/reference/configuration-reference/#markdownextenddefaultplugins).
:::

By default, Astro's MDX integration inherits all remark and rehype plugins from your Astro config `markdown` options. To change this behavior, configure [`extendPlugins`](/en/guides/integrations-guide/mdx#extendplugins) in your `mdx` integration.

Any additional plugins you apply in your MDX config will be applied *after* your configured Markdown plugins, and will apply only to `.mdx` files. 

This example applies [`remark-toc`](https://github.com/remarkjs/remark-toc) to Markdown *and* MDX, and [`rehype-accessible-emojis`](https://www.npmjs.com/package/rehype-accessible-emojis) to MDX only, while preserving Astro's default plugins:

```js title="astro.config.mjs"
import { defineConfig } from 'astro/config';
import remarkToc from 'remark-toc';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';

export default {
  markdown: {
    // Applied to .md and .mdx files
    remarkPlugins: [remarkToc],
    //Preserves remark-gfm and remark-smartypants
    extendDefaultPlugins: true,
  },
  integrations: [mdx({
    // Applied to .mdx files only
    rehypePlugins: [rehypeAccessibleEmojis],
  })],
}
```

#### Example: Injecting frontmatter

You can add frontmatter properties to all of your Markdown and MDX files by using a [remark or rehype plugin](#markdown-plugins).

1. Append a `customProperty` to the `data.astro.frontmatter` property from your plugin's `file` argument:

    ```js title="example-remark-plugin.mjs"
    export function exampleRemarkPlugin() {
      // All remark and rehype plugins return a separate function
      return function (tree, file) {
        file.data.astro.frontmatter.customProperty = 'Generated property';
      }
    }
    ```

2. Apply this plugin to your `markdown`  or `mdx` integration config:

```js title="astro.config.mjs" "import { exampleRemarkPlugin } from './example-remark-plugin.mjs';" "remarkPlugins: [exampleRemarkPlugin],"
import { exampleRemarkPlugin } from './example-remark-plugin.mjs';

export default {
  markdown: {
    remarkPlugins: [exampleRemarkPlugin],
    extendDefaultPlugins: true,
  },
};

```
or

```js title="astro.config.mjs" "import { exampleRemarkPlugin } from './example-remark-plugin.mjs';" "remarkPlugins: [exampleRemarkPlugin],"
import { exampleRemarkPlugin } from './example-remark-plugin.mjs';

export default {
  integrations: [
    mdx({
      remarkPlugins: [exampleRemarkPlugin],
    }),
  ],
}
```

Now, every Markdown or MDX file will have `customProperty` in its frontmatter! This is available when [importing your markdown](#importing-markdown) and from [the `Astro.props.frontmatter` property in your layouts](#frontmatter-layout).

#### Example: calculate reading time

You can use a [remark plugin](https://github.com/remarkjs/remark) to add a reading time to your frontmatter. We recommend two helper packages:
- [`reading-time`](https://www.npmjs.com/package/reading-time) to calculate minutes read
- [`mdast-util-to-string`](https://www.npmjs.com/package/mdast-util-to-string) to extract all text from your markdown

```shell
npm install reading-time mdast-util-to-string
```

We can apply these packages to a remark plugin like so:

```js title="remark-reading-time.mjs"
import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';

export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    // readingTime.text will give us minutes read as a friendly string,
    // i.e. "3 min read"
    data.astro.frontmatter.minutesRead = readingTime.text;
  };
}
```

Once you apply this plugin to your config:

```js title="astro.config.mjs" "import { remarkReadingTime } from './remark-reading-time.mjs';" "remarkPlugins: [remarkReadingTime],"
import { remarkReadingTime } from './remark-reading-time.mjs';

export default {
  markdown: {
    remarkPlugins: [remarkReadingTime],
    extendDefaultPlugins: true,
  },
};

```

...all Markdown documents will have a calculated `minutesRead`. You can use this to include an "X min read" banner in a [markdown layout](#markdown-and-mdx-pages), for instance:

```astro title="src/layouts/BlogLayout.astro" "const { minutesRead } = Astro.props.frontmatter;" "<p>{minutesRead}</p>"
---
const { minutesRead } = Astro.props.frontmatter;
---

<html>
  <head>...</head>
  <body>
    <p>{minutesRead}</p>
    <slot />
  </body>
</html>
```

### Syntax Highlighting

Astro comes with built-in support for [Shiki](https://shiki.matsu.io/) and [Prism](https://prismjs.com/). This provides syntax highlighting for:

- all code fences (\`\`\`) used in a Markdown or MDX file.
- content within the [built-in `<Code />` component](/en/reference/api-reference/#code-) (powered by Shiki).
- content within the [`<Prism />` component](/en/reference/api-reference/#prism-) (powered by Prism).

Shiki is enabled by default, preconfigured with the `github-dark` theme. The compiled output will be limited to inline `style`s without any extraneous CSS classes, stylesheets, or client-side JS.

#### Shiki configuration

Shiki is our default syntax highlighter. You can configure all options via the `shikiConfig` object like so:

```js
// astro.config.mjs
export default {
  markdown: {
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: 'dracula',
      // Add custom languages
      // Note: Shiki has countless langs built-in, including .astro!
      // https://github.com/shikijs/shiki/blob/main/docs/languages.md
      langs: [],
      // Enable word wrap to prevent horizontal scrolling
      wrap: true,
    },
  },
};
```

#### Adding your own theme

Instead of using one of Shiki’s predefined themes, you can import a custom theme from a local file.

```js title="astro.config.mjs"
import { defineConfig } from 'astro/config';
import customTheme from './my-shiki-theme.json';

export default defineConfig({
  markdown: {
    shikiConfig: { theme: customTheme },
  },
});
```

We also suggest reading [Shiki's own theme documentation](https://github.com/shikijs/shiki/blob/main/docs/themes.md#loading-theme) to explore more about themes, light vs dark mode toggles, or styling via CSS variables.

#### Change Default Syntax Highlighting Mode

If you'd like to switch to `'prism'` by default, or disable syntax highlighting entirely, you can use the `markdown.syntaxHighlighting` config object:

```js ins={5}
// astro.config.mjs
export default {
  markdown: {
    // Can be 'shiki' (default), 'prism' or false to disable highlighting
    syntaxHighlight: 'prism',
  },
};
```

#### Prism configuration

If you opt to use Prism, Astro will apply Prism's CSS classes instead. Note that **you need to bring your own CSS stylesheet** for syntax highlighting to appear!

1. Choose a premade stylesheet from the available [Prism Themes](https://github.com/PrismJS/prism-themes).
2. Add this stylesheet to [your project's `public/` directory](/en/core-concepts/project-structure/#public).
3. Load this into your page's `<head>` in a [layout component](/en/core-concepts/layouts/) via a `<link>` tag. (See [Prism basic usage](https://prismjs.com/#basic-usage).)

You can also visit the [list of languages supported by Prism](https://prismjs.com/#supported-languages) for options and usage.

## Fetching Remote Markdown

Astro was primarily designed for local Markdown files that could be saved inside of your project directory. However, there may be certain cases where you need to fetch Markdown from a remote source. For example, you may need to fetch and render Markdown from a remote API when you build your website (or when a user makes a request to your website, when using [SSR](/en/guides/server-side-rendering/)).

**Astro does not include built-in support for remote Markdown!** To fetch remote Markdown and render it to HTML, you will need to install and configure your own Markdown parser from npm. This **will not** inherit from any of Astro's built-in Markdown and MDX settings that you have configured. Be sure that you understand these limitations before implementing this in your project. 

```astro title="src/pages/remote-example.astro"
---
// Example: Fetch Markdown from a remote API 
// and render it to HTML, at runtime.
// Using "marked" (https://github.com/markedjs/marked)
import { marked } from 'marked';
const response = await fetch('https://raw.githubusercontent.com/wiki/adam-p/markdown-here/Markdown-Cheatsheet.md');
const markdown = await response.text();
const content = marked.parse(markdown);
---
<article set:html={content} />
```
