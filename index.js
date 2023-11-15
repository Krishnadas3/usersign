const express = require('express')
const path = require('path')
const bcrypt = require('bcrypt')
const userdb = require("./src/config") // here we are put our file name
const app = express()
// consvert data into json format
// app.use(express.join())

app.use(express.json())

app.use(express.urlencoded({extended:false}))

app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'views'));

app.get('/',(req,res)=>{
    res.render(path.join(__dirname,'views/login'))
})

//static file

app.use(express.static("public"))

app.get('/signup',(req,res)=>{
    res.render('signup')
})


//register user here
app.post('/signup',async (req,res)=>{
   const data = {
       name : req.body.username,
       password: req.body.password
   }

   const userdata = await userdb.insertMany(data) /// here we are using the collection name 
   console.log(userdata);                             

    res.send('user register successfully ')



})

const port = 5001
app.listen(port,()=>{
    console.log(`server is running on port:${port}`);
})