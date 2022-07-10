---
layout: ~/layouts/MainLayout.astro
title: TypeScript
description: Aprenda como utilizar o suporte integrado a TypeScript do Astro.
i18nReady: true
---

Astro vem com suporte integrado para [TypeScript](https://www.typescriptlang.org/). Você pode importar arquivos `.ts` e `.tsx` em seu projeto Astro, escrever código TypeScript dentro de seu [componente Astro](/pt-br/core-concepts/astro-components/#o-script-do-componente), e até mesmo utilizar um arquivo [`astro.config.ts`](/pt-br/guides/configuring-astro/#o-arquivo-de-configuração-astro) se você quiser.

O Astro em si não realiza checagem de tipo. A checagem de tipo deve ser realizada fora do Astro, seja pela sua IDE ou por um script separado. A [extensão para VSCode do Astro](/pt-br/editor-setup/) automaticamente providencia dicas e erros do TypeScript em seus arquivos abertos.


## Configuração

É **altamente recomendado** que você crie um arquivo `tsconfig.json` em seu projeto, para que ferramentas como Astro e o VSCode saibam como entender o seu projeto. Algumas funcionalidades (como importação de pacotes do npm) não são completamente suportadas no TypeScript sem um arquivo `tsconfig.json`. 

Algumas opções de configuração do TypeScript precisam de atenção especial no Astro. Abaixo está nosso arquivo `tsconfig.json` inicial recomendado, que você pode copiar e colar em seu próprio projeto. Cada [template em astro.new](https://astro.new/) inclui este arquivo `tsconfig.json` por padrão.

```json
// Exemplo: tsconfig.json inicial para projetos Astro
{
  "compilerOptions": {
    // Habilita top-level await e outras funcionalidades modernas do ESM.
    "target": "ESNext",
    "module": "ESNext",
    // Habilita a resolução de módulos estilo node para coisas como importações de pacotes do npm.
    "moduleResolution": "node",
    // Habilita a importação de arquivos JSON.
    "resolveJsonModule": true,
    // Habilita transpilação estrita para um resultado final melhor.
    "isolatedModules": true,
    // Adiciona definições de tipo para nosso runtime Vite.
    "types": ["vite/client"],
    // Diz ao TypeScript onde o seu diretório de saída da build está.
    "outDir": "./dist"
  }
}
```

## Importações de Tipos

Utilize importações e exportações de tipos sempre que possível. Isso irá ajudar a evitar casos extremos em que o bundler do Astro pode tentar incorretamente fazer bundle dos seus tipos importados como se fossem JavaScript.

```diff
- import { AlgumTipo } from './script';
+ import type { AlgumTipo } from './script';
```

## Checagem de Tipos

Para ver erros de tipagem no seu editor, por favor certifique-se de que você tem a [extensão Astro para VS Code](/pt-br/editor-setup/) instalada. Por favor note de que os comandos `astro start` e `astro build` irão transpilar o código com esbuild, porém você não irá executar nenhuma checagem de tipos. Para previnir o seu código de fazer build quando conter erros de TypeScript, mude o seu script "build" no `package.json` para o seguinte:

```diff
-    "build": "astro build",
+    "build": "astro check && tsc --noEmit && astro build",
```

:::note
`astro check` apenas checa a tipagem em arquivos `.astro`, e `tsc --noEmit` apenas checa a tipagem em arquivos `.ts` e `.tsx`.
:::

## Aliases de Importação

Astro suporta [aliases de importação](/pt-br/guides/aliases/) que você define na configuração `paths` do seu `tsconfig.json` e `jsconfig.json`. [Leia nosso guia](/pt-br/guides/aliases/) para aprender mais.

```ts
import OlaMundo from '@components/OlaMundo.astro';
import Layout from '@layouts/Layout.astro';
```

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
      "@layouts/*": ["src/layouts/*"]
    }
  }
}
```

## Props de Componentes

Astro suporta a tipagem das props dos seus componentes via TypeScript. Para habilitar, exporte uma interface TypeScript `Props` de seu componente Astro. A [extensão para VSCode do Astro](/pt-br/editor-setup/) irá automaticamente procurar pela exportação de `Props` e te dar suporte a TypeScript quando você utilizar aquele componente dentro de outro template. 

```astro
---
// Exemplo: OlaMundo.astro
export interface Props {
  nome: string;
  saudacao?: string;
}
const { saudacao = 'Olá', nome } = Astro.props
---
<h2>{saudacao}, {nome}!</h2>
```


📚 Leia mais sobre [a importação de arquivos `.ts`](/pt-br/guides/imports/#typescript) no Astro.

📚 Leia mais sobre [a configuração do TypeScript](https://www.typescriptlang.org/tsconfig/).
