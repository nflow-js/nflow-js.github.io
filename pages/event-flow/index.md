---
layout: page
title: Event Flow
permalink: /event-flow/
---

# Event Flow

## Simple event dispatcher example
Flow.js can be used as a simple event bus for establishing comunication between different areas of your application.

<figure class='example1' ></figure>
<script type="text/javascript">(function(){
  
  var dom = d3.select('.example1')
  var f = nflow.create('flow.js').parent(null)
  tree()
    .dom(dom.node())
    .flow(f)

  var a = f.create('a').on('hello', function(){
    
    a.emit('hi')
    
  })
  f.create('b').on('hello', function(){})
  f.create('c')
    .emit('hello')
    

}())</script>
```js
// a.js
flow.create('a')
  .on('hello', handler)

// b.js
flow.create('b')
  .on('hello', handler)

// c.js
flow.create('c')
  .emit('hello')
}
```
In the example above, when `'hello'` is dispatched, the event flows upstream to the root, then flows downstream to reach all listeners. You can learn more about the flow direction [here](/flow-direction).


## Event Tree Example
<figure class='example2' ></figure>
<script type="text/javascript">(function(){

  var dom = d3.select('.example2')
  var f = nflow.create('flow.js').parent(null)
  tree()
    .dom(dom.node())
    .flow(f)

  var a = f.create('a')
  var b = f.create('b')
  var c = f.create('c')
  var d = b.create('b1').on('hello', function(){})
  var e = b.create('b2').on('hello', function(){})
  var d = f.create('d')

  d.emit('hello')

}())</script>
```js
import f from 'flow';

var a = flow.create('a')
var b = flow.create('b')
var b1 = b.create('b1').on('hello', function(){})
var b2 = b.create('b2').on('hello', function(){})
var c = flow.create('c')
var d = f.create('d')

d.emit('hello')
```


### Multiple Event Trees
<figure class='example3' ></figure>
<script type="text/javascript">(function(){

  var dom = d3.select('.example3')
  var f = nflow.create('flow.js').parent(null)
  tree()
    .dom(dom.node())
    .flow(f)

  var a = f.create('a')
  setTimeout(function(){ a.parent(null) }, 2000)
  a.create('a1')
  a.create('a2')

  var b = f.create('c')
  b.create('c1')
  b.create('c2')

}())</script>
```js
var a = flow.create('a')
a.parent(null)
a.create('a1')
a.create('a2')

var b = flow.create('c')
b.create('c1')
b.create('c2')
```
You can isolate part of a tree by setting a flow object's parent to null.

When a branch is separated from its parent tree, no events will flow in or out between them. 

**Note:** You can re-parent flow objects, too - see the full docs [here]())



### Re-parenting
<figure class='example4' ></figure>
<script type="text/javascript">(function(){

  var dom = d3.select('.example4')
  var f = nflow.create('flow.js').parent(null)
  tree()
    .dom(dom.node())
    .flow(f)

  var a = f.create('a')
  a.create('a1')
  a.create('a2')
  a.create('a3')

  var b = f.create('b')
  setTimeout(function(){ a.parent(b) }, 2000)
  

}())</script>
```js
var a = flow.create('a')
a.create('a1')
a.create('a2')

var b = flow.create('c')
a.parent(b)
```
You can isolate part of a tree by setting a flow object's parent to null.

When a branch is separated from its parent tree, 

**Note:** You can re-parent flow objects, too - see the full docs [here]())


### nFlow in your existing application
nFlow's drop-in design allows you to use nFlow in your existing application without having to refactor any of code.

nFlow makes no assumptions about the structure of your app.
<br />You can use it:

 - as an event-bus between the M-V-C parts of your app
 - to synchronise view components
 - to communicate between large modules in an app

You can think of flow as the **"glue"** between your application parts. 

You can create flow objects in your existing application without having to re-structure your code. You can even use it to communicate between different frameworks, eg. wire up a React View with an Angular Service!
