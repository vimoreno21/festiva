const path = require('path');
const PORT = process.env.PORT || 5000;

const express = require('express');

app.set('port', (process.env.PORT || 5000));

const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) =>
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});

const MongoClient = require('mongodb').MongoClient;
const url = process.env.CONN_STRING;
const client = new MongoClient(url);
client.connect()

app.listen(PORT, () =>
{
    console.log('Server listening on port ' + PORT);
}); 