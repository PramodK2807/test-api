// const dbConnection = require('../mongo/mongoConn');
const express = require('express');
// let port = 2000;
let cors = require('cors');
const dotenv = require('dotenv');
let PORT = process.env.PORT || 3000;
dotenv.config();
const url = 'mongodb+srv://test:test123@cluster0.rqzfmzk.mongodb.net/BookMyShow?retryWrites=true&w=majority';

const {MongoClient} = require("mongodb");

const client = new MongoClient(url);
// const dbConnect = require('./dbConnect');
const app = express();

app.use(cors())
app.use(express.json());




async function getData (){
    let result = await client.connect();
    let db = result.db("BookMyShow");
    return db;
}

app.get('/', async (req, res) => {
    res.send(`running on port ${PORT}`);
});


//  ALL MOVIES
app.get('/movies', async (req, res) => {
    let data = await getData();
    let collection = await data.collection('movies').find().toArray();
    console.log(collection);
    res.send(collection);
});


// GET MOVIES BY CATEGORY
app.get('/movies/:movieId', async (req, res) => {
    let movieId = Number(req.params.movieId);
    let data = await dbConnection();
    let collection = await data.collection('movies').find({category_id:movieId}, {title:1, category_id:1, category:1}).toArray();
    console.log(collection);
    res.send(collection);
});

// SORTING

app.get('/sort', async (req, res) => {
    let costSort = {subscription : 1}
    let data = await dbConnection();
    let collection = await data.collection('movies').find().sort(costSort).toArray();
    console.log(collection);
    res.send(collection);
});
app.listen(PORT);