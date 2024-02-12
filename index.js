const express = require('express')
const path = require('path')
const bcrypt = require('bcrypt')
const userdb = require("./src/config") // here we are put our file name
const app = express()
const cookieparser = require('cookie-parser')



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
       email: req.body.email,
       password: req.body.password
   }

   //check if the user already exists in the database

   const existingUser = await userdb.findOne({email:data.email})

   if(existingUser){
    res.send('User already exits. please choose a diffrenet username ')
   }else{
       
    //hash the password using bcrypt

    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(data.password,saltRounds)

    data.password = hashedPassword; // replacing the hash passoword with origingal passoword

    const userdata = await userdb.insertMany(data) /// here we are using the collection name 
    // res.render("index")
    console.log("writed from signup",userdata); 
    res.redirect('/login')                            
   }

})

app.get('/login',(req,res)=>{
    res.render('login')
})

/// login

app.post('/login',async (req,res)=>{
    try {
        console.log("entered login page");
        console.log(req.body);
        const check = await userdb.findOne({email:req.body.email})
        if(!check){
            res.send('user name cannot found')
            return;
        }

        
        const isPasswordMatch = await bcrypt.compare(req.body.password,check.password)       // codmpare the hash passowrd from the datbase with the plain text
        if(isPasswordMatch){
            res.render("home")
        }else{
            res.send("wrong password")
        }
    } catch (error)  {
        console.error(error);
        res.send("wrong details")
    }
})

const port = 5005
app.listen(port,()=>{
    console.log(`server is running on port:${port}`);
})