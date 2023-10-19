const express = require('express');
const router = express.Router();
const User = require('../models/userModel')

router.post('/', (req, res) => 
{
  // incoming: login, password
  // outgoing: id, firstName, lastName, error

  let error = '';

  const { email, password } = req.body;

  //const db = client.db();
  //const results = await db.collection('users').find({email:email,password:password}).toArray();
  results = User.find({email:email,password:password}).toArray();
  console.log(results);

  let id = -1;
  let name = '';
  let avatar = '';

  if( results.length > 0 )
  {
    id = results[0]._id;
    name = results[0].name;
    avatar = results[0].avatar;
  }

  let ret = { id:id, name:name, avatar:avatar, error:''};
  console.log(ret)
  res.status(200).json(ret);

});

module.exports = router