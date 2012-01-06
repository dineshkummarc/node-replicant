var replicant = require('../');

var update = replicant({ a : 1 });

setInterval(function () {
    update(function (obj) { obj.a ++ });
}, 1000);

var clone = replicant();
clone.on('update', function (obj) {
    console.dir(obj);
});
update.pipe(clone);
