# Webgl Template

Please note the current configuration is for a development environment, vastly different configs
should be used for production.

This repository provides a few features to increase productivity when working with webgl.
It contains the following:

- Hot Reload
- Intellisense (Autocomplete tested with vscode)

## Getting Started

### Requirements

- node
- npm

### Setup

To clone and setup dependancies.

````bash
git clone https://github.com/CDuPlooy/typescript-webgl-template
npm install
````

You can run the development server by running

````bash
npm start
````

### Making Changes

You can edit the following files (hot reload supported):

- ./src/**/*.ts
- ./src/**/*.js
- ./src/index.html

Shader sources are added to the project at compile time, they should be placed inside ./shaders.

Please note - If a new shader is created webpack will not refresh the page. A work around is to create all shader files in advance
and then run ``npm start`` at which point hot reload will work properly.