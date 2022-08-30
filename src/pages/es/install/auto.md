---
title: Instala Astro con el CLI automático
description: Cómo instalar Astro con NPM, PNPM, o Yarn a través de create-astro con el CLI de Astro.
layout: ~/layouts/MainLayout.astro
setup: import InstallGuideTabGroup from '~/components/TabGroup/InstallGuideTabGroup.astro';
i18nReady: true
---
¿Listo para instalar Astro? Sigue nuestra guía de instalación automática o manual para comenzar.

#### Prerrequisitos

- **Node.js** - `14.18.0`, `v16.12.0`, o mayor.
- **Editor de código** - Recomendamos [VS Code](https://code.visualstudio.com/) con nuestra [extensión oficial](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode).
- **Terminal** - Astro es usado a través de la interfaz de línea de comandos (CLI).

<InstallGuideTabGroup />

#### Instalación

`create-astro` es la forma más rápida y fácil de comenzar un nuevo proyecto en Astro.

:::tip[Previsualizaciones en línea]
¿Prefieres probar Astro en tu navegador? Visita [astro.new](https://astro.new/) para ver nuestras plantillas y crear un proyecto de Astro solamente usando tu navegador.
:::
## 1. Ejecuta el Asistente de Configuración

Ejecuta el siguiente comando en tu terminal para iniciar el asistente de instalación, `create-astro`.

```shell
# npm
npm create astro@latest

# yarn
yarn create astro

# pnpm
pnpm create astro@latest
```

El asistente `create-astro` te guiará paso a paso en la configuración de tu nuevo proyecto de Astro. Puedes ejecutarlo en cualquier carpeta de tu computadora, así que no es necesario crear un directorio vacío antes de inicializar tu proyecto. Si aun no tienes un directorio designado para tu nuevo proyecto, el asistente creará uno por ti.

Si todo ha salido bien, deberías ver un mensaje "Ready for liftoff!" seguido de algunas recomendaciones de próximos pasos, "Next steps". Entra en el nuevo directorio de tu proyecto usando `cd` y empieza a utilizar Astro.

Si has salteado el paso de `npm install` durante el asistente `create-astro`, asegúrate de instalar las dependencias antes de continuar.

## 2. Inicia Astro ✨

Astro posee un servidor de desarrollo que tiene todo lo que necesitas para desarrollar tu proyecto. El comando `astro dev` iniciará el servidor de desarrollo local para que veas tu nuevo proyecto en acción.

Cada plantilla de inicio posee un script pre-configurado que ejecutará `astro dev` por ti. Utiliza tu gestor de paquetes favorito para ejecutar este comando e iniciar el servidor de desarrollo de Astro.

```bash
# npm
npm run dev

# yarn
yarn run dev

# pnpm
pnpm run dev
```

¡Si todo marcha bien, Astro deberá servir tu proyecto localmente en [http://localhost:3000](http://localhost:3000)!

Astro escuchará cualquier cambio en la carpeta `src/` y actualizará automáticamente tu proyecto. De esta forma, no será necesario reiniciar el servidor local durante el desarrollo.

Si no es posible abrir el proyecto en el navegador, regresa a la terminal donde has ejecutado el comando `dev` y chequea si ha ocurrido algún error o si tu proyecto está siendo servido desde una URL diferente a la que figura más arriba.

## Siguientes pasos

¡Felicidades! ¡Estás listo para empezar a desarrollar con Astro! 🥳

Estos son algunos temas que recomendamos explorar luego. Puedes leerlos en el orden que más te guste. También puedes dejar la documentación a un lado e ir a jugar un poco con el código de tu nuevo proyecto Astro y volver cuando tengas algún problema o una pregunta para responder.

📚 **Añade un framework:** Aprende cómo extender Astro con soporte para React, Svelte, Tailwind y más usando `npx astro add` en nuestra [Guía de integraciones](/es/guides/integrations-guide/).

📚 **Despliega tu sitio:** Aprende cómo hacer el build y desplegar tu proyecto de Astro en la web con nuestra [Guía de despliegue](/es/guides/deploy/).

📚 **Entiende el código base:** Aprende más sobre la estructura de proyectos de Astro en nuestra [Guía de estructura de proyectos](/es/core-concepts/project-structure/).
