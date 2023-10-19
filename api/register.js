const express = require('express');
const router = express.Router()
const User = require('../models/userModel')
// router.get('/', (req, res) => {
//     User.find()
//         .then(users => res.json(users))
//         .catch(err => console.log(err))
// })

router.post('/', (req, res) => {

    // incoming: name, email, password, avatar
    // outgoing: result

    const { name, email, password, avatar } = req.body;
    const new_user = new User({
        name: name, email: email, password: password, avatar: avatar
    })

    new_user.save()
        .then(() => res.status(200).json({
            message: "Created account successfully!"
        }))
        .catch(err => res.status(400).json({
            "error": err,
            "message": "Error creating account."
        }))

    //et result = {result:"Registered new user"};

    //res.status(200).json(result);

})
module.exports = router 



