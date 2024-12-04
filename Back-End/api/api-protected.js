const express = require("express");
const cors = require('cors');
const bcrypt = require("bcrypt");
const verifyToken = require('./auth');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
let dotenv = require('dotenv').config();
const url = dotenv.parsed.url;
const {create_JWT, refresh_JWT} = require('./jwt_gen');
const {send_mail} = require("./node-mail");
const cookieparser = require('cookie-parser');
const { assign } = require("nodemailer/lib/shared");
//Database connection
mongoose.connect(url)
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => {
        console.log("Some issue while connecting to the database", err);
    });
var db = mongoose.connection;

// Express Initialization
const app = express();
app.use(cookieparser());
app.use(cors( {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('Access-Control-Allow-Credentials', true)
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
  })

//Routes
app.post("/signup", async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const user = await db.collection('Users').findOne({ email: email });
        const saltRounds = 10;

        const hash_password = await bcrypt.hash(password, saltRounds)

        const data_user = {
            "name": name,
            "email": email,
            "password": hash_password
            // ,"unique_number": unique_number
        }
        if (!user) {
            db.collection('Users').insertOne(data_user, function (err) {
                if (err) throw err;
                console.log("Record inserted Successfully");
                console.log(data_user);
            });
            send_mail(name);
            const {access_token,refresh_token}= create_JWT(data_user);
            res.cookie('jwt', refresh_token,{
                httpOnly: true,
                sameSite: 'None' , secure: true,
                maxAge:24*60*60*1000
            },()=>{
                console.log("Cookie created")
            });
            next();
            res.json({ 'token': access_token });
        }
        else {
            return res.status(406).json({message:"Invalid Creds"});
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to insert record' });
    }
})

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const data_user ={
            "email":email,
            "password":password
        }
        const user = await db.collection('Users').findOne({ email: email });
        if (user) {
            const pword_check = await bcrypt.compare(password, user.password);
            if (pword_check) {
                const {access_token,refresh_token}= create_JWT(data_user);
                res.cookie('jwt', refresh_token,{
                    httpOnly: false,
                    sameSite: 'None' , secure: true,
                    maxAge:24*60*60*1000
                },()=>{
                    console.log("Cookie created")
                });
                console.log(access_token);
                res.json({ 'token': access_token });;
            }
            else {
                res.json({ 'message': "Invalid User" });
            }
        }
    }
    catch (err) {
        console.log(err);
    }
})

app.post('/refresh',async (req,res)=>{
    try{
    const refresh_token = req.cookies.jwt;
    if(refresh_token){
        const {access_token} = await refresh_JWT(refresh_token);
        if(access_token){
            res.json({'token':access_token});
        }
        else{
            res.status(506).json({error:'Internal Server Error'});
        }
    }
    else{
        return false;
    }}
    catch(err){
        console.log(err);
    }
})

app.post('/protected', async (req, res) => {
    try {
        const token = req.body.token;
        const auth = verifyToken(token);
        if (auth) {
            res.json({ "Auth": true })
        }
        else {
            res.json({ "Auth": false });
        }
    }
    catch (err) {
        console.log(err);
    }
})
app.post('/leaderboard', async (req, res) => {
    if(verifyToken(req.body.token)){try {
        const users = await db.collection('leaderboard').find({}).sort({score:-1}).toArray(); // Fetch data from the leaderboard collection
        res.json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Failed to fetch users' });
    }}
    else{
        res.status(403).json({message:"Not Auth"});
    }
});

// API route to fetch quiz questions
app.get('/quiz', async (req, res) => {
    try {
        const questions = await db.collection("quizez").find().toArray();
        res.json(questions);
    } catch (err) {
        console.error('Error fetching quiz questions:', err);
        res.status(500).json({ error: 'Failed to fetch quiz questions' });
    }
});


module.exports = app;