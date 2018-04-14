var app = require("express");
var path = require("path");

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

var server = app()
    .use((req, res) => res.sendFile(INDEX))
    .listen(PORT, () => console.log("listening on port", PORT));

var io = require("socket.io")(server);
var machineIo = io.of('/machine');
var managerIo = io.of('/manager');

machineIo.on('connection', function(machine) {

    setTimeInterval((
        
        managerIo.sockets.emit('machine-connected'));

});

managerIo.on('connection', function() {
    
});
