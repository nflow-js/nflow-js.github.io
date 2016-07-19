---
layout: page
title: Getting Started
permalink: /getting-started/
---

# Getting Started

## Installation
The easiest way to download nflow is through npm:

```js
npm install --save nflow
```
Alternatively, you can download the library as a zip file from the [nflow GitHub page](https://github.com/nflow-js/nflow).


## Instantiation
First, you need to grab an istance of nFlow.

> To avoid ambiguity, in this documentation:<br />
> - `nflow` refers to the name of the library, whereas <br />
> - `flow` or `flow object` will refer to an imported or created instance


#### - CommonJS (recommended)
If you use nflow in `NodeJS`, `browserify` or `Webpack`, you can simply import a flow instance:

```js
import nflow from 'nflow';

nflow.create('hello')
```
If you use ES5, you can use the `var flow = require('nflow')` syntax.

#### - RequireJS
You can load nflow as a RequireJS dependency:

```js
define(['nflow'], (flow)=>{
  flow.create('hello')
})
```

#### - Browser global
If you don't use a bundling tool, you can simply load nFlow in a `<script>` tag:

```js
<script src="/path-to-nflow/nflow.js"></script>
```
This will expose the nflow instance as `window.nflow`





