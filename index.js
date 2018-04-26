var app = require("express")();
var server = require('http').Server(app);
var path = require("path");

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');
/*
var server = app
    .use((req, res) => res.sendFile(INDEX))
    .listen(PORT, () => console.log("listening on port", PORT));
*/

server.listen(PORT);

app.get('/style.css', function(req, res) {
    res.sendFile(__dirname + "/" + "style.css");
})
app.get('/jquery.min.js', function(req, res) {
    res.sendFile(__dirname + "/" + "jquery.min.js");
})

app.use((req, res) => res.sendFile(INDEX));

var io = require("socket.io")(server);

io.of('/manager').on('connection', function(socket) {
    io.of('/machine').on('connection', function(machine) {
        // Realizing when mahcine is connected
        io.of('/manager').emit('machine-connected', "machine connected");
        machine.on('disconnect', function() {
            io.of('/manager').emit('machine-disconnected', "machine disconnected");
        });
        
        // Recieving controls from the manager client
        socket.on('textile-in',  (data) => machine.emit('textile-in', data));
        socket.on('top-belt',    (data) => machine.emit('top-belt', data));
        socket.on('down-belt',   (data) => machine.emit('down-belt', data));
        socket.on('belt-up',     () => machine.emit('belt-up'));
        socket.on('belt-down',   () => machine.emit('belt-down'));
        socket.on('textile-out', (data) => machine.emit('textile-out', data));

    });
});
