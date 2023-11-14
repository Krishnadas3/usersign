const express = require('express')
const path = require('path')
const bcrypt = require('bcrypt')
const collection = require('./config')
const app = express()



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

// app.get('*',(req,res)=>{
//     res.status(404).send('page not found')
// })

const port = 5001
app.listen(port,()=>{
    console.log(`server is running on port:${port}`);
})