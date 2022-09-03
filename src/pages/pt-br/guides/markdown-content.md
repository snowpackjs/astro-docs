---
setup: |
  import Tabs from '../../../components/tabs/Tabs';
layout: ~/layouts/MainLayout.astro
title: Markdown e MDX
description: Aprenda como criar conteúdo usando Markdown ou MDX no Astro
i18nReady: true
---

[Markdown](https://daringfireball.net/projects/markdown/) é comumente usado para criar conteúdo com muito texto, como postagens de blog e documentação. Astro inclui suporte nativo para arquivos Markdown padrão (`.md`). 

Com a [integração `@astrojs/mdx`](/pt-br/guides/integrations-guide/mdx/) instalada, Astro também suporta arquivos [MDX](https://mdxjs.com/) (`.mdx`) que trazem alguns recursos adicionais como suporte para expressões JavaScript e componentes direto do seu conteúdo Markdown.

Use um ou ambos os tipos de arquivo para escrever seu conteúdo Markdown!

## Páginas Markdown e MDX

Astro trata qualquer arquivo `.md` ou `.mdx` dentro do diretório `/src/pages/` como uma página. Colocar um arquivo nesse diretório, ou em qualquer subdiretório, criará automaticamente uma rota de página usando o nome do caminho do arquivo.

📚 Leia mais sobre o [roteamento baseado em arquivos](/pt-br/core-concepts/routing/) do Astro.

### Exemplo Básico

Para começar a usar Markdown no Astro, adicione um novo arquivo `pagina-1.md` ao seu projeto no diretório `src/pages/`. Copie o template básico abaixo em seu arquivo e então veja o HTML renderizado no seu navegador. Geralmente, isso vai ser em [http://localhost:3000/pagina-1](http://localhost:3000/pagina-1).

```markdown
---
# Exemplo: src/pages/pagina-1.md
title: Olá, mundo!
---

# Olá!

Esta é sua primeira página em Markdown. Provavelmente, ela não tem muito estilo, embora o Markdown ofereça suporte para **negrito** e _itálico_.

Para saber mais sobre como adicionar um layout à sua página, leia a próxima seção, **Layouts no Markdown**.
```

### Frontmatter `layout`

Astro fornece páginas Markdown e MDX com uma propriedade frontmatter especial para `layout` que define o caminho relativo para um [componente de layout](/pt-br/core-concepts/layouts/#layouts-markdown) Astro. Este componente envolverá seu conteúdo Markdown, fornecendo uma casca de página e quaisquer outros elementos de template de página incluídos.

```markdown {3}
---
// src/pages/pagina.md
layout: ../layouts/LayoutBase.astro
titulo: "Lançamento do Astro v1!"
autor: "Matthew Phillips"
data: "09 Ago 2022"
---
```

Um layout típico para páginas Markdown inclui:

1. A prop `frontmatter` para acessar o frontmatter e outros dados da página Markdown ou MDX. Veja [Props de Layout Markdown](#props-de-layout-markdown) para uma lista completa de props disponíveis.
2. Um [`<slot />`](/pt-br/core-concepts/astro-components/#slots) padrão para indicar onde o conteúdo Markdown da página deve ser renderizado.

```astro /(?<!//.*){?frontmatter(?:\\.\w+)?}?/ "<slot />"
---
// src/layouts/LayoutBase.astro
// 1. A prop frontmatter dá acesso ao frontmatter e outros dados
const { frontmatter } = Astro.props;
---
<html>
  <head>
    <!-- Adicione outros elementos Head aqui, como estilos e tags meta. -->
    <title>{frontmatter.titulo}</title>
  </head>
  <body>
    <!-- Adicione outros componentes de UI aqui, como cabeçalhos e rodapés comuns. -->
    <h1>{frontmatter.titulo} por {frontmatter.autor}</h1>
    <!-- 2. O HTML renderizado será passado para o slot padrão. -->
    <slot />
    <p>Escrito em: {frontmatter.data}</p>
  </body>
</html>
```

### Props de Layout Markdown

A prop `content` também contém uma propriedade `astro` com metadados adicionais sobre uma página Markdown como o objeto `source` completo do Markdown e um objeto `headers`.

:::note
Arquivos Markdown e MDX não retornam objetos `Astro.props` idênticos. Veja o guia da integração MDX para as [propriedades expostas do MDX](/pt-br/guides/integrations-guide/mdx/#exported-properties).
:::

Um layout Markdown terá acesso as seguintes informações via `Astro.props`:

- **`file`** - O caminho absoluto deste arquivo (e.x. `/home/user/projetos/.../arquivo.md`).
- **`url`** - Se for uma página, a URL da página (e.x. `/pt-br/guides/markdown-content`).
- **`frontmatter`** - todo o frontmatter de um documento Markdown ou MDX.
  - **`frontmatter.file`** - O mesmo que a propriedade `file` superior.
  - **`frontmatter.url`** - O mesmo que a propriedade `url` superior.
- **`headings`** - Uma lista de títulos (`h1 -> h6`) no documento Markdown com metadados associados. Esta lista segue o tipo: `{ depth: number; slug: string; text: string }[]`.
- **`rawContent()`** - Uma função que retorna o documento Markdown bruto como uma string.
- **`compiledContent()`** - Uma função que retorna o document Markdown compilado como uma string de HTML.

Uma postagem de blog de exemplo pode passar o seguinte objeto `Astro.props` ao seu layout:

```js
Astro.props = {
  file: "/home/user/projetos/.../arquivo.md",
  url: "/pt-br/guides/markdown-content/",
  frontmatter: {
    /** Frontmatter de uma postagem de blog */
    titulo: "Lançamento do Astro 0.18",
    data: "Terça-feira, 27 de Julho de 2021",
    autor: "Matthew Phillips",
    descricao: "Astro 0.18 é o nosso maior lançamento desde o lançamento do Astro.",
    /** Valores gerados */
    file: "/home/user/projetos/.../arquivo.md",
    url: "/pt-br/guides/markdown-content/"
  },
  headings: [
    {
      "depth": 1,
      "text": "Lançamento do Astro 0.18",
      "slug": "lancamento-do-astro-018"
    },
    {
      "depth": 2,
      "text": "Hidratação parcial responsiva",
      "slug": "hidratacao-partial-responsiva"
    }
    /* ... */
  ],
  rawContent: () => "# Lançamento do Astro 0.18\nA um pouco mais de um mês atrás, a primeira beta pública [...]",
  compiledContent: () => "<h1>Lançamento do Astro 0.18</h1>\n<p>A um pouco mais de um mês atrás, a primeira beta pública [...]</p>",
}
```

#### Exemplo: Usando um Layout para arquivos `.md`, `.mdx` e `.astro`. 

Um único layout Astro pode ser escrito para receber o objeto `frontmatter` de arquivos `.md` e `.mdx` assim como quaisquer props nomeadas passadas de arquivos `.astro`.

No exemplo abaixo, o layout irá mostrar o título da página seja de um componente Astro passando o atributo `titulo` ou de uma propriedade YAML frontmatter `titulo`:

```astro /{?titulo}?/ /Astro.props[.a-z]*/
---
// src/components/MeuLayout.astro
const { titulo } = Astro.props.frontmatter || Astro.props;
---
<html>
  <head></head>
  <body>
    <h1>{titulo}</h1>
    <slot />
  </body>
</html>
```

### IDs de Cabeçalhos Markdown

Astro adicionará IDs autogerados a todos os títulos em arquivos Markdown automaticamente usando [github-slugger](https://github.com/flet/github-slugger). Mas, se um ID personalizado for especificado, ele não será substituído.

Esses IDs serão adicionados _depois_ que todos os outros plugins são executados, então, se você tem um plugin como `rehype-toc`, que precisa de IDs, você deve adicionar seu próprio plugin de slug (como `rehype-slug`).

### Rascunhos Markdown

`draft: true` é um valor opcional de frontmatter que marcará uma página ou postagem `.md` individual como "não publicado". Por default, esta página será excluída do build do site.

Páginas Markdown sem a propriedade `draft` ou aquelas com `draft: false` não são afetadas e serão incluídas na build final.

```markdown {5}
---
# src/pages/post/postagem-blog.md
layout: ../../layouts/LayoutBase.astro
title: Minha Postagem do Blog
draft: true
---

Esta é a postagem que eu estou fazendo no meu blog.

Nenhuma página terá build feito para esta postagem.

Para fazer a build e publicar esta postagem:

- atualize o frontmatter para `draft: false` ou
- remova a propriedade `draft` completamente.
```

:::caution[Rascunhos e Astro.glob()]
Apesar de `draft: true` impedir que uma página seja construída no site naquela rota de página, [`Astro.glob()`](/pt-br/reference/api-reference/#astroglob) atualmente retorna **todos os seus arquivos Markdown**.
:::

Para excluir postagens de rascunho de serem inclusas no arquivo de postagens, ou listar as postagens mais recentes, você pode filtrar os resultados retornados pelo seu `Astro.glob()`.

```js
const postagens = await Astro.glob('../pages/postagens/*.md');
const postagensSemRascunhos = postagens.filter((postagem) => !postagem.frontmatter.draft); 
```

⚙️ Para habilitar a build de páginas de rascunho:

Adicione `drafts: true` no `markdown` em `astro.config.mjs`

```js ins={4}
// astro.config.mjs
export default defineConfig({
  markdown: {
    drafts: true,
  },
});
```

:::tip
Você também pode passar a flag `--drafts` ao executar `astro build` para fazer a build de páginas de rascunho!
:::

### Variáveis e Componentes

:::caution[Descontinuado]
Astro v1.0 **apenas suporta Markdown padrão em arquivos `.md`**. A habilidade de usar [componentes ou JSX em páginas Markdown não é mais habilitada por padrão](/pt-br/migrate/#descontinuado-componentes-e-jsx-no-markdown) e o suporte será eventualmente removido completamente.

A configuração do Astro suporta uma [flag legado](/pt-br/reference/configuration-reference/#legacyastroflavoredmarkdown) que irá habilitar novamente essas funcionalidades em páginas Markdown até que você possa migrar para MDX no Astro. A integração MDX do Astro é o caminho recomendado daqui para frente se você precisa de mais funcionalidades do que o Markdown padrão fornece.
:::

Por favor instale a integração oficial [`@astrojs/mdx`](/pt-br/guides/integrations-guide/mdx/) para usar:

- [variáveis e expressões JSX em arquivos MDX (`.mdx`)](/pt-br/guides/integrations-guide/mdx/#variables).

- [componentes Astro](/pt-br/core-concepts/astro-components/) ou [componentes de frameworks de UI](/pt-br/core-concepts/framework-components/) em arquivos MDX (`.mdx`).

Veja o guia de migração para ajuda em como [converter seus arquivos `.md` do Astro para `.mdx`](/pt-br/migrate/#convertendo-arquivos-md-existentes-para-mdx).

## Funcionalidades do MDX

Astro inclui suporte completo para MDX com a integração oficial `@astrojs/mdx`. Veja o [guia da integração MDX](/pt-br/guides/integrations-guide/mdx/) para mais informações sobre esta integração, que suporta as funcionalidades descontinuadas da seção anterior e aprimora sua experiência de escrita de Markdown.

### Usando Variáveis no MDX

Com a integração `@astrojs/mdx`, você pode usar [variáveis e expressões JSX em arquivos MDX (`.mdx`)](/pt-br/guides/integrations-guide/mdx/#variables).

### Usando Componentes no MDX

Com a integração `@astrojs/mdx`, você pode usar componentes Astro ou de frameworks de UI em arquivos MDX (`.mdx`) assim como você os [utilizaria em qualquer outro componente Astro](/pt-br/core-concepts/framework-components/#usando-componentes-de-frameworks).

Não se esqueça de uma incluir uma diretiva de `client:*` se necessário!

## Importando Markdown

Você pode importar arquivos Markdown e MDX diretamente em seus arquivos Astro! Você pode importar uma página específica com `import` ou múltiplas páginas com `Astro.glob()`.

```astro title="src/pages/index.astro" {3,6}
---
// Importe Markdown. import() dinâmico também é suportado!
import * as otimaPostagem from '../pages/postagens/otima-postagem.md';

// Você também pode importar múltiplos arquivos com Astro.glob
const postagens = await Astro.glob('../pages/postagens/*.md');
---

Uma Ótima Postagem: <a href={otimaPostagem.url}>{otimaPostagem.frontmatter.titulo}</a>

<ul>
  {postagens.map(postagem => <li>{postagem.frontmatter.titulo}</li>)}
</ul>
```

Opcionalmente, você pode fornecer um tipo para a variável `frontmatter` usando um genérico TypeScript:

```astro title="src/pages/index.astro" ins={2-5} ins="<Frontmatter>"
---
interface Frontmatter {
  titulo: string;
  descricao?: string;
}
const postagens = await Astro.glob<Frontmatter>('../pages/postagens/*.md');
---

<ul>
  {postagens.map(postagem => <li>{postagem.frontmatter.titulo}</li>)}
  <!-- postagem.frontmatter.titulo vai ser uma `string`! -->
</ul>
```

### Propriedades Exportadas

Cada arquivo Markdown exporta as seguintes propriedades.

:::note[mdx]
Veja as [propriedades exportadas para arquivos MDX](/pt-br/guides/integrations-guide/mdx/#exported-properties) quando estiver utilizando a integração MDX.
:::

#### `frontmatter`

Quaisquer dados especificados no frontmatter YAML deste arquivo.

#### `file`

O caminho absoluto deste arquivo (e.g. `/home/user/projects/.../arquivo.md`).

#### `url`

Se é uma página, a URL da página (e.g. `/pt-br/guides/markdown-content`).

#### `getHeadings()`

Uma função assíncrona que retorna os títulos do arquivo Markdown. A resposta é desse tipo:

```ts
{ depth: number; slug: string; text: string }[]
```

#### `rawContent()`

Uma função que retorna o conteúdo bruto do arquivo Markdown (excluindo o bloco de frontmatter) como uma string.

:::tip
Se você planeja utilizar `rawContent` para calcular valores como "tempo de leitura", nós sugerimos usar um plugin remark ou rehype no para injetar frontmatter no lugar! Veja [nosso exemplo de tempo de leitura](#exemplo-calculando-tempo-de-leitura) para mais.
:::

#### `compiledContent()`

Uma função que retorna o documento HTML após parse como uma string. Note que **isso não inclui layouts configurados no seu frontmatter**! Apenas o documento Markdown em si será retornado como HTML.

:::caution
**[Para usuários de `legacy.astroFlavoredMarkdown`](/pt-br/reference/configuration-reference/#legacyastroflavoredmarkdown):** Isto não faz parse de `{expressões jsx}` ou `<Componentes />`. Apenas blocos de Markdown padrão como `## cabeçalhos` e `- listas` passarão por parse para HTML.
:::

#### `Content`

Um componente que retorna todo o conteúdo renderizado do arquivo Markdown. Eis um exemplo:

```astro title="src/pages/conteudo.astro" "Content"
---
import {Content as BannerPromocional} from '../components/bannerPromocional.md';
---

<h2>Promoção de hoje</h2>
<BannerPromocional />
```

Quando estiver utilizando `getStaticPaths` e `Astro.glob()` para gerar páginas a partir de arquivos Markdown, você pode passar o componente `<Content/>` através das `props` da página. Você pode então pegar o componente de `Astro.props` e renderizá-lo no seu template.

```astro title="src/pages/[slug].astro" {9-11} "Content" "Astro.props.postagem"
---
export async function getStaticPaths() {
  const postagens = await Astro.glob('../postagens/**/*.md')
  return postagens.map(postagem => ({
    params: { 
      slug: postagem.frontmatter.slug 
    },
    props: {
      postagem
    },
  }))
}
const { Content } = Astro.props.postagem
---
<article>
  <Content/>
</article>
```

## Configurando Markdown

O suporte para Markdown no Astro é fornecido pelo [remark](https://remark.js.org/), uma poderosa ferramenta de processamento e parsing com um ecossistema ativo. Outros parsers de Markdown como Pandoc e markdown-it não são suportados atualmente.

Você pode personalizar como o remark faz parse do seu Markdown em `astro.config.mjs`. Veja [a documentação de referência](/pt-br/reference/configuration-reference/#opções-de-markdown) para detalhes completos da configuração ou siga nossos guias abaixo em como adicionar plugins do remark e em como customizar o syntax highlighting.

:::note[mdx]
As instruções abaixo são para Markdown padrão. Para configurar plugins MDX e opções de frontmatter, por favor veja a seção relevante no [guia da integração MDX](/pt-br/guides/integrations-guide/mdx/#configuration).
:::

### Plugins Markdown

Astro dá suporte a plugins [remark](https://github.com/remarkjs/remark) e [rehype](https://github.com/rehypejs/rehype) de terceiros para Markdown. Esses plugins te permitem estender seu Markdown com novas capacidades, como [gerar um índice automaticamente](https://github.com/remarkjs/remark-toc), [aplicar rótulos acessíveis à emojis](https://github.com/florianeckerstorfer/remark-a11y-emoji) e mais. Nós encorajamos você explorar o [awesome-remark](https://github.com/remarkjs/awesome-remark) e o [awesome-rehype](https://github.com/rehypejs/awesome-rehype) para achar mais plugins populares!

Este exemplo aplica os plugins [remark-toc](https://github.com/remarkjs/remark-toc) e [rehype-minify](https://github.com/rehypejs/rehype-minify). Veja o README de cada projeto para instruções de instalação.

:::tip
Astro aplica os plugins [GitHub-flavored Markdown](https://github.com/remarkjs/remark-gfm) e [Smartypants](https://github.com/silvenon/remark-smartypants) por padrão. Isso traz alguns extras como gerar links clickáveis de texto e formatar citações para melhor legibilidade. Ao adicionar seus próprios plugins, você pode preservar esses padrões com a flag `extendDefaultPlugins`.
:::

```js title="astro.config.mjs" ins={2,3,7,8,11}
import { defineConfig } from 'astro/config';
import remarkToc from 'remark-toc';
import rehypeMinifyHtml from 'rehype-minify';
export default defineConfig({
  markdown: {
    remarkPlugins: [remarkToc],
    rehypePlugins: [rehypeMinifyHtml],
    // Preserva os plugins padrões do Astro: GitHub-flavored Markdown e Smartypants
    // padrão: false
    extendDefaultPlugins: true,
  },
}
```
    
#### Opções do Remark-rehype

Conteúdo Markdown é transformado em HTML através do remark-rehype que tem [várias opções](https://github.com/remarkjs/remark-rehype#options).

Você pode utilizar opções do remark-rehype em seu arquivo de configuração assim:

```js
// astro.config.mjs
export default {
  markdown: {
    remarkRehype: {
		  footnoteLabel: 'Catatan kaki',
		  footnoteBackLabel: 'Kembali ke konten',
		},
  },
};
```

### Injetando frontmatter

Você pode querer adicionar propriedades frontmatter para seu arquivos Markdown programaticamente. Ao utilizar um [plugin remark ou rehype](#plugins-markdown), você pode gerar essas propriedades com base nos conteúdos do arquivo.

Você pode adicionar a propriedade `data.astro.frontmatter` a partir do argumento `file` do seu plugin assim:

```js title="exemplo-plugin-remark.mjs"
export function exemploPluginRemark() {
  // Todos os plugins remark e rehype retornam uma função separada
  return function (tree, file) {
    file.data.astro.frontmatter.propriedadeCustomizada = 'Propriedade gerada';
  }
}
```

Após aplicar esse plugin a sua configuração `markdown`:

```js title="astro.config.mjs" "import { exemploPluginRemark } from './exemplo-plugin-remark.mjs';" "remarkPlugins: [exemploPluginRemark],"
import { exemploPluginRemark } from './exemplo-plugin-remark.mjs';
export default {
  markdown: {
    remarkPlugins: [exemploPluginRemark],
  },
};
```

...todo arquivo Markdown terá a `propriedadeCustomizada` em seu frontmatter! Isso é disponível ao [importar seu Markdown](#importando-markdown) e da [propriedade `Astro.props.frontmatter` em seus layouts](#páginas-markdown-e-mdx).

#### Exemplo: calculando tempo de leitura

Você pode usar um [plugin remark](https://github.com/remarkjs/remark) para adicionar o tempo de leitura ao seu frontmatter. Nós recomendados dois pacotes utilitários:
- [`reading-time`](https://www.npmjs.com/package/reading-time) para calcular minutos lidos
- [`mdast-util-to-string`](https://www.npmjs.com/package/mdast-util-to-string) para extrair todo o texto do seu Markdown

```shell
npm i reading-time mdast-util-to-string
```

Podemos aplicar esses pacotes a um plugin remark assim:

```js title="remark-tempo-leitura.mjs"
import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';
export function remarkTempoLeitura() {
	return function (tree, { data }) {
    const textoNaPagina = toString(tree);
		const tempoLeitura = getReadingTime(textoNaPagina);
    // tempoLeitura.text irá nos dar os minutos de leitura em uma string amigável,
    // como "3 min read"
		data.astro.frontmatter.minutosLeitura = tempoLeitura.text;
	};
}
```

Assim que você aplicar esse plugin na sua configuração:

```js title="astro.config.mjs" "import { remarkTempoLeitura } from './remark-tempo-leitura.mjs';" "remarkPlugins: [remarkTempoLeitura],"
import { remarkTempoLeitura } from './remark-tempo-leitura.mjs';
export default {
  markdown: {
    remarkPlugins: [remarkTempoLeitura],
  },
};
```

...todos os documentos Markdown vão ter `minutosLeitura` calculados. Você pode usar isso para incluir um banner de "x minutos lidos" em um [layout Markdown](#páginas-markdown-e-mdx), por exemplo:

```astro title="src/layouts/LayoutBlog.astro" "const { minutosLeitura } = Astro.props.frontmatter;" "<p>{minutosLeitura}</p>"
---
const { minutosLeitura } = Astro.props.frontmatter;
---
<html>
  <head>...</head>
  <body>
    <p>{minutosLeitura}</p>
    <slot />
  </body>
</html>
```

### Syntax Highlighting

Astro vem com suporte nativo para [Shiki](https://shiki.matsu.io/) e [Prism](https://prismjs.com/). Isso fornece syntax highlighting imediato para:

- todas as code fences (\`\`\`) usadas em um arquivo Markdown (`.md`) ou MDX (`.mdx`).
- conteúdo dentro do [componente `<Code />` nativo](/pt-br/reference/api-reference/#code-) (oferecido por Shiki) ou o [componente `<Prism />`](/pt-br/reference/api-reference/#prism-) (oferecido por Prism).

Shiki é ativado por padrão, pré-configurado com o tema `github-Dark`. A saída compilada será limitada a `style`s inline sem classes CSS de fora, folhas de estilo ou JS no lado do cliente.

Se você optar por usar Prism, aplicaremos as classes CSS do Prism. Observe que **você precisa colocar sua própria folha de estilo CSS** para o syntax highlighting funcionar! Veja a [seção de configuração do Prism](#configuração-do-prism) para mais detalhes.

#### Escolha um syntax highlighter

Shiki é o nosso syntax highlighter padrão. Se você quiser mudar para `'prism'` ou desativar completamente syntax highlighting, você pode usar o objeto de configuração `markdown`:

```js ins={5}
// astro.config.mjs
export default {
  markdown: {
    // Pode ser 'shiki' (padrão), 'prism' ou false para desabilitar o highlighting
    syntaxHighlight: 'prism',
  },
};
```

#### Configuração do Shiki

Ao usar o Shiki, você pode configurar todas as opções por meio do objeto `shikiConfig`, tal como:

```js
// astro.config.mjs
export default {
  markdown: {
    shikiConfig: {
      // Escolha os temas internos do Shiki (ou adicione o seu)
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: 'dracula',
      // Adicione idiomas personalizados
      // Nota: Shiki tem inúmeras linguagens nativas, incluindo .astro!
      // https://github.com/shikijs/shiki/blob/main/docs/languages.md
      langs: [],
      // Habilite quebra de linha para evitar rolagem horizontal
      wrap: true,
    },
  },
};
```

Também sugerimos [inspecionar a documentação de tema deles](https://github.com/shikijs/shiki/blob/main/docs/themes.md#loading-theme) para explorar o carregamento de tema personalizado, modo claro vs modo escuro ou estilizar via variáveis CSS.

#### Configuração do Prism

Ao usar o Prism, você precisará adicionar uma folha de estilo ao seu projeto para syntax highlighting. Se você acabou de começar e prefere usar Prism em vez de Shiki, sugerimos:

1. [Colocar `syntaxHighlight: 'prism'`](#escolha-um-syntax-highlighter) na sua configuração `@astrojs/markdown-remark`.
2. Escolher uma folha de estilo predefinida entre os [Temas Prism](https://github.com/PrismJS/prism-themes) disponíveis.
3. Adicionar essa folha de estilo no [diretório `public/` do seu projeto](/pt-br/core-concepts/project-structure/#public).
4. Carregá-la [no `<head>` de sua página](/pt-br/core-concepts/astro-pages/#html-da-página) através de uma tag `<link>`.

Você também pode visitar a [lista de idiomas suportados pelo Prism](https://prismjs.com/#supported-languages) para ver opções e uso.
