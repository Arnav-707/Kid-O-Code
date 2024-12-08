const express = require("express");
const cors = require('cors');
const bcrypt = require("bcrypt");
const verifyToken = require('./auth');
const {nanoid} = require('./nanoid_gen');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
let dotenv = require('dotenv').config();
const url = dotenv.parsed.url;
const {create_JWT, refresh_JWT,decode_JWT} = require('./jwt_gen');
const {send_mail} = require("./node-mail");
const cookieparser = require('cookie-parser');
const {randomizer} = require("./randomizer");
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

        const unique_id = nanoid();
        const data_user = {
            "name": name,
            "email": email,
            "password": hash_password
            ,"unique_id": unique_id
        }
        if (!user) {
            db.collection('Users').insertOne(data_user, function (err) {
                if (err) throw err;
                console.log("Record inserted Successfully");
                console.log(data_user);
            });
            const leaderboard_user={
                "name": name,
                "email": email,
                "score": 0,
                "unique_id": unique_id
            }
            await db.collection('leaderboard').insertOne(leaderboard_user,()=>{
                console.log("New signup at leaderboard")
            });
            send_mail(name);
            const {access_token,refresh_token}= create_JWT(data_user);
            res.cookie('jwt', refresh_token,{
                httpOnly: false,
                sameSite: 'None' , secure: true,
                maxAge:24*60*60*1000
            });
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
        const questions = await db.collection("quizezs").find().toArray();
        const random = randomizer(questions);
        res.json(random);
    } catch (err) {
        console.error('Error fetching quiz questions:', err);
        res.status(500).json({ error: 'Failed to fetch quiz questions' });
    }
});
app.post("/quiz", async(req,res)=>{
    console.log(req.cookies.jwt);
    try{
        const email = await decode_JWT(req.cookies.jwt);
        const {score} = req.body;
        db.collection('leaderboard').updateOne({ email: email },{$set:{score:score}},()=>{
            console.log(`updated ${email}'s score to ${score}` );
        });
    }
    catch(err){
        console.log(err);
    }
})

module.exports = app;