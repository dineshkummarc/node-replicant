var replicant = require('../');

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
