//const app  = require('express')()
const server = require('http').createServer()
const io = require('socket.io')(server)
const admin = require('firebase-admin')
const serviceAccount = require('../../key.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://editor-a795d.firebaseio.com'
})

let connections = {}
let projects = {}
server.listen(8080)
io.on('connection', (socket) => {
    console.log("Alguien se conectó")
    socket.on('createUser', () => {
        let newUs = {id: "" + Math.floor(Math.random() * 99999999), crtFile: {}}
        connections[socket.id] = {socket : socket,user: newUs}
        socket.emit('userCreated', newUs)
    })
    socket.on('createProject', () => {
        let us = connections[socket.id].user
        us.crtProject = {id: "" + Math.floor(Math.random() * 99999999), users: [us.id]}
        projects[us.crtProject.id] = us.crtProject;
        socket.emit('projectCreated', us.crtProject)
    })
    socket.on('fileEdited', packet => {
        retransmit(packet.cont);
    })
    socket.on('updateProject', pro => {
        //projects[pro.id] = pro;
    })
})
function retransmit(cont){
    tmpSocks.forEach(s => {
        s.emit('fileUpdated', {cont : cont})
    })
}