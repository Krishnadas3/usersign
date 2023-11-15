
const mongoose = require('mongoose')
const connect = mongoose.connect("mongodb://127.0.0.1:27017/shoe")
connect.then(()=>{
    console.log("mongodb connected");
})

/// here we set the schema 

const LoginSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
})


// collection here  and set modal

const userdb = mongoose.model("userdb",LoginSchema)

module.exports = userdb

