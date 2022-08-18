---
layout: ~/layouts/MainLayout.astro
title: Abrufen von Daten
description: Erfahre, wie Astro mithilfe der Fetch-API Remote-Daten abrufen kann
---

`.astro`-Dateien können zur Erstellung der Website Remote-Daten abrufen, um die Erstellung deiner Seiten zu unterstützen.

## `fetch()` in Astro

Jede [Astro-Komponente](/en/core-concepts/astro-components/) hat Zugriff auf die [globale `fetch()`-Funktion](https://developer.mozilla.org/en-US/docs/Web/API/fetch) in ihrem Komponentenskript, um HTTP-Requests an APIs zu senden. Dieser fetch-Aufruf wird zur Erstellungszeit ausgeführt und die Daten sind in der Komponentenvorlage für eine dynamische HTML-generierung verfügbar.

💡 Nutze die Vorteile von [**Top-Level Await**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#top_level_await) in deinem Astro-Komponentenskript.

💡 Übergebe die abgerufenen Daten als Eigenschaften an Astro- als auch an Framework-Komponenten.

```astro /await fetch\\(.*?\\)/
---
// src/components/User.astro
import Contact from '../components/Contact.jsx';
import Location from '../components/Location.astro';

const response = await fetch('https://randomuser.me/api/');
const data = await response.json();
const randomUser = data.results[0];
---
<!-- Daten, die zur Erstellungszeit abgerufen werden, können in HTML gerendert werden -->
<h1>User</h1>
<h2>{randomUser.name.first} {randomUser.name.last}</h2>

<!-- Daten die zur Erstellungszeit abgerufen werden, können als Eigenschaften an die Komponente übergeben werden -->
<Contact client:load email={randomUser.email} />
<Location city={randomUser.location.city} />
```

:::note
Bedenke, alle Daten in Astro-Komponenten werden zum Render-Zeitpunkt der Komponente abgerufen.

Deine veröffentlichte Astro-Website ruft Daten **einmal, zur Erstellzeit** ab. In der Entwicklung wirst du bei jeder Komponentenaktualisierung einen Datenabruf sehen. Wenn du einen mehrfachen Datenabruf Clientseitig benötigst, nutze eine [Framework-Komponente](/de/core-concepts/framework-components/) oder ein [Clientseitiges Skript](/de/core-concepts/astro-components/#clientseitige-skripte) in einer Astro-Komponente.
:::


## `fetch()` in Framework-Komponenten

Die `fetch()`-Funktion ist auch global in jeder [Framework-Komponente](/de/core-concepts/framework-components/) verfügbar:

```tsx title="src/components/Movies.tsx" /await fetch\\(.*?\\)/
import type { FunctionalComponent } from 'preact';
import { h } from 'preact';

const data = await fetch('https://example.com/movies.json').then((response) =>
  response.json()
);

// Komponenten die zum Zeitpunkt der Erstellung gerendert werden, loggen Daten auch in der CLI.
// Wenn sie mit einer client:*-Direktive gerendert werden, wird dies auch in der Browser-Konsole angezeigt.
console.log(data);

const Movies: FunctionalComponent = () => {
// Ausgabe des Ergebnisses in die Seite
  return <div>{JSON.stringify(data)}</div>;
};

export default Movies;
```


## GraphQL-Abfragen

Astro kann auch `fetch()` nutzen, um GraphQL-Server mit einer beliebigen gültigen GraphQL-Anfrage anzufragen.

```astro title="src/components/Weather.astro" "await fetch"
---
const response = await fetch("https://graphql-weather-api.herokuapp.com",
  {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      query: `
        query getWeather($name:String!) {
            getCityByName(name: $name){
              name
              country
              weather {
                summary {
                    description
                }
              }
            }
          }
        `,
      variables: {
          name: "Toronto",
      },
    }),
  });

const json = await response.json();
const weather = json.data;
---
<h1>Abruf des Wetters zur Erstellungszeit</h1>
<h2>{weather.getCityByName.name}, {weather.getCityByName.country}</h2>
<p>Wetter: {weather.getCityByName.weather.summary.description}</p>
```

## Abfragen von einem Headless-CMS

Lade Remote-Inhalte aus deinem favourisiertem CMS, wie Storyblok oder WordPress!

Astro-Komponenten könnten Daten von deinem CMS abrufen und in deinen Seiteninhalt rendern. Mit [dynamischen Routen](//de/core-concepts/routing/#dynamische-routen) können Komponenten sogar Seiten auf der Basis deiner CMS-Inhalte generieren.

Hier sind ein paar Beispiele, wie die Datenabfrage in Astro aussieht, mit Links zu den vollständigen Tutorials unten.

### Beispiel: Storyblok API

```astro
---
// src/pages/index.astro
// Abrufen einer Liste deine Storyblok-Seitenlinks mit @storyblok/js
import BaseLayout from '../layouts/BaseLayout.astro';
import { storyblokInit, apiPlugin } from "@storyblok/js";

const { storyblokApi } = storyblokInit({
  accessToken: "MY_STORYBLOK_ACCESS_TOKEN",
  use: [apiPlugin],
});

const { data } = await storyblokApi.get('cdn/links');
const links = Object.values(data.links);
---
<BaseLayout>
  <h1>Astro + Storyblok</h1>
  <ul>
    {links.map(link => (
      <li><a href={link.slug}>{link.name}</a></li>
    ))}
  </ul>
</BaseLayout>
```
Sieh dir das vollständige Tutorial [Hinzufügen eines Headless-CMS zu Astro in 5 Minuten](https://www.storyblok.com/tp/add-a-headless-cms-to-astro-in-5-minutes) an, um Storyblok zu Astro hinzuzufügen!

### Bespiel: WordPress + GraphQL

```astro
---
// src/pages/about.astro
// Abrufen deines Über-Seiteninhalts von der WordPress API

import BaseLayout from '../../layouts/BaseLayout.astro';

const slug = 'about';
const response = await fetch(import.meta.env.WORDPRESS_API_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: `
    {
      page(id:"${slug}", idType:URI) {
        title 
        content 
      }
    }
  `
});
const data = await response.json();
---
<BaseLayout>
  <h1>{data.title}</h1>
  <article set:html={data.content} />
</BaseLayout>
```

Sieh dir das vollständige Tutorial [Erstellen einer Astro-Website mit WordPress als Headless-CMS](https://blog.openreplay.com/building-an-astro-website-with-wordpress-as-a-headless-cms) an, um WordPress zu deinem Astro-Projekt hinzuzufügen! 
