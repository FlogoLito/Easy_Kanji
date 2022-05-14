# Easy Kanji 

Welcome to Easy Kanji, the most easy way to learn kanji ! 

Using flashcard methodology, you will be able to learn all kanji for jlpt, from n5 to n1 


## Getting started 

This project is built with vuejs Vite and Typescript. To build it, simply run : 
`npm install`
`npm run build`

To start the development environment and hot refresh: `npm run dev`

## Dependencies 

For the recognition of kanji, we need  [*kanjicanvas*](https://github.com/asdfjkl/kanjicanvas)

It's part of this project as a submodule 

I also used the [*kanji-data*](https://github.com/davidluzgouveia/kanji-data) in order to generate the json used as a database 


--------------------






## Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

### Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).
