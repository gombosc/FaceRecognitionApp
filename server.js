const express = require('express');
const app = express();

const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');

// Controllers 
const register = require('./controllers/register');
const signIn = require('./controllers/signIn')
const profile = require('./controllers/profile');
const image = require('./controllers/image')

// For CORS error when fetching data
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

const db = knex({
    client: 'pg',
    connection: {
    connectionString : process.env.DATABASE_URL,
    ssl : true,
    // user : 'postgres',
    // password : 'test123',
    // database : 'facerecognitionapp'
    }
})

app.get("/", (req, res) =>{
    res.send("Fetching users!")
})

app.post("/signIn" , (req, res) => {
    signIn.handleSignIn(req, res, db, bcrypt)
})
    // Load hash from your password DB.
    // bcrypt.compare("Punk22", "$2a$10$ywE82xS0inH49vMrIvvL8eJP3Wo05Tv4URKUK/zmbeCMAnPFU7f7u", function(err, res) {
    //     console.log("Password is ", res);
    // });
    // bcrypt.compare("cookiemonster", "$2a$10$ywE82xS0inH49vMrIvvL8eJP3Wo05Tv4URKUK/zmbeCMAnPFU7f7u", function(err, res) {
    //     console.log("Password is ", res);
    // });

app.get("/profile/:id", (req, res) => {
    profile.handleProfile(req, res, db)
})

app.put("/image", (req, res) => {
    image.handleImage(req, res, db, bcrypt)
})

app.post('/register', (req, res) => {
    register.handleRegister(req, res, db, bcrypt)
})

app.post("/imageUrl", (req, res) => {
    image.handleClarifaiApi(req, res)
})

app.listen(PORT, () =>{
    console.log(`App is working on port ${PORT}!`)
})