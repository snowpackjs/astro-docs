---
layout: ~/layouts/MainLayout.astro
title: CLI Reference
---

## Commands

### `astro dev`

Runs  Astro's `dev` server. It starts an HTTP server which responds to requests for routes or pages that are specified within `src/pages` directory (unless overridden by your `pages` option set in the project [configuration](/en/reference/configuration-reference)).

**Flags**

#### `--port`

Specifies which port to run on. Defaults to `3000`.

#### `--host [optional host address]`

Sets which network IP addresses the dev server should listen on (i.e. non-localhost IPs).
- `--host` - listen on all addresses, including LAN and public addresses
- `--host [custom-address]` - expose on a network IP address at `[custom-address]`

### `astro build`

Builds your site for production.

### `astro preview`

Starts a local static file server to serve your built `dist/` directory. Useful for previewing your static build locally, before deploying it.

This command is meant for local testing only, and is not designed to be run in production. For help with production hosting, check out our guide on [Deploying an Astro Website](/en/guides/deploy).

### `astro check`

Runs diagnostics (such as type-checking) against your project and reports errors to the console. If any errors are found the process will exit with a code of **1**.

This command is intended to be used in CI workflows.

## Global Flags

### `--config path`

Specifies the path to the config file. Defaults to `astro.config.mjs`. Use this if you use a different name for your configuration file or have your config file in another folder.

```shell
astro --config config/astro.config.mjs dev
```

### `--root path`

Specifies the path to the project root. If not specified the current working directory is assumed to be the root.

The root is used for finding the Astro configuration file.

```shell
astro --root examples/snowpack dev
```

### `--reload`

Clears the cache (dependencies are built within Astro apps).

### `--verbose`

Enables verbose logging, which is helpful when debugging an issue.

### `--silent`

Enables silent logging, which is helpful when you don't want to see Astro logs.

### `--version`

Prints the Astro version number and exits.

### `--help`

Prints the help message and exits.
