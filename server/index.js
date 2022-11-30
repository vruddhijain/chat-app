const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const bodyParser = require('body-parser');
var router = express. Router();
//const mongoose = require('mongoose');

app.use(bodyParser.json())

// collections
//const Users = require('./connect')

app.use(cors());

router.get("/:name/:id", function(req, res) {

  res.send( "name is " + req.params.name +"id is"+ req.params.id)});

const mongoose = require('mongoose')


const UserSchema = mongoose.Schema({
    id: String,

   
})

module.exports = mongoose.model('Users',UserSchema)


mongoose.connect('mongodb://localhost:27017/chatapp',{useNewUrlParser:true, useUnifiedTopology:true,},
    function(err){
        if(err){
            throw err
        }
        console.log('Database connected')


      

            

      })
       

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});




io.on("connection", function(socket){
    
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room : ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });

  
});




server.listen(3001, () => {
  console.log("SERVER RUNNING");
});



