const express = require('express');
const router = express.Router();
const User = require('../models/userModel')

router.post('/', async (req, res) => 
{
  // incoming: login, password
  // outgoing: id, firstName, lastName, error

  const { email, password } = req.body;

  results = await User.find({email:email,password:password});

  let id = -1;
  let name = '';
  let avatar = '';

  if (results.length > 0)
  {
    id = results[0]._id;
    name = results[0].name;
    avatar = results[0].avatar;
  }

  let ret = { id:id, name:name, email:email, avatar:avatar, error:''};
  res.status(200).json(ret);

});

module.exports = router