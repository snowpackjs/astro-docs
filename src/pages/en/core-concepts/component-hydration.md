---
layout: ~/layouts/MainLayout.astro
title: Partial Hydration in Astro
description: Learn how partial hydration works using the "Islands Architecture" in Astro.
---

**Astro generates every website with zero client-side JavaScript, by default.** Use any frontend UI component that you'd like (React, Svelte, Vue, etc.) and Astro will automatically render it to HTML at build-time and strip away all JavaScript. This keeps every site fast by default.

But sometimes, client-side JavaScript is required. This guide shows how interactive components work in Astro using a technique called partial hydration.

```astro
---
// Example: Importing and then using a React component.
// By default, Astro renders this to HTML and CSS during
// your build, with no client-side JavaScript.
// (Need client-side JavaScript? Read on...)
import MyReactComponent from '../components/MyReactComponent.jsx';
---
<!-- 100% HTML, Zero JavaScript! -->
<MyReactComponent />
```

## Concept: Partial Hydration

There are plenty of cases where you need an interactive UI component to run in the browser:

- An image carousel
- An auto-complete search bar
- A mobile sidebar open/close button
- A "Buy Now" button

In Astro, it’s up to you as the developer to explicitly "opt-in" any components on the page that need to run in the browser. Astro can then use this info to know exactly what JavaScript is needed, and only hydrate exactly what’s needed on the page. This technique is known as partial hydration.

**Partial hydration** -- the act of only hydrating the individual components that require JavaScript and leaving the rest of your site as static HTML -- may sound relatively straightforward. It should! Websites have been built this way for decades. It was only recently that Single-Page Applications (SPAs) introduced the idea that your entire website is written in JavaScript and compiled/rendered by every user in the browser.

_Note: Partial hydration is sometimes called "progressive enhancement" or "progressive hydration." While there are slight nuances between the terms, for our purposes you can think of these all as synonyms of the same concept._

**Partial hydration is the secret to Astro’s fast-by-default performance story.** Next.js, Gatsby, and other JavaScript frameworks cannot support partial hydration because they imagine your entire website/page as a single JavaScript application.

## Concept: Island Architecture

**Island architecture** is the idea of using partial hydration to build entire websites. Island architecture is an alternative to the popular idea of building your website into a client-side JavaScript bundle that must be shipped to the user.

> In an "islands" model, server rendering is not a bolt-on optimization aimed at improving SEO or UX. Instead, it is a fundamental part of how pages are delivered to the browser. The HTML returned in response to navigation contains a meaningful and immediately renderable representation of the content the user requested.
> <br/> -- [Jason Miller](https://jasonformat.com/islands-architecture/)

Besides the obvious performance benefits of sending less JavaScript down to the browser, there are two key benefits to island architecture:

- **Components load individually.** A lightweight component (like a sidebar toggle) will load and render quickly without being blocked by the heavier components on the page.
- **Components render in isolation.** Each part of the page is an isolated unit, and a performance issue in one unit won't directly affect the others.

![diagram](https://res.cloudinary.com/wedding-website/image/upload/v1596766231/islands-architecture-1.png)

## Hydrate Interactive Components

Astro renders every component on the server **at build time**, unless [client:only](#mycomponent-clientonly-) is used. To hydrate components on the client **at runtime**, you may use any of the following `client:*` directives. A directive is a component attribute (always with a `:`) which tells Astro how your component should be rendered.

```astro
---
// Example: hydrating a React component in the browser.
import MyReactComponent from '../components/MyReactComponent.jsx';
---
<!-- "client:visible" means the component won't load any client-side
     JavaScript for the component until it becomes visible in the
     user’s browser. -->
<MyReactComponent client:visible />
```

Note that the renderer JS (e.g. React) and the component’s CSS are downloaded with the page. The `client:*` directives only dictate when the component JS is imported and when the component is hydrated.

### `<MyComponent client:load />`

Start importing the component JS at page load. Hydrate the component when import completes.

### `<MyComponent client:idle />`

Start importing the component JS as soon as main thread is free (uses [requestIdleCallback()][mdn-ric]). Hydrate the component when import completes.

### `<MyComponent client:visible />`

Start importing the component JS as soon as the element enters the viewport (uses [IntersectionObserver][mdn-io]). Hydrate the component when import completes. Useful for content lower down on the page.

### `<MyComponent client:media={QUERY} />`

Start importing the component JS as soon as the browser matches the given media query (uses [matchMedia][mdn-mm]). Hydrate the component when import completes. Useful for sidebar toggles, or other elements that should only display on mobile or desktop devices.

### `<MyComponent client:only />`

Start importing the component JS at page load and hydrate when the import completes, similar to `client:load`. The component will be **skipped** at build time, useful for components that are entirely dependent on client-side APIs. This is best avoided unless absolutely needed, in most cases it is best to render placeholder content on the server and delay any browser API calls until the component hydrates in the browser.

If more than one renderer is included in the Astro [config](/en/reference/configuration-reference), `client:only` needs a hint to know which renderer to use for the component. For example, `client:only="react"` would make sure that the component is hydrated in the browser with the React renderer. For custom renderers not provided by `@astrojs`, use the full name of the renderer provided in your Astro config, i.e. `<client:only="my-custom-renderer" />`.

📚 See our [directives reference](/en/reference/directives-reference#client-directives) page for more infomation on all of the `client:` directives.

## Can I Hydrate Astro Components?

[Astro components](/en/core-concepts/astro-components) (`.astro` files) are HTML-only templating components with no client-side runtime. If you try to hydrate an Astro component with a `client:` modifier, you will get an error.

To make your Astro component interactive, you will need to convert it to the frontend framework of your choice: React, Svelte, Vue, etc. If you have no preference, we recommend React or Preact as they are most similar to Astro’s syntax. Using a frontend framework provides a client-side runtime that encapsulates the JavaScript and allows usage of `client:` modifiers per component instance.

Alternatively, you could add a `<script>` tag to your Astro component HTML template and send JavaScript to the browser that way, but this script will execute in the global scope and there will be no client-side component to attach a `client:` modifier to. While this is fine for the simple stuff, we recommend a frontend framework for more complex interactive components.

```astro
---
// Example: Using Astro with script tags
---
<h1>Not clicked</h1>
<button>Click to change heading</button>
<script>
document.querySelector("button").addEventListener("click",() => {
    document.querySelector("h1").innerText = "clicked"
})
</script>
```

[mdn-io]: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
[mdn-ric]: https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback
[mdn-mm]: https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
