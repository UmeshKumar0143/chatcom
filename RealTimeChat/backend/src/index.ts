import {WebSocketServer, WebSocket} from 'ws'


const wss  = new WebSocketServer({port:8080});

let allSocket: WebSocket[]  = []; 

wss.on("connection",(socket)=>{
    
    allSocket.push(socket)
    socket.on("message",(message)=>{
        //@ts-ignore
        try {
            const parsedMessage = JSON.parse(message.toString()); 
            console.log(parsedMessage); 
         allSocket.forEach((s)=>{
                    if(s !==socket){
                        s.send(parsedMessage.toString())
                    }; 
                })
        } catch (e) {
            console.log("Eror parsing message : ",e); 
        }

    })
    
})
