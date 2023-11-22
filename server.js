const express = require('express');
const { MongoClient } = require( 'mongodb');
const db = require('./config/connection');

const app = express();
const port = 3001;
const connectionStringURI = `mongodb://127.0.0.1:27017`;
const client = new MongoClient(connectionStringURI)


app.use(express.json());


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});