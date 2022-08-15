---
layout: ~/layouts/MainLayout.astro
setup: |
  import Badge from '~/components/Badge.astro';
title: Configuración del editor de código
description: Configura tu editor de código para desarrollar con Astro.
i18nReady: true
---

Personaliza tu editor de código para mejorar tu experiencia de desarrollo con Astro y desbloquear nuevas funcionalidades.

## VS Code

[VS Code](https://code.visualstudio.com/) es un editor de código popular para desarrolladores web, desarrolado por Microsoft. El motor de VS Code también funciona en los editores de código en el navegador como [GitHub Codespaces](https://github.com/features/codespaces) y [Gitpod](https://gitpod.io/).

Astro funciona en cualquier editor de código. Sin embargo, recomendamos usar VS Code para tus proyectos de Astro. Nosotros mantenemos la [extensión oficial de Astro para VS Code](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode) que desbloquea nuevas funcionalidades y mejora la experiencia de desarrollo para sus proyectos.

- Resaltado de sintaxis para archivos `.astro`.
- Información de tipos de TypeScript para archivos `.astro`.
- [Intellisense de VS Code](https://code.visualstudio.com/docs/editor/intellisense) para autocompletado, sugerencias y más.

Para empezar, instala la [extensión de Astro para VS Code](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode).

📚 Aprende cómo [configurar TypeScript](/es/guides/typescript/) en tu proyecto de Astro.

## Otros editores de código

Nuestra increíble comunidad mantiene extensiones para otros editores de código incluyendo:

- [Extensión de VS Code para Open VSX](https://open-vsx.org/extension/astro-build/astro-vscode)<span style="margin: 0.25em;"><Badge variant="accent">oficial</Badge></span> - La extensión official de VS Code, está disponible en el registro the Open VSX para otras plataformas como [VSCodium](https://vscodium.com/).
- [Extensión de Nova](https://extensions.panic.com/extensions/sciencefidelity/sciencefidelity.astro/)<span style="margin: 0.25em;"><Badge variant="neutral">Comunidad</Badge></span> - Provee resaltado de sintaxis y autocompletado para Astro en Nova.
- [Vim Plugin](https://github.com/wuelnerdotexe/vim-astro) <span style="margin: 0.25em;"><Badge variant="neutral">Comunidad</Badge></span> - Provee resaltado de sintaxis, indentación y compatibilidad con folding de código para Astro en Vim o Neovim
- Neovim [LSP](https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md#astro) y [TreeSitter](https://github.com/virchau13/tree-sitter-astro) Plugins <span style="margin: 0.25em;"><Badge variant="neutral">Comunidad</Badge></span> - Provee resaltado de sintaxis, análisis de árboles y autocompletado para Astro en Neovim

### IDE de JetBrains

Nos encantaría agregar compatibilidad con [Webstorm IDE](https://www.jetbrains.com/webstorm/). Desafortunadamente, no es compatible con servidores de idioma y no tenemos el ancho de banda para escribir y mantener una extensión completamente separada en un idioma diferente al de nuestro código base existente. Visite el [ticket de soporte de JetBrains](https://youtrack.jetbrains.com/issue/WEB-52015/Astro-Language-Support) relevante para votar a favor del ticket, realizar un seguimiento del progreso y encontrar soluciones alternativas de la comunidad.

Sin embargo, el próximo [Fleet IDE](https://www.jetbrains.com/fleet/) de JetBrains _será_ compatible servidores de idioma y nuestras herramientas actualmente disponibles podrán ejecutarse allí sin ningún problema.

## Editores de código del navegador

Además de editores de código locales, Astro también funciona en editores de código en el navegador incluyendo:

- [StackBlitz](https://stackblitz.com/) y [CodeSandbox](https://codesandbox.io) - editores de código online del navegador, con resaltado de sintaxis incorporado, y soporte para archivos `.astro`. ¡No necesita instalación o configuración!
- [GitHub.dev](https://github.dev/) - te permite instalar la extensión de Astro para VS Code como una [extensión](https://code.visualstudio.com/api/extension-guides/web-extensions), que le permite acceder a las funcionalidades de la extensión oficial. Actualmente, sólo soporta el resaltado de sintaxis.
- [Gitpod](https://gitpod.io/) - es un entorno de desarrollo en la nube en el que puedes instalar la extensión de VS Code oficial desde Open VSX.

## Otras herramientas

### ESLint

[ESLint](https://eslint.org/) es un linter popular para JavaScript y JSX. Para activar la compatibilidad con Astro, puedes instalar [un plugin mantenido por la comunidad](https://github.com/ota-meshi/eslint-plugin-astro).

Consulta [la guía del usuario del proyecto](https://ota-meshi.github.io/eslint-plugin-astro/user-guide/) para obtener más información sobre cómo instalar y configurar ESLint para tu proyecto.

### Prettier

[Prettier](https://prettier.io/) es un formateador popular para JavaScript, HTML, CSS y más. Para agregar compatibilidad para formatear archivos `.astro`, usa [el plugin oficial de Astro Prettier](https://github.com/withastro/prettier-plugin-astro).

Para comenzar, primero instala Prettier y el plugin:

```shell
npm install --save-dev prettier prettier-plugin-astro
```

Prettier detectará automáticamente el plugin y lo usará para procesar los archivos `.astro` cuando lo ejecute:

```shell
prettier --write .
```

Consulte el [README del plugin de Prettier](https://github.com/withastro/prettier-plugin-astro/blob/main/README.md) para obtener más información sobre sus opciones, cómo configurar Prettier dentro de VS Code y más.

:::caution[Uso con pnpm]
Debido a problemas dentro de Prettier, el plugin no se detectará automáticamente al usar [pnpm](https://pnpm.io/). Para que encuentre el plugin, se debe agregar el siguiente parámetro al ejecutar Prettier:

```shell
prettier --write --plugin-search-dir=. .
```

También se requieren configuraciones adicionales cuando se usa Prettier dentro de VS Code. Consulta el README del plugin para obtener más información.
:::
