import { useState, useEffect, useRef } from "react"
import { Send } from "lucide-react"

interface message  {
    text: string;
    type: "sent" | "received"; 
}

export default function Chat() {
    const [messages, setMessages] = useState<message[]>([])
    
    const [newMessage, setNewMessage] = useState("")
    const chatBoxRef = useRef()
    const wsRef = useRef<WebSocket>(); 
        

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(()=>{
        const ws = new WebSocket("http://localhost:8080"); 
        wsRef.current = ws; 

        ws.onopen = () =>{
            console.log("Connected"); 
         }

        ws.onmessage= (event)=>{
        setMessages(s=>[...s,{text:event.data,type:"received"}])
         console.log(event.data); 
        }
        

       

        
    },[])
    const handleSend = () => {
        if (newMessage.trim()) {
            if(wsRef.current){
            wsRef.current.send(JSON.stringify(newMessage));
            }
            setMessages(prev => [...prev, {text:newMessage,type:"sent"}]); 
            setNewMessage("")
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <div className="flex justify-center items-center  bg-gray-100">
            <div className="w-full max-w-xl mt-10 h-[600px] flex flex-col bg-white rounded-2xl shadow-2xl">
                <div className="px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-2xl">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-lg font-bold text-purple-600">
                            U
                        </div>
                        <div className="text-white">
                            <h1 className="font-bold text-lg">Username</h1>
                        </div>
                    </div>
                </div>


                <div 
                    ref={chatBoxRef}
                    className="flex-1 overflow-y-scroll p-6 bg-gray-50"
                    id="chat-box"
                >
                    {messages.map((message, index) => (
                        <div 
                            key={index} 
                            className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'} mb-4`}
                        >
                            <div 
                                className={`
                                    max-w-[80%]
                                    ${message.type === 'sent' 
                                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl rounded-tr-none' 
                                        : 'bg-white text-gray-800 rounded-2xl rounded-tl-none shadow-md'
                                    }
                                    px-4 py-3
                                `}
                            >
                                <p>{message.text}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-4 bg-white border-t">
                    <div className="flex items-center gap-4">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="flex-1 px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                            placeholder="Type your message..."
                        />
                        <button
                            onClick={handleSend}
                            className={`p-3 rounded-full ${newMessage.trim() 
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                                : 'bg-gray-100 text-gray-400'
                            } transition-all duration-300`}
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}