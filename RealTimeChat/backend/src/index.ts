import {WebSocketServer, WebSocket} from 'ws'

interface User {
    socket: WebSocket 
    room: string
}
const wss  = new WebSocketServer({port:8080});

let allSocket: User[]  = []; 

wss.on("connection",(socket)=>{
    
    socket.on("message",(message)=>{
        //@ts-ignore
        const parsedMessage = JSON.parse(message); 
        if(parsedMessage.type=="join"){
            console.log("User Joined Room"+parsedMessage.payload.roomId); 
            allSocket.push({
                socket,
                room: parsedMessage.payload.roomId
            })
        }

        if(parsedMessage.type == "chat"){
            console.log("User wants to chat"); 

            const currentUserRoom = allSocket.find((x)=>x.socket== socket)?.room;

            allSocket.forEach((s)=>{
                if(s.room == currentUserRoom){
                    s.socket.send(parsedMessage.payload.message); 
                }})

        }
    })
    
})
