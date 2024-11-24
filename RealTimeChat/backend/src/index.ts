import {WebSocketServer, WebSocket} from 'ws'

const wss  = new WebSocketServer({port:8080});
let userCount = 0; 
let allSocket: WebSocket[]  = []; 
wss.on("connection",(socket)=>{
    allSocket.push(socket); 
    userCount++;
    console.log("user conencted",userCount); 
    
    socket.on("message",(message)=>{
        console.log("Message Recevied : ", message.toString()); 
        allSocket.forEach(s=> s.send("From Server: " + message.toString())); 
    })
})
