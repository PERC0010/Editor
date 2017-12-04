var app  = require('express')()
var server = require('http').createServer()
var io = require('socket.io')(server)

server.listen(8080, () => {
    console.log('listening');
})
io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
});