var patcher = require('patcher');
var Stream = require('stream');
var JSONStream = require('JSONStream');

module.exports = function (obj) {
    var prev = patcher.clone(obj);
    
    var self = function (cb) {
        if (cb.length === 2) {
            var ref = patcher.clone(prev);
            cb(ref, update);
        }
        else {
            var ref = patcher.clone(prev);
            cb(ref);
            update(ref);
        }
        
        function update (next) {
            var patch = patcher.computePatch(prev, next);
            prev = next;
            stringify.write(patch);
        }
    };
    
    var stringify = JSONStream.stringify();
    var parse = JSONStream.parse([ /./ ]);
    
    self.pipe = function (target) {
        stringify.pipe(target);
        return self;
    };
    
    return self;
};
