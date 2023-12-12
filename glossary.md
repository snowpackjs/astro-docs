---
title: Glossary 
description: A collection of technical terminology commonly used in the Astro documentation and community.
i18nReady: false
---

This glossary describes common terminology used in the Astro documentation and the Astro community.

{ /* // Uncomment this section when we have more terms to add to the glossary.
It is separated into Astro-specific terms and general web development terms.
## Astro-Specific Terms 

Some future guidelines for this:
- Astro-Specific: Content Collections, ViewTransitions, Astro Component
- General: Editor, LSP, Front-End Library, Framework, Metaframework, Framework Component
*/}

### Component

Astro components are the basic building blocks of any Astro project. They are HTML-only templating components with no client-side runtime. You can spot an Astro component by its file extension: `.astro`. Read more about components in the [Astro Components](https://docs.astro.build/en/core-concepts/astro-components/) page.

### Islands

**Islands** is a frontend architecture that results in better frontend performance by helping you avoid monolithic JavaScript patterns and stripping all non-essential JavaScript from the page automatically. The technique that this architectural pattern builds on is also known as partial or selective hydration. In Astro, an `island` refers to any interactive UI component on the page. Read more about islands in the [Astro Islands](https://docs.astro.build/en/concepts/islands/) page.