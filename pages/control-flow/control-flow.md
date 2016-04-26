---
layout: page
title: Control Flow
permalink: /control-flow/
---

# Control Flow

`nFlow` allows you to create asynchronous event trees that represent complex multi-step actions.

<figure class='is-full home1' style='min-width:500px;'></figure>
<script type="text/javascript">(function(){
  var f = initTree('.home1')
  var a,b,c,d,e,f
  a = f.emit('actionA')
  
  setTimeout(function(){ b = a.emit('actionB') }, 1000)
  setTimeout(function(){ c = a.emit('actionC') }, 1000)
  setTimeout(function(){ d = b.emit('actionD') }, 3000)
  setTimeout(function(){ e = c.emit('actionE') }, 2000)
  setTimeout(function(){ f = c.emit('actionF') }, 4000)
  
}())</script>


## Model == Dispatcher == Event
The main feature of the `nFlow` architecture is that __everything shares the same object type__. Whether it's an event, store, model or controller - it's just a `flow` object, so the API is the same and the behaviour is the same.

This gives you great flexibility - you decide where and how you use nFlow. It's ok if your app already uses a Store/Model or an MVC framework - `nFlow` will only fill in the gaps, you will not need to change your code.

__Dispatching events on events__

Since in `nFlow` events are also `flow` objects, this allows you to "respond" to events by dispatching further events on them:

<figure class='emit2' style='height:300px;min-width:300px;' ></figure>
<script type="text/javascript">(function(){
  var f = initTree('.emit2')
  var a = f.create('me')

  f.create('mum')
    .on('i-am-hungry', function(){
      var event = this
      setTimeout(function(){
        event.emit('order-pizza')
      },1500)
      })
  f.create('shop')
    .on('order-pizza', function(){
      var event = this
      setTimeout(function(){
        event.emit('pizza-ready', {})
      },1500)
      })
      
  f.create('dad')    
    .on('order-pizza', function(){
      this.emit('order-coke')
    })
    
  var event = a
  .on('pizza-ready', function(){})
  .emit('i-am-hungry')

setTimeout(function(){event.cancel() }, 1200)
}())</script>

```js
// mum.js
f.create('mum')
  .on('i-am-hungry', function(){
    this.emit('order-pizza', money)
  })

// pizza-shop.js  
f.create('shop')
  .on('order-pizza', function(money){
    //...bake pizza
    this.emit('pizza-ready', {pizza})
  })

// me.js
f.create('me')
  .on('pizza-ready', eat)
  .emit('i-am-hungry')
```

Since the event tree is just the same as the flow tree, you can traverse it in the listener. This allows you to __"go back in time"__ and find out what triggered the event. 

The `.parent()` API steps up in the event tree an returns the upstream event that triggered the current one. You can event access the payload of upstream events using the `.data()` API.

To extend the previous example:

```js
function eat(pizza){
  this // this is the 'pizza-ready' event
  this.data() // returns the pizza
  
  // why is this pizza here? - because it was ordered:
  this.parent() // returns the 'order-pizza' event
  this.parent().data() // returns {money}

  // why was the pizza ordered? - because I was hungry:
  this.parent().parent() // returns the 'i-am-hungry' event
}
```


