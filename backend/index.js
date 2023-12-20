const http=require("http");
const express=require("express");
const app = express();
const cors=require("cors");
const socketIo=require("socket.io");


const users=[{}];
app.use(cors());

port = 4500 || process.env.PORT;

app.get("/",(req,res)=>{
    res.send("home root");
});

const server=http.createServer(app);
const io=socketIo(server);

io.on("connection",(socket)=>{

    // here we are recieve data from frontend.
    socket.on('joined',({Loginuser})=>{   
        users[socket.id]=Loginuser;
        console.log(`${Loginuser} has login`);

        // below msg will send to all user expect those user which is connected to chat. basically it send to all new users.
        socket.broadcast.emit('userJoined',{user:"Admin",message:`${users[socket.id]} has joined`});
        // here we are sending data to the frontend.
        socket.emit("welcome",{user:"admin",message:"welcome to the chat"}); 
    });

    socket.on("message",({message,id})=>{
        io.emit("sendMessage",{user:users[id],message,id});
    });


    socket.on("disconnectUser",()=>{
        // here when user left the message go the all user which is connected.
        socket.broadcast.emit("leave",{user:'Admin',message:`${users[socket.id]} user has left`});

        console.log("user left");
    })


    
   
})

server.listen(port,()=>{
    console.log(`app is listing on port http://localhost:${port}`);
});


