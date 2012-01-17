var test = require('tap').test;
var replicant = require('../');

test('null patch', function (t) {
    var src = replicant({});
    var dst = replicant({});
    
    src.pipe(dst);
    src.patch({});
    
    t.end();
});
