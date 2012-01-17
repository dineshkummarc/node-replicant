var test = require('tap').test;
var replicant = require('../');

test('null patch', function (t) {
    t.plan(1);
    var rep = replicant({});
    
    var clone = replicant();
    clone.on('update', function (obj) {
        t.deepEqual(obj, {});
        t.end();
    });
    rep.pipe(clone);
    
    rep.patch({});
});
