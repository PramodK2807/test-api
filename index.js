// const getData = require('../mongo/mongoConn');
const express = require('express');
// let port = 2000;
let cors = require('cors');
let bodyParser = require('body-parser');
const dotenv = require('dotenv');
let PORT = process.env.PORT || 3000;
dotenv.config();
const url = 'mongodb+srv://test:test123@cluster0.rqzfmzk.mongodb.net/BookMyShow?retryWrites=true&w=majority';

const {MongoClient} = require("mongodb");

const client = new MongoClient(url);
// const dbConnect = require('./dbConnect');
const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
app.get('/categoryId/:categoryId', async (req, res) => {
    let category_id = Number(req.params.categoryId);
    let data = await getData();
    let collection = await data.collection('movies').find({category_id}, {title:1, category_id:1, category:1}).toArray();
    console.log(collection);
    res.send(collection);
});

app.get('/movieId/:movieId', async (req, res) => {
    let movie_id = Number(req.params.movieId);
    let data = await getData();
    let collection = await data.collection('movies').find({movie_id}).toArray();
    console.log(collection);
    res.send(collection);
});

// SORTING

app.get('/sort', async (req, res) => {
    let costSort = {subscription : 1}
    let data = await getData();
    let collection = await data.collection('movies').find().sort(costSort).toArray();
    console.log(collection);
    res.send(collection);
});


app.listen(PORT);