require('dotenv').config();
const mongoose = require('mongoose');
const connection = process.env.CONN_STRING;
mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));


// const MongoClient = require('mongodb').MongoClient;
// const url = process.env.CONN_STRING;
// const client = new MongoClient(url);
// client.connect()