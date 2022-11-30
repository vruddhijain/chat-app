const mongoose = require('mongoose')


const UserSchema = mongoose.Schema({
    _id: String,
   
   
})

module.exports = mongoose.model('Users',UserSchema)


mongoose.connect('mongodb://localhost:27017/chatapp',{useNewUrlParser:true, useUnifiedTopology:true,},
    function(err){
        if(err){
            throw err
        }
        console.log('Database connected')
       

      
})