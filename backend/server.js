console.log("1");

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

console.log("2");
const path = require('path');
const PORT = process.env.PORT || 5000;
const app = express();

app.set('port', (process.env.PORT || 5000));
console.log("3");

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
console.log("4");


if (process.env.NODE_ENV === 'production')
{
    // Set static folder
    app.use(express.static('frontend/build'));
    app.get('*', (req, res) =>
    {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}

console.log("5");

const MongoClient = require('mongodb').MongoClient;
const url = process.env.CONN_STRING;
const client = new MongoClient(url);
client.connect()
console.log("6");

app.listen(PORT, () =>
{
    console.log('Server listening on port ' + PORT);
}); 
console.log("7");

app.post('/api/login', async (req, res, next) => 
{
  // incoming: login, password
  // outgoing: id, firstName, lastName, error
	
    console.log("in login endpoint");

 var error = '';

  const { email, password } = req.body;

  const db = client.db();
  const results = await db.collection('users').find({email:email,password:password}).toArray();

  console.log("8");

  var id = -1;
  var name = '';
  var avatar = '';

  if( results.length > 0 )
  {
    id = results[0]._id;
    name = results[0].name;
    avatar = results[0].avatar;
  }
  console.log("9");

  var ret = { id:id, name:name, avatar:avatar, error:''};
  console.log(ret)
  res.status(200).json(ret);
  console.log("10");

});