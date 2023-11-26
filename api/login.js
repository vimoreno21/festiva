const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  // incoming: login, password
  // outgoing: id, firstName, lastName, error

  const { email, password } = req.body;


  results = await User.find({ email: email, password: password });

  let id = -1;
  let name = '';
  let avatar = '';
  let verified = false;

  if (results.length > 0) {
    id = results[0]._id;
    name = results[0].name;
    avatar = results[0].avatar;
    verified = results[0].verified;
  }
  else {
    console.log("No results for inputted user")
    return res.status(400).send({ message: "Invalid Email or Password" })
  }

  if (verified) {
    let ret = { id: id, name: name, avatar: avatar, error: '' };

    // return jwt
    const payload = {
      user: {
        id: id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '30 days' },
      (err, token) => {
        if (err) res.status(500).json({message: "Error logging in."});
        else res.status(200).json({ token, ...ret });
      }
    );
    console.log("Login Success!")
    // return res.status(200).json(ret);
  }
  else {
    console.log("Not verified")
    return res.status(400).send({ message: "An email has been sent to your account to verify. You must verify before logging in." })
  }

});

module.exports = router