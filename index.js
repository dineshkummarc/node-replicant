var patcher = require('patcher');
var JSONStream = require('JSONStream');
var EventEmitter = require('events').EventEmitter;

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
            self.emit('patch', patch);
        }
    };
    
    var parse = JSONStream.parse([ /./ ]);
    
    self.pipe = function (target) {
        var stringify = JSONStream.stringify();
        stringify.pipe(target);
        
        self.on('patch', function (patch) {
            stringify.write(patch);
        });
        return self;
    };
    
    var emitter = new EventEmitter;
    Object.keys(EventEmitter.prototype).forEach(function (key) {
        if (typeof emitter[key] === 'function') {
            self[key] = emitter[key].bind(emitter);
        }
    });
    
    return self;
};
