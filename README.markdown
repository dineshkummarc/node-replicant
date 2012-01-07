replicant
=========

Synchronize objects through a stream.

examples
========

join.js
-------

Synchronize two objects with `replicant.join()`

``` js
var replicant = require('replicant');

var a = replicant({ a : 0 });
var b = replicant({ b : 100 });

replicant.join(a, b);

setInterval(function () {
    a(function (obj) { obj.a ++ });
    b(function (obj) { obj.b ++ });
}, 500);

setInterval(function () {
    console.dir(a.object);
}, 1000);
```

ouput:

```
$ node example/join.js 
{ a: 2, b: 102 }
{ a: 4, b: 104 }
{ a: 6, b: 106 }
{ a: 8, b: 108 }
{ a: 10, b: 110 }
^C
```

join_stream.js
--------------

Synchronize two objects over a network stream

``` js
var replicant = require('replicant');
var net = require('net');

net.createServer(function (stream) {
    var rep = replicant({ a : 0 });
    replicant.join(rep, stream);
    
    setInterval(function () {
        rep(function (obj) { obj.a ++ });
    }, 500);
    
    setInterval(function () {
        console.dir(rep.object);
    }, 1000);
}).listen(5051, ready);

function ready () {
    var stream = net.createConnection(5051, function () {
        var rep = replicant({ b : 100 });
        replicant.join(rep, stream);
        
        setInterval(function () {
            rep(function (obj) { obj.b ++ });
        }, 300);
    });
}
```

output:

```
$ node example/join_stream.js 
{ a: 2, b: 103 }
{ a: 4, b: 106 }
{ a: 6, b: 110 }
{ a: 8, b: 113 }
{ a: 10, b: 116 }
^C
```

methods
=======

var replicant = require('replicant')

replicant.join(a, b)
--------------------

Pipe replicant objects or streams to each other.

var update = replicant(obj)
---------------------------

Create a new replicant object wrapping an object `obj`.

update(cb)
----------

Update the synchronized object with the callback `cb`.

If the arity of `cb` is 1, `cb(obj)` will be called. Just modify `obj` in-place
in the same tick to have the modifications be broadcast to the other replicants.

If the arity of `cb` is 2, `cb(obj, emit)` will be called. Pass the `emit`
function the new version of the object `obj`.

update.pipe(target)
-------------------

Pipe JSON data through the stream `target`, which can be another replicant
object, a regular stream, or a replicant object's `.pipe` function.

Using the object's `.pipe` function here is handy for replicating over
[dnode](https://github.com/substack/dnode) connections.

update.unpipe(target)
---------------------

Don't pipe any more data to `target`.

This is useful for when multiple clients are connected to the same replication
server and the connection gets severed.

attributes
==========

update.object
-------------

Get the current state of the synchronized object. Only read this object and
don't use its value to make updates.

events
======

update.on('update', function (obj) {})
--------------------------------------

Emitted when `update` receives a patch. `obj` is the new `update.object` value.

install
=======

With [npm](http://npmjs.org) do:

```
npm install replicant
```

in the browser
==============

This module works great in the browser with
[browserify](http://github.com/substack/node-browserify).

tests
=====

To run the server-side tests in `test/`, do:

```
npm test
```

To run the [testling](http://testling.com) browser tests in `testling/`, create
a testling account then from the project root directory run:

```
testling/test.sh
```

The shell script will prompt you to enter your testling account info.

license
=======

MIT/X11
