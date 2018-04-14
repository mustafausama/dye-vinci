var app = require("express");
var path = require("path");

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

var server = app()
    .use((req, res) => res.sendFile(INDEX))
    .listen(PORT, () => console.log("listening on port", PORT));

var io = require("socket.io")(server);

io.on("connection", function(socket) {

    socket.on('disconnect', function() {
        console.log("Hello Disconnection");
    });
});
