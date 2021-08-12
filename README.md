# Kevstarter WordPress

## Sumário

- [Instalação](#Instalação)
- [Hierarquia de pastas](#Hierarquia-de-pastas)
- [Estrutura de pastas](#Estrutura-de-pastas)

### Instalação

Antes de instalar as dependências, verifique e instale a versão do node descrita no arquivo [package.json](/package.json#L10) (recomendado usar NVM) e após isso rodar `npm install` na raíz do tema.

### Hierarquia de pastas

- /assets
  - /css
  - /fonts
  - /img
  - /js
- /inc
  - /api
  - /functions
  - /template-parts
    - /components
    - /partials
    - /sections
- /src
  - /js
    - /components
    - /services
    - /utils
  - /scss
    - /base
      - /_animations
      - /_fonts
      - /_helpers
      - /_variables
      - /_vendor
    - /components
    - /partials
    - /vendor
- .gitignore
- 404.php
- footer.php
- functions.php
- gulpfile.php
- header.php
- index.php
- package.json
- README.md
- style.css

### Estrutura de pastas

#### /assets

Arquivos finais e compilados.

#### /inc

Includes

##### /inc/api

Endpoints customizados

##### /inc/functions

Funções do site

##### /inc/template-parts

Partes reutilizáveis do site

###### /inc/template-parts/components

Componentes que são usados em diferentes partes do site.

###### /inc/template-parts/partials

Partes do site

###### /inc/template-parts/sections

Seções do site

#### /src

Arquivos fontes

##### /src/js

Scripts

##### /src/scss

Arquivos Sass