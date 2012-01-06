var replicant = require('../');

var update = replicant({ a : 1 }).pipe(process.stdout);

setInterval(function () {
    update(function (obj) {
        obj.a ++;
    });
}, 1000);
