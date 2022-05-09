---
title: 通过自动命令行来安装Astro
description: 如何通过 create-astro CLI 工具使用 NPM、PNPM 或 Yarn 安装 Astro。
layout: ~/layouts/MainLayout.astro
setup: import InstallGuideTabGroup from '~/components/TabGroup/InstallGuideTabGroup.astro';
---
准备好安装Astro了吗？跟着我们的自动或手动设置教程来开始吧。

#### 前提准备

- **Node.js** - `14.15.0`, `v16.0.0`,或更高版本.
- **Text editor** - 我们建议使用带[Astro官方插件](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode)的 [VS Code](https://code.visualstudio.com/)来作为编辑器。
- **Terminal** - Astro 可以通过其命令行界面 (CLI) 访问。

<InstallGuideTabGroup />

#### 安装

`create-astro` 命令是从头开始一个新的 Astro 项目最快、最简单的方法。

## 1. 通过命令行（CLI）运行

在终端内使用 `create-astro`可以快速的启动安装向导。这将会在你运行该命令的目录下指引你一步步去创建第一个Astro项目。

```shell
# npm
npm create astro@latest

# yarn
yarn create astro

# pnpm
pnpm create astro@latest
```

如果 `create-astro`命令成功启动, 你将会看到几个选项来作为项目起始模板：
- `starter`: 每一个想去尝试Astro的最佳模板；
- `minimal`: 一个包含基本功能的模板；
- `blog, portfolio, docs, etc`: 针对特定用例而使用的主题模板。

如果你选择 `starter` 参数, 你将会被要求去选择一些其他参数： [框架选择](/en/core-concepts/framework-components) (React, Svelte, Vue, Solid, Preact),如果你需要，你可以将他们添加到你的项目内。之后将会适配更多的框架。

## 2. 安装依赖

当 `create-astro`命令安装初始化完成, 你将会在屏幕上看到许多推荐的说明来协助你完成设置和开始你的新项目。

剩下来唯一要求做的是使用一个如npm的包管理器来安装你的项目依赖。

```bash
# npm
npm install

# yarn
yarn

# pnpm
pnpm install

```

如果你打算在项目内使用[Git](https://git-scm.com/)，直接在项目根目录运行`git init`即可。


## 3. 开始使用 Astro ✨

在大部分项目开发中使用 Astro 的内置开发服务器都可以来完成开发。 这将演示怎样在本地开发环境中运行你的项目。

首先，使用包管理器去运行预配置起始脚本：

```bash
# npm
npm start

# yarn
yarn start

# pnpm
pnpm run start
```

如果一切都正常，Astro将会在[http://localhost:3000](http://localhost:3000)运行你的项目!


Astro将会实时的监听`src/`目录下的文件更改，所以在开发过程中，如果你做了更改，你不需去重启这个服务。


如果你不能在浏览器中打开你的项目，请在运行`start`命令的终端内看看有什么错误提示。


## 4. 部署到web

是时候去部署你的项目到互联网了！在你的项目内运行`build`命令可以在项目的`dist/`目录内生成需要部署的所有静态文件。


```bash
# npm
npm run build

# yarn
yarn build

# pnpm
pnpm run build
```

当命令运行结束，在项目目录内你可以看到一个`dist/`的新目录，你可以将这个目录内的内容部署到你的主机上。

想开始免费部署你的网页内容，可以查看我们的主机合作伙伴,比如说[Netlify](https://www.netlify.com/)。获取更多的部署说明，请查阅我们的[部署文档](/zh-CN/guides/deploy)。


## 接下来...

好了！你现在已经准备好开始进行开发了！

📚到[项目结构](/zh-CN/core-concepts/project-structure)小节内学习更多关于Astro的项目结构的内容。

📚到[组件](/zh-CN/core-concepts/astro-components)小节内学习关于Astro组件语法的内容。

📚 到[页面](/zh-CN/core-concepts/astro-pages)小节内学习关于Astro基于文件的路由知识内容。

