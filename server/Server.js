//const app  = require('express')()
const server = require('http').createServer()
const io = require('socket.io')(server)
let tmpSocks = [];
server.listen(8080)
io.on('connection', (socket) => {
    tmpSocks.push(socket)
    socket.on('fileEdited', packet => {
        retransmit(packet.cont);
    })
})
function retransmit(cont){
    tmpSocks.forEach(s => {
        s.emit('fileUpdated', {cont : cont})
    })
}