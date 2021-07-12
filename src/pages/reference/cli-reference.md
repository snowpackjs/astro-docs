---
layout: ~/layouts/Main.astro
title: CLI Reference
---

## Commands

### `astro dev`

Runs the Astro development server. This starts an HTTP server that responds to requests for pages stored in `src/pages` (or which folder is specified in your [configuration](/reference/configuration-reference)).

See the [dev server](./dev.md) docs for more information on how the dev server works.

**Flags**

#### `--port`

Specifies should port to run on. Defaults to `3000`.

### `astro build`

Builds your site for production.


## Global Flags

### `--config path`

Specify the path to the config file. Defaults to `astro.config.mjs`. Use this if you use a different name for your configuration file or have your config file in another folder.

```shell
astro --config config/astro.config.mjs dev
```

### `--project-root path`

Specify the path to the project root. If not specified the current working directory is assumed to be the root.

The root is used for finding the Astro configuration file.

```shell
astro --project-root examples/snowpack dev
```

### `--reload`

Clears the cache (dependencies are built within Astro apps).

### `--verbose`

Enables verbose logging, which is helpful when debugging an issue.

### `--version`

Print the Astro version number and exit.

### `--help`

Print the help message and exit.
