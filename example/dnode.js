var replicant = require('../');
var dnode = require('dnode');
var patcher = require('patcher');

var server = dnode(function (remote, conn) {
    var rep = replicant({ a : 0, c : 'beep' });
    
    this.join = function (cb) {
        rep.on('patch', cb);
        cb(patcher.computePatch({}, rep.object));
    };
    
    this.patch = rep.patch.bind(rep);
    
    setInterval(function () {
        rep(function (obj) { obj.a ++ });
    }, 500);
}).listen(5051);

server.on('ready', function () {
    dnode.connect(5051, function (remote) {
        var rep = replicant({ b : 100 });
        remote.join(rep.patch.bind(rep));
        
        rep.on('patch', remote.patch);
        remote.patch(patcher.computePatch({}, rep.object));
        
        setInterval(function () {
            rep(function (obj) { obj.b ++ });
        }, 300);
        
        setInterval(function () {
            console.dir(rep.object);
        }, 1000);
    });
});
