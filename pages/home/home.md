---
layout: page
title: Home
permalink: /
class: is-home
---

## Overview

`nflow` is hierarchical event dispatcher for managing your application's event, control and data flow.

<ul class='features'>
<li>  
  <h3><i class="fa fa-support"></i>Browser and Platform friendly</h2>
  `nflow` is fully supported on <b>IE9+</b>, <b>FF</b>, <b>Chrome</b> and <b>NodeJS</b>
</li>
<li>  
  <h3><i class="fa fa-check"></i>Framework friendly</h2>
  nFlow plays well with React, Angular, or vanilla javascript applications.
</li>
<li>  
  <h3><i class="fa fa-random"></i>Synthetic Events</h2>
  The `nFlow`'s event system gives you full control over how events travel through your application.
</li>
<li>  
  <h3><i class="fa fa-undo"></i>Time Travel and immutability</h2>
  nFlow allows you to re-play and debug complex asynchronous event chains.
</li>
<li>  
  <h3><i class="fa fa-th"></i>Microservice Architecture</h2>
  In nFlow there is no distinction between Events, Dispatchers or Models/Stores.
</li>
<li>
  <h3><i class="fa fa-html5"></i>Modern Javascript</h2>
  Modern Javascript library without the use of <code>this</code>, <code>new</code> or <code>prototype inheritance</code>
</li>
</ul>


## A Simple Example

<figure class='example' ></figure>
<script type="text/javascript">(function(){
  var f = initTree('.example')
  
  var a = f.create('a')
  var b = f.create('b')
  
  a.create('x').on('hello', function(){})
  b.create('y').on('hello', function(){})
  
  b.emit('hello')
}())</script>
```js
  var a = f.create('a')
  var b = f.create('b')
  
  a.create('x')
    .on('hello', handler1)
    
  a.create('y')
    .on('hello', handler2)
  
  b.emit('hello')

```










