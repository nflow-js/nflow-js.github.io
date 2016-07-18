---
layout: page
title: Documentation
permalink: /docs/
class: is-docs
---

# Documentation

The `nFlow` API is designed to be simple and easy to use.
<br />Essentially, the heart of `nFlow` is only 3 methods : [`create`](#create), [`on`](#on) and [`emit`](#emit). 

Since in `nFlow` there is only one type of object, __the same API applies to every object created or emitted__.

Whether they are used as dispatchers, events, stores or controllers - they are the same type of objects and share the same API.


# API Reference

<nav class='anchors'></nav>

## create
<figure class='create1' ></figure>
<script type="text/javascript">(function(){
  var f = initTree('.create1')
  f.create('a')
}())</script>
```js
flow.create([name], [...data])
```
Creates a new `flow` object.

__Arguments__

 - `[name]` (String): the name of the new flow object.
 - `[...data]` (*): the data to be stored in the flow object. Can be of any type.

__Returns__

 - the new `flow` instance

 > __Note__: The parent of the new object is automatically set to the flow object it was created from.

__Example__

<figure class='create2' ></figure>
<script type="text/javascript">(function(){
  var f = initTree('.create2')
  
  let a = f.create('a')
  let b = f.create('b')
  
  let c = a.create('c')
  let d = a.create('d')
  
  
}())</script>
```js
  let a = f.create('a')
  let b = f.create('b')
  
  let c = a.create('c')
  let d = a.create('d')
```

__Aliases__

The following command chains are identical:

  - `.create('a', someData)`
  - `.create('a').data(someData)`
  - `.create().name('a').data(someData)`

## on
<figure class='on1' ></figure>
<script type="text/javascript">(function(){
  var f = initTree('.on1')
  f.create('a')
    .on('a', function(){})
    .on('b', function(){})
    .on('c', function(){})
    .on('d', function(){})
}())</script>
```js
flow.on(name, ...listeners)
```
Adds a listener to the flow object

__Arguments__

 - `name` (String): the name of the listener. The listener will be invoked if a flow object travelling through the current node has __exactly the same name__
 - `...listener` (Function): The callback function to be invoked. If you specify multiple listeners, they will called in sequential order:
 
 ```js
 flow.on('registerUser', validateName
                       , validateEmail
                       , validatePassword
                       , register)
 ```

__Returns__

 - setter: the new `flow` instance
 - getter: the currently registered listeners:
 <br /> `.on('foo') // returns [listener1, listener2]`
 <br /> `.on()` // returns { foo: [listener1, listener2], bar:[listener3] }`
 
 __Deleting and Augmenting Listeners__:

```js
flow.on('foo', a,b,c)

// subsequent calls on the same listener will OVERWRITE the previous listeners:
flow.on('foo', d,e) // a,b or c WILL NOT be triggered

// setting a listener to null DELETES ALL listeners:
flow.on('foo', null) // no listeres will be triggered
```

__Example__

<figure class='on2' ></figure>
<script type="text/javascript">(function(){
  var f = initTree('.on2')
  var service = f.create('services')
  
  var register = service.create('user')
    .on('register', function(){})
  var ui = f.create('ui')
  var form = ui.create('form')
  
  form.emit('register', 'email', 'name', 'password')
}())</script>
```js
  // in services.js:
  ...
  var services = f.create('service')

  // in user-service.js:
  ...
  services
    .create('user')
    .on('login'   , login)
    .on('logout'  , logout)
    .on('register', validateName
                  , validateEmail
                  , validatePassword
                  , register)

  // in ui.js:
  ...
  var ui = f.create('ui')
  var form = ui.create('form')
  ...
  // when the user click on the submit button:
  form.emit('register', email, name, password)
```

## emit
<figure class='emit1' ></figure>
<script type="text/javascript">(function(){
  var f = initTree('.emit1', 'hello')
  f.create('a').on('hello', function(){})
  
  var b = f.create('b').on('hello', function(){})
  f.create('c')
  b.emit('hello')
}())</script>
```js
foo.emit([name], [...payload])
```
Emits an event.

> The `.emit` API has __two distinct behaviours__:
> 
> ```js
foo.emit() // turns foo into an event and emits it
foo.emit('bar') // creates bar and emits it on foo
```
>
> The following 2 operations are essentially the same:
> 
>  - `foo.emit('bar')`
>  - `foo.create('bar').emit()`

__Arguments__

 - `[name]` (String): the name of the new flow object to be created and emitted. If no name is given, the current flow object will be emitted.
 - `...payload` (*): the data to be carried in the event. Multiple parameters are accepted:
 
 ```js
a.on('registerUser', function(name, email, password){  ... })
...
b.emit('registerUser', name, email, password)

 ```

__Returns__

 - the emitted `flow` instance


> ### Listener Context
> 
> Listeners are invoked in the context of the emitted event. 
> <br /> In the listeners the __this__ keyword always refers to the invoking event.
> 
> Since __events are also flow objects__, you can dispatch further events on them!

## name
```js
flow.name() // returns the name of the flow object
flow.name('foo') // sets the name of the flow object
```
`Getter/Setter`

__Arguments__

 - `name` (String): the name of the new flow object.

__Returns__

 - Getter: `name` (String): the name of the flow object
 - Setter: the `flow` instance


## call
```js
flow
  .create('foo')
  .call(callback) // calls callback with the foo flow object
  .create('bar')
```
Invokes the callback function, passing in the current flow object and any optional parameters. 
Useful for getting an instance of the flow object in the middle of a method chain. 

__Arguments__

 - `callback` (Function): callback function to be called with the current flow object.
 - `[...argument]` (*): additional parameters to be passed into callback

__Returns__

 - `flow`: the current flow instance


## data
```js
flow.data() // returns the data stored in the flow object
flow.data(...args) // sets some data to be stored in the flow object
```
`Getter/Setter`

__Arguments__

 - `[...data]` (*): the data to be stored in the flow object. Can be of any type.

__Returns__

 - Getter: `...data` (*): the data stored in the flow object
 - Setter: the `flow` instance

> __Note__: If multiple data objects are stores in a flow instance, the getter will return them in an array, 
<br />eg.: setting `.data(foo, bar)`, then calling `.data()` will return `[foo, bar]`

## children
```js
flow.children() // returns an array of all child flow objects.
```
Returns an array of direct child nodes. To get all downstream nodes recursively, use the `.get.all` API

`Getter` only. To add a new child use `f.create('new-child-name')`. To add an existing child, use: `child.parent(f)`

__Returns__

 - `[...flow]` An array of all immediate child flow objects

<figure class='children1' ></figure>
<script type="text/javascript">(function(){
  var f = initTree('.children1', 'f')
  f.create('a')
  f.create('b')
    .create('d')
  f.create('c')
  
}())</script>

> __Note__: this API only returns the __immediate children__. If you need to access all child objects recursively, use the `.get.all` API

__Example__


```js
f.create('a')
f.create('b')
  .create('d')
f.create('c')
  
f.children() // returns [a,b,c]
```

## get
__aliases__ for `get`:

 - `find`

```js
flow.get(matcher, recursive)
```
`Getter` only

The `get` API searches all direct children and returns the first result. If the `recursive` parameter is set to true, indirect children are searched, too

__Arguments__

 - `matcher` (String or Function): the name of the flow object to find, or a mathcer function
 - `[recursive]` (Boolean): if `false`: only immediate child nodes are searched

__Returns__

 - flow (flow): the first flow instance that passes the matcher test

> __Note__:
> <br />__Matcher Functions__ are invoked multiple times with a single parameter: the currently tested flow object. If the function returns `true`, the flow is added to the result. 

__Example__

<figure class='get1' ></figure>
<script type="text/javascript">(function(){
  var f = initTree('.get1', 'f')
  f.create('a', 9)
  f.create('b')
  f.create('c', 9)
    .create('d')
  
}())</script>
```js
f.create('a', 9)
f.create('b')
f.create('c', 9)
  .create('d')
  
f.get('a') // returns a
f.get('d') // returns null (since d is not a direct child)
f.get('d', true) // returns d
f.get(child=>child.data()==9) // returns a, the first node where data = 9
```

### get.all
__aliases__ for `get.all`:

 - `find.all`
 
```js
flow.get.all(matcher, recursive)
```
`Getter` only

Same as the `get` API, but ALL matching nodes are returned
__Arguments__

 - `matcher` (String or Function): the name of the flow object to find, or a mathcer function
 - `[recursive]` (Boolean): if `false`: only immediate child nodes are searched

<figure class='get2' ></figure>
<script type="text/javascript">(function(){
  var f = initTree('.get2', 'f')
  f.create('a', 9)
  f.create('b')
  f.create('c', 9)
    .create('d')
  
}())</script>
__Returns__

 - `[...flow]` (Array): all flow instances that pass the matcher test

__Example__


```js
f.create('a', 9)
f.create('b')
f.create('c', 9)
  .create('d')
  
f.get.all('a') // returns [a]
f.get.all('d') // returns [] (since d is not a direct child)
f.get.all('d', true) // returns [d]
f.get.all(child=>child.data()==9) // returns [a,c]
```

## parent
```js
f.parent()
f.parent(newParent) // re-parents the node to newParent
f.parent(null) // detaches the current node
```

Detaches or re-parents the current node.

`Getter`/`Setter`

__Arguments__

 - `newParent` (flow): a flow object to reparent, or `null` to detach the current node

__Returns__

 - getter: `parent` (flow): The current parent (or `null` if the current node is detached)
 - setter: `flow` (flow): the current node

__Example__

<figure class='parent1' ></figure>
<script type="text/javascript">(function(){
  var f = initTree('.parent1', 'f')
  var a = f.create('a')
  a.create('a1')
  a.create('a2')
  f.create('b')
  a.parent(null)
  
}())</script>
```js
var a = f.create('a')
  a.create('a1')
  a.create('a2')
f.create('b') 
a.parent(null

```
> __Note:__
> <br />Setting `.parent(null)` will detach the branch, turning it into a new tree. No events will travel in or our between isolated trees.

## parents
```js
f.parents()
```
Retuns an array of all parents, starting from the elements parent, going upstream until a root node is found.

`Getter` only

__Returns__

 - `...parents` (Array): An array of flow objects
 

__Example__

<figure class='parents' ></figure>
<script type="text/javascript">(function(){
  var f = initTree('.parents', 'f')
  var a = f.create('a')
  var b = f.create('b')
  var c = a.create('c')
  var d = a.create('d')
  var e = d.create('e')

  
}())</script>
```js
var a = f.create('a')
  var b = f.create('b')
  var c = a.create('c')
  var d = a.create('d')
  var e = d.create('e')

c.parents() // returns [d,a,f]

```
> __Note:__
> <br />It is possible to introduce cyclic dependency by setting one of the parents' `.parent` node to a child node. In this scenario `.parents()` will return an array of all unique parent nodes

<br />
<br />
<br />



## status
```js
f.status()
```
Returns the current status of the node.
`Getter` only.

__Returns__

  - `status` (String): One of the following status indicators:

   - __`flow.status.IDLE`__:
<br />The default state of a flow object

   - __`flow.status.FLOWING`__: 
<br />The flow object has been emitted and is currently traversing the tree

   - __`flow.status.STOPPED`__: 
<br />The flow object has been stopped during propagation.

   - __`flow.status.COMPLETED`__:
<br />The flow object has been delivered to all listeners.

   - __`flow.status.CANCELLED`__:
<br />The flow object has been cancelled. 
<br />__No further events will be emitted or received on cancelled nodes or any of their child nodes__
 
## direction
```js
f.direction()
f.direction(flow.direction.UPSTREAM)
```
Defines the flow direction of an emitted node. 
The flow direction defines how an emitted flow object traverses the tree when it gets emitted. 

`Getter`/`Setter`

__Returns__

 - if setter: `flow` (flow): the current node
 - if getter: `direction` (String): One of following direction indicators:

   - __`flow.direction.DEFAULT`__:
<br />The default flow direction. When the node is emitted, it travels upstream until it finds the root node, then travels downstream to reach all recipients.
<br />Downstream traversal is __depth-first__.

   - __`flow.direction.UPSTREAM`__: 
<br />When the node is emitted, it travels upstream until it finds the root node, then it stops. 

   - __`flow.direction.DOWNSTREAM`__: 
<br />When the node is emitted, it travels downstream until it has reached all recipients. The downstream traversal is __depth-first__.

   - __`flow.direction.NONE`__:
<br />When the node is emitted, it only notifies listeners attached to itself and the emitter node, then it stops.

   - __`flow.status.ROOT`__:
<br />When the node is emitted, it flows upstrem to the root node, and only notifies listeners on that node.

> __Note__:
> <br />If __Circular Dependency__ is detected in the tree (ie. a parent has been reparented as a downstream child), event delivery stops as soon as all unique listeners have been notified. 


## cancel
```js
flow.cancel()
```
`Setter` only. 

Cancelling a flow object has the following effects:
 - If the object is used as an event, it will immediately stop invoking subsequent listeners
 - No further events can be dispatched or received on cancelled flow objects or their downstream child objects

__Returns__
 - the current `flow` object

> __Note__
>
> Cancelling a flow object effectively cancels all of its child objects recursively.

__Example__

<figure class='cancel1' ></figure>
<script type="text/javascript">(function(){
  var f = initTree('.cancel1', 'f')
  var a = f.create('a')
  var b = f.create('b')
  var c = a.create('c')
  var d = a.create('d')

  a.cancel()
  
}())</script>
```js
var a = f.create('a')
var b = f.create('b')
var c = a.create('c')
var d = a.create('d')

a.cancel()

```


## isCancelled
```js
flow.isCancelled()
```
`Getter` only. 

__Returns__

 - (Boolean) true if the current flow object or any of its parents have been cancelled.


## stopPropagation
```js
flow.stopPropagation()
```
`Setter` only. 

Invoking `.stopPropagation()` will stop delivering the event to further listeners.

__Returns__
 - the current `flow` object

> __Difference between `stopPropagation` and `cancellation`:__
>
> Cancelling an event has a lasting effect: no further events can be dispatches or received on a cancelled flow object or its children(recursively).
> 
> In contrast - `stopPropagation` simply stops the current event delivery - but the flow object stays active - you can still send or receive events on them.

## propagationStopped
flow.propagationStopped()
```
`Getter` only. 

__Returns__

 - (Boolean) true if `.stopPropagation()` has been called on the current flow object

## guid
```js
flow.guid() //returns 1234
```
`Getter` only.

__Returns__

 - the unique identifier of the flow object.

## toString
```js
flow.toString()
```
`Getter` only.

__Returns__

 - a stringified representation of the current flow object. Useful for logging.

## toObj
```js
flow.toObj()
```
`Getter` only.

__Returns__

 - a static object representation of the current flow object:

```js
{
  name: 'foo',
  guid: 1234,
  status: 'IDLE'
  listeners:['hello']
  children:[
    name: 'bar',
    guid: 2345
  ]
  parent:{
    name: 'a'
    guid: 5432
  }
}
```

## enableDevTools
// TODO

## logger
// TODO
