var replicant = require('../');
var net = require('net');

net.createServer(function (stream) {
    var rep = replicant({ a : 0 });
    replicant.join(rep, stream);
    
    setInterval(function () {
        rep(function (obj) { obj.a ++ });
    }, 500);
    
    setInterval(function () {
        console.dir(rep.object);
    }, 1000);
}).listen(5051, ready);

function ready () {
    var stream = net.createConnection(5051, function () {
        var rep = replicant({ b : 100 });
        replicant.join(rep, stream);
        
        setInterval(function () {
            rep(function (obj) { obj.b ++ });
        }, 300);
    });
}
