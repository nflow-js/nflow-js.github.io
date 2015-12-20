---
layout: page
title: Getting Started
permalink: /getting-started/
---

# Getting Started

## Installation
The easiest way to download nFlow is through npm:

```js
npm install --save nflow
```
Alternatively, you can download the library as a zip file from the [nFlow GitHub page](https://github.com/mere/nflow).


## Instantiation
First, you need to grab an istance of nFlow.

> To avoid ambiguity, in this documentation:<br />
> - `nFlow` refers to the name of the library, whereas <br />
> - `flow` or `flow object` will refer to an imported or created instance


#### - CommonJS (recommended)
If you use nFlow in NodeJS, browserify or Webpack, you can simply import a flow instance:

```js
import flow from 'nflow';

flow.create('hello')
```
If you use ES5, you can use the `var flow = require('@nFlow/nFlow')` syntax.

#### - RequireJS
You can load nFlow as a RequireJS dependency:

```js
define(['nFlow'], (flow)=>{
  flow.create('hello')
})
```

#### - Browser global
If you don't use a bundling tool, you can simply load nFlow in a `<script>` tag:

```js
<script src="/path-to-nflow/nFlow.js"></script>
```
This will expose the main flow instance as `window.flow`





