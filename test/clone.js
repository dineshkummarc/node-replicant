var test = require('tap').test;
var replicant = require('../');

test('one-way cloning', function (t) {
    var update = replicant({ a : 0 });
    t.plan(10);
    
    var times = 0;
    var iv = setInterval(function () {
        times ++;
        update(function (obj) { obj.a ++ });
        
        if (times === 10) {
            clearInterval(iv);
            t.end();
        }
    }, 10);
    
    var clone = replicant();
    clone.on('update', function (obj) {
        t.deepEqual(obj, { a : times });
    });
    update.pipe(clone);
});
