replicant
=========

Synchronize objects through a stream.

examples
========

join.js
-------

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

methods
=======

var replicant = require('replicant')

var update = replicant(obj)
---------------------------

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
object or a regular stream.

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

license
=======

MIT/X11
