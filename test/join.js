var test = require('tap').test;
var replicant = require('../');

test('join two replicants', function (t) {
    t.plan(10);
    
    var a = replicant({ a : 0 });
    var b = replicant({ b : 100 });
    replicant.join(a, b);
    
    var times = 0;
    var iv = setInterval(function () {
        a(function (obj) { obj.a ++ });
        b(function (obj) { obj.b ++ });
        
        times ++;
        t.deepEqual(a.object, {
            a : times,
            b : times + 100,
        });
        t.deepEqual(a.object, b.object);
        
        if (times === 10) {
            clearInterval(iv);
            t.end();
        }
    }, 5);
});
