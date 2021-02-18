import io from 'socket.io-client'
debugger
const socket = io('ws://localhost:4000')

socket.on('receiveMsg', function (data) {
    console.log('Client received:', data)
})
const data = Date()
socket.emit('sendMsg', data)
console.log('Client send:', data)