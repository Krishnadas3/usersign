
const mongoose = require('mongoose')
const connect = mongoose.connect("mongodb://localhost:27017/admin");

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
    }
})


// collection here  and set modal

const collection = new mongoose.model("users",LoginSchema)

module.exports = collection

