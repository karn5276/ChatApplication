import React, { useEffect, useState } from 'react'
import { Loginuser } from "../join/Join";
import socketIo from "socket.io-client";
import "../chat/Chat.css"
import Message from '../message/Message';
import ReactScrollToBottom from "react-scroll-to-bottom";

let socket;
const ENDPOINT = "http://localhost:4500/";

export default function Chat() {

    const [message,setmessage]=useState("");
    const [id,setid]=useState("");
    const [chatmsg,setchatmsg]=useState([]);

    const send =(e)=>{
        e.preventDefault();
        socket.emit("message",{message,id});
        setmessage("");

    }

    
    useEffect(()=>{
        
        socket = socketIo(ENDPOINT,{transports:['websocket']});
        socket.on("connect",()=>{
            alert("connected");
            setid(socket.id);
        });

         // emit means send data to the backend , here we are sending loginuser to the backend;
        socket.emit('joined',{Loginuser});
        
        // here we are receiving data from backend;
        socket.on("welcome",(data)=>{
            setchatmsg([...chatmsg,data]);
            console.log("data.user ==> ",data.user,"data.message==> ",data.message);
        });

        socket.on("userJoined",(data)=>{
            setchatmsg([...chatmsg,data]);
            console.log("data.user ==> ",data.user,"data.message==> ",data.message);
        });

        socket.on("leave",(data)=>{
            setchatmsg([...chatmsg,data]);
            console.log(data.message);
        });

        return ()=>{
            socket.emit("disconnectUser");
            socket.off();
        }

    },[]); // when there is any change in socket run this function.

    useEffect(()=>{
        socket.on("sendMessage",(data)=>{
            setchatmsg([...chatmsg,data]);
            console.log(data.user,data.message,data.id);
            socket.off();
        })
    },[chatmsg]);
    return (
        <div className='text-white container' id="wraper">
            <div className='text-white' id="chatContainer" style={{text:"white"}} >
                <div className="header">
                    <h1>Chat</h1>
                    <a href='/join'>X</a>    
                </div>
                <ReactScrollToBottom className="chatbox">
                    {
                        chatmsg.map((item,index)=><Message message={item.message} user={item.id===id?'':item.user} classs={item.id===id?'right':'left'}></Message>)
                        
                    }
                </ReactScrollToBottom>
                <div className="inputbox">
                    <input type="text" value={message} onChange={(e)=>setmessage(e.target.value)} id="input"/>
                    <button onClick={send} id="btn">send</button>
                </div>
            </div>
        </div>
    )
}
