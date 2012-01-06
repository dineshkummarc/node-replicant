var replicant = require('../');
var dnode = require('dnode');
var patcher = require('patcher');

var server = dnode(function (remote, conn) {
    var rep = replicant({ a : 0, c : 'beep' });
    this.patch = rep.patch.bind(rep);
    this.pipe = rep.pipe.bind(rep);
    
    setInterval(function () {
        rep(function (obj) { obj.a ++ });
    }, 500);
}).listen(5051);

server.on('ready', function () {
    var rep = replicant({ b : 100 });
    
    setInterval(function () {
        rep(function (obj) { obj.b ++ });
    }, 300);
    
    setInterval(function () {
        console.dir(rep.object);
    }, 1000);
    
    dnode.connect(5051, function (remote, conn) {
        rep.pipe(remote.patch);
        remote.pipe(rep.patch.bind(rep));
    }).connect(5051);
});
