---
title: Despliega tu proyecto de Astro en Google Cloud
description: Cómo desplegar tu proyecto de Astro usando Google Cloud.
layout: ~/layouts/DeployGuideLayout.astro
i18nReady: true
---

[Google Cloud](https://cloud.google.com/) es una plataforma integral de alojamiento, que puede ser usada para desplegar un proyecto de Astro.

## Cómo desplegar

Desplegar un proyecto en Google Cloud requiere algunos clics en la interfaz web. (La mayoría de estas acciones también pueden ser hechas usando la [CLI de gcloud](https://cloud.google.com/sdk/gcloud/)).

### Cloud Run

1. Crea un nuevo proyecto de Google Cloud, o selecciona alguno que ya tengas.

2. Asegúrate que la API de Cloud Run se encuentre habilitada.

3. Crea un nuevo servicio.

4. Usa un contenedor de Docker Hub o construye el tuyo usando [Cloud Build](https://cloud.google.com/build).

5. Configura un puerto desde el que se accedan los archivos.

6. Habilita el acceso público añadiendo un nuevo permiso a `allUsers` llamado `Cloud Run Invoker`.

### Cloud Storage

1. Crea un nuevo proyecto de Google Cloud, o selecciona alguno que ya tengas.

2. Crea un nuevo contenedor dentro de [Cloud Storage](https://cloud.google.com/storage).

3. Asígnale un nombre y completa otros ajustes requeridos.

4. Sube tu directorio `dist` en él o súbelo usando [Cloud Build](https://cloud.google.com/build).

5. Habilita el acceso público añadiendo un nuevo permiso a `allUsers` llamado `Storage Object Viewer`.

6. Edita la configuración del sitio y añade un `ìndex.html` como punto de entrada y un `404.html` como página de error.
