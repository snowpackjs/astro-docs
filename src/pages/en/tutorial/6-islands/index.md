---
layout: ~/layouts/TutorialLayout.astro
unitTitle: Set sail for Astro islands
title: Check in
description: Using client-side Javascript and UI Framework components in Astro to provide interactivity.
setup: |
  import Badge from '~/components/Badge.astro';
  import Box from '~/components/tutorial/Box.astro';
  import Checklist from '~/components/Checklist.astro';
  import Goals from '~/components/tutorial/Goals.astro';
  import MultipleChoice from '~/components/tutorial/MultipleChoice.astro';
  import Option from '~/components/tutorial/Option.astro';
---
Now that you have a fully functioning blog, let's add some interactive islands to your site!

## Where are we now?

Click to run a working version of the code at this point in the tutorial right on this page.

 <iframe src="https://stackblitz.com/edit/astro-tutorial-5?ctl=1&embed=1&file=src/pages/index.astro"></iframe>
 Check your code against the tutorial example, or if you've just joined us, fork on StackBlitz to start coding along in your browser from here.

## Where are we going?

<Goals>

  - added your first UI framework to your Astro project (Preact)
  - uesd other framework components (Preact) in Astro
  - sent JavaScript to the browser on a per-island basis using `client:` directives
  - built a light/dark theme toggle *without* an island, using only JS and CSS

</Goals>

Astro islands are interactive UI framework components that render in isolation in an otherwise "sea" of static HTML.

You can mix and match different supported frameworks (React, Preact, Svelte, Vue, Solid, Alpine, Lit) on the same page, or just pick your favorite. 

You might even find that with an Astro `<script>` tag, you don't even need an island at all. Look how far you have already come without adding any UI framework components to your Astro project!

## Before you go
<Box icon="check-list">

### Checklist for moving on

<Checklist key ="interactivity">
- [ ] I am ready to add some interactivity to my site, and start living that island life!
</Checklist>
</Box>
