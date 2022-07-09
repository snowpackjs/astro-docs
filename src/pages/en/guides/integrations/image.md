---
# NOTE: This file is auto-generated from 'scripts/generate-integration-pages.ts'
#       and pulls content directly from the package’s README.
#       DO NOT MAKE EDITS TO THIS FILE DIRECTLY, THEY WILL BE OVERWRITTEN!
#       For corrections, please edit the package README at
#       https://github.com/withastro/astro/tree/main/packages/integrations/image

layout: ~/layouts/MainLayout.astro
title: '@astrojs/image 📷'
category: other
i18nReady: false
---

> ⚠️ This integration is still experimental! Only node environments are supported currently, stay tuned for Deno support in the future!

This **[Astro integration][astro-integration]** makes it easy to optimize images in your [Astro project](https://astro.build/), with full support for SSG builds and server-side rendering!

*   <strong>[Why `@astrojs/image`?](https://github.com/withastro/astro/tree/main/packages/integrations/image/#why-astrojsimage)</strong>
*   <strong>[Installation](https://github.com/withastro/astro/tree/main/packages/integrations/image/#installation)</strong>
*   <strong>[Usage](https://github.com/withastro/astro/tree/main/packages/integrations/image/#usage)</strong>
*   <strong>[Configuration](https://github.com/withastro/astro/tree/main/packages/integrations/image/#configuration)</strong>
*   <strong>[Examples](https://github.com/withastro/astro/tree/main/packages/integrations/image/#examples)</strong>
*   <strong>[Troubleshooting](https://github.com/withastro/astro/tree/main/packages/integrations/image/#troubleshooting)</strong>
*   <strong>[Contributing](https://github.com/withastro/astro/tree/main/packages/integrations/image/#contributing)</strong>
*   <strong>[Changelog](https://github.com/withastro/astro/tree/main/packages/integrations/image/#changelog)</strong>

## Why `@astrojs/image`?

Images play a big role in overall site performance and usability. Serving properly sized images makes all the difference but is often tricky to automate.

This integration provides `<Image />` and `<Picture>` components as well as a basic image transformer powered by [sharp](https://sharp.pixelplumbing.com/), with full support for static sites and server-side rendering. The built-in `sharp` transformer is also replacable, opening the door for future integrations that work with your favorite hosted image service.

## Installation

<details>
  <summary>Quick Install</summary>
  <br/>

The experimental `astro add` command-line tool automates the installation for you. Run one of the following commands in a new terminal window. (If you aren't sure which package manager you're using, run the first command.) Then, follow the prompts, and type "y" in the terminal (meaning "yes") for each one.

```sh
# Using NPM
npx astro add image
# Using Yarn
yarn astro add image
# Using PNPM
pnpx astro add image
```

Then, restart the dev server by typing `CTRL-C` and then `npm run astro dev` in the terminal window that was running Astro.

Because this command is new, it might not properly set things up. If that happens, [feel free to log an issue on our GitHub](https://github.com/withastro/astro/issues) and try the manual installation steps below.

</details>

<details>
  <summary>Manual Install</summary>

<br/>

First, install the `@astrojs/image` package using your package manager. If you're using npm or aren't sure, run this in the terminal:

```sh
npm install @astrojs/image
```

Then, apply this integration to your `astro.config.*` file using the `integrations` property:

**astro.config.mjs**

```js
import image from '@astrojs/image';

export default {
  // ...
  integrations: [image()],
}
```

Then, restart the dev server.

</details>

## Usage

The built-in `<Image />` component is used to create an optimized `<img />` for both remote images hosted on other domains as well as local images imported from your project's `src` directory.

The included `sharp` transformer supports resizing images and encoding them to different image formats. Third-party image services will be able to add support for custom transformations as well (ex: `blur`, `filter`, `rotate`, etc).

## Configuration

The intergration can be configured to run with a different image service, either a hosted image service or a full image transformer that runs locally in your build or SSR deployment.

There are currently no other configuration options for the `@astrojs/image` integration. Please [open an issue](https://github.com/withastro/astro/issues/new/choose) if you have a compelling use case to share.

<details>
  <summary><strong>config.serviceEntryPoint</strong></summary>

  <br/>

The `serviceEntryPoint` should resolve to the image service installed from NPM. The default entry point is `@astrojs/image/sharp`, which resolves to the entry point exported from this integration's `package.json`.

```js
// astro.config.mjs
import image from '@astrojs/image';

export default {
  integrations: [image({
    // Example: The entrypoint for a third-party image service installed from NPM
    serviceEntryPoint: 'my-image-service/astro.js'
  })],
}
```

</details>

## Examples

<details>
  <summary><strong>Local images</strong></summary>

  <br/>

Image files in your project's `src` directory can be imported in frontmatter and passed directly to the `<Image />` component. All other properties are optional and will default to the original image file's properties if not provided.

```html
---
import { Image } from '@astrojs/image';
import heroImage from '../assets/hero.png';
---

// optimized image, keeping the original width, height, and image format
<Image src={heroImage} />

// height will be recalculated to match the original aspect ratio
<Image src={heroImage} width={300} />

// cropping to a specific width and height
<Image src={heroImage} width={300} height={600} />

// cropping to a specific aspect ratio and converting to an avif format
<Image src={heroImage} aspectRatio="16:9" format="avif" />

// image imports can also be inlined directly
<Image src={import('../assets/hero.png')} />
```

</details>

<details>
  <summary><strong>Remote images</strong></summary>

  <br/>

Remote images can be transformed with the `<Image />` component. The `<Image />` component needs to know the final dimensions for the `<img />` element to avoid content layout shifts. For remote images, this means you must either provide `width` and `height`, or one of the dimensions plus the required `aspectRatio`.

```html
---
import { Image } from '@astrojs/image';

const imageUrl = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png';
---

// cropping to a specific width and height
<Image src={imageUrl} width={544} height={184} />

// height will be recalculated to match the aspect ratio
<Image src={imageUrl} width={300} aspectRatio={16/9} />

// cropping to a specific height and aspect ratio and converting to an avif format
<Image src={imageUrl} height={200} aspectRatio="16:9" format="avif" />
```

</details>

<details>
<summary><strong>Images in markdown</strong></summary>

  <br/>

The `<Image />` component can also be used to optimize images in markdown pages. For local images imported from your project's `src` directory, use Astro's the `setup` frontmatter to import the image file.

```html
---
setup: |
  import { Image } from '@astrojs/image'
  import hero from '../../assets/blog/introducing-astro.jpg'
title: Hello world!
publishDate: 12 Sep 2021
name: Nate Moore
value: 128
description: Just a Hello World Post!
---

<Image src={hero} width={640} />
<Image src="https://example.com/image.jpg" width={640} aspectRatio="16:9" />
```

</details>

<details>
<summary><strong>Responsive pictures</strong></summary>

  <br />

The `<Picture />` component can be used to automatically build a `<picture>` with multiple sizes and formats. Check out [MDN](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images#art_direction) for a deep dive into responsive images and art direction.

By default, the picture will include formats for `avif` and `webp` in addition to the image's original format.

For remote images, an `aspectRatio` is required to ensure the correct `height` can be calculated at build time.

```html
---
import { Picture } from '@astrojs/image';
import hero from '../assets/hero.png';

const imageUrl = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png';
---

// Local image with multiple sizes
<Picture src={hero} widths={[200, 400, 800]} sizes="(max-width: 800px) 100vw, 800px" />

// Remote image (aspect ratio is required)
<Picture src={imageUrl} widths={[200, 400, 800]} aspectRatio="4:3" sizes="(max-width: 800px) 100vw, 800px" />

// Inlined imports are supported
<Picture src={import("../assets/hero.png")} widths={[200, 400, 800]} sizes="(max-width: 800px) 100vw, 800px" />
```

</details>

## Troubleshooting

*   If your installation doesn't seem to be working, make sure to restart the dev server.
*   If you edit and save a file and don't see your site update accordingly, try refreshing the page.
*   If you edit and save a file and don't see your site update accordingly, try refreshing the page.
*   If refreshing the page doesn't update your preview, or if a new installation doesn't seem to be working, then restart the dev server.

For help, check out the `#support-threads` channel on [Discord](https://astro.build/chat). Our friendly Support Squad members are here to help!

You can also check our [Astro Integration Documentation][astro-integration] for more on integrations.

[astro-integration]: /en/guides/integrations-guide/

## Contributing

This package is maintained by Astro's Core team. You're welcome to submit an issue or PR!

## Changelog
