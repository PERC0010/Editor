var socket = require('socket.io-client')('http://localhost:8080')
socket.on('connect', () => {
    console.log('El cliente se conectó')
})
socket.on('fileUpdated', packet => {
    var pre = document.getElementById("pre")
    saveCaret(pre)
    pre.innerHTML = packet.cont
    restoreCaret(pre)
})
document.getElementById("pre").addEventListener('change',() => {
    socket.emit('fileEdited', {cont : document.getElementById('pre').innerHTML})
})