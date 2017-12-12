var socket = require('socket.io-client')('http://localhost:8080')
socket.on('connect', () => {
    socket.emit('createUser')
})
socket.on('userCreated', us => {
    document.getElementById('userDiv').user = us;
    updateUserDiv();
})
function createProject(){
    socket.emit('createProject');
    socket.on('projectCreated', pro => {
        console.log('Created Project', pro)
        document.getElementById('projectDiv').project = pro
        updateProjectDiv()
    })
}
function addFilesToProject(files){
    pro = document.getElementById('projectDiv').project;
    if(pro){
        pro.files = files;
        updateProjectDiv();
        socket.emit('updateProject', {pro: pro})
    }
}
socket.on('projectUpdated', pro => {
    document.getElementById('projectDiv').project = pro
    updateProjectDiv();
})
socket.on('fileUpdated', packet => {
    var pre = document.getElementById("pre")
    saveCaret()
    console.log('Recibido')
    console.log(packet)
    pre.innerHTML = packet.cont
    restoreCaret()
})
document.getElementById("pre").addEventListener('input',(e) => {
    // txt = getText(document.getElementById('pre'))
    // //console.log("Enviando datos", txt);
    // saveCaret()
    // e.srcElement.innerHTML = txt
    // restoreCaret()
    //socket.emit('fileEdited', {cont : txt})
})