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

app.use((req, res) => res.sendFile(INDEX));

var io = require("socket.io")(server);

io.of('/manager').on('connection', function(socket) {
    io.of('/machine').on('connection', function(machine) {
        // Realizing when mahcine is connected
        io.of('/manager').emit('machine-connected', "machine connected");
        machine.on('disconnect', function() {
            io.of('/manager').emit('machine-disconnected', "machine disconnected");
        });
        
        // Recieving controls from the manaer client
        socket.on('textile-in', () => {machine.emit('textile-in')});
        socket.on('belt', () => {machine.emit('belt')});
        socket.on('textile-out', () => {machine.emit('textile-out')});
        socket.on('stop-textile-in', () => {machine.emit('stop-textile-in')});
        socket.on('stop-belt', () => {machine.emit('stop-belt')});
        socket.on('stop-textile-out', () => {machine.emit('stop-textile-out')});

    });
});
