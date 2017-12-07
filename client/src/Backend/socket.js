var socket = require('socket.io-client')('http://localhost:8080')
socket.on('connect', () => {
    console.log('El cliente se conectó')
})
socket.on('fileUpdated', packet => {
    var pre = document.getElementById("pre")
    saveCaret()
    console.log('Recibido');
    console.log(packet);
    pre.innerHTML = packet.cont
    restoreCaret()
})
document.getElementById("pre").addEventListener('keyup',() => {
    //console.log("Enviando datos");
    //socket.emit('fileEdited', {cont : document.getElementById('pre').innerHTML})
})