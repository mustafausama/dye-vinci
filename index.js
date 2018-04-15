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

io.of('/manager').on('connection', function() {
    io.of('/machine').on('connection', function(machine) {
        io.of('/manager').emit('machine-connected', "machine connected");
        machine.on('disconnect', function() {
            io.of('/manager').emit('machine-disconnected', "machine disconnected");
        });
    });
});
