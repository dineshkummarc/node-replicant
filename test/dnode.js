var test = require('tap').test;
var replicant = require('../');
var dnode = require('dnode');

test('replicate through a dnode server', function (t) {
    t.plan(6);
    
    var port = Math.random() * 5e4 + 1e4;
    var serverRep, clientRep;
    
    var server = dnode(function (remote, conn) {
        serverRep = replicant({ a : 0, c : 'beep' });
        this.patch = serverRep.patch.bind(serverRep);
        this.pipe = serverRep.pipe.bind(serverRep);
        
        var iv = setInterval(function () {
            serverRep(function (obj) { obj.a ++ });
        }, 5);
        
        conn.on('end', function () {
            clearInterval(iv);
        });
    }).listen(port);
    
    server.on('ready', function () {
        clientRep = replicant({ b : 100 });
        
        var client = dnode.connect(port, function (remote, conn) {
            clientRep.pipe(remote.patch);
            remote.pipe(clientRep.patch.bind(clientRep));
            
            var iv = setInterval(function () {
                clientRep(function (obj) { obj.b ++ });
            }, 5);
            
            setTimeout(function () {
                conn.end();
                clearInterval(iv);
                server.close();
                
                t.ok(clientRep.object.a >= 10);
                t.ok(serverRep.object.a >= 10);
                
                t.ok(clientRep.object.b >= 110);
                t.ok(serverRep.object.b >= 110);
                
                t.equal(clientRep.object.c, 'beep');
                t.equal(serverRep.object.c, 'beep');
                
                t.end();
            }, 120);
        });
    });
});
