var express = require('express');
var app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(3000);

io.on('connection', function(socket) {
    console.log('co nguoi ket noi den server: ' + socket.id);

    socket.on('disconnect', function() {
        console.log(socket.id + ' ngat ket noi');
    });

    socket.on('client-send-data', function(data) {
        console.log(data);
        var kq = parseInt(data.a) + parseInt(data.b);
        io.sockets.emit('server-send-data', kq);
    });

});

app.get('/', function(req, res) {
    res.render('trangchu');
});
