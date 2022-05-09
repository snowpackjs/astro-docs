---
layout: ~/layouts/MainLayout.astro
title: Aliases
description: Uma introdução aos atalhos com Astro.
---

Um **alias** é uma maneira de criar atalhos para os seus imports.

Atalhos podem ajudar a melhorar a experiência de desenvolvimento em bases de código com muitos diretórios ou com muita importação relativa.

```astro
---
// meu-projeto/src/pages/about/company.astro

import Button from '../../components/controls/Button.astro';
import logoUrl from '../../assets/logo.png?url';
---
```

Neste exemplo, um desenvolvedor precisaria entender a árvore de relação entre `src/pages/about/company.astro`, `src/components/controls/Button.astro` e `src/assets/logo.png`. E então, se o arquivo `company.astro` for movido para outro diretório, estas importações precisariam ser atualizadas.

Você pode adicionar um atalho de importação em `tsconfig.json` ou `jsconfig.json`.

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@assets/*": ["src/assets/*"],
      "@components/*": ["src/components/*"]
    }
  }
}
```

Com esta alteração, você pode usar o atalho para importar seus arquivos em qualquer lugar do projeto:

```astro
---
// meu-projeto/src/pages/about/company.astro

import Button from '@components/Button';
import logoUrl from '@assets/logo.png';
---
```

Estes atalhos são automaticamente integrados ao [VSCode](https://code.visualstudio.com/docs/languages/jsconfig) e a outros editores.
