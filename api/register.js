const express = require('express');
const router = express.Router()
const User = require('../models/userModel')
// router.get('/', (req, res) => {
//     User.find()
//         .then(users => res.json(users))
//         .catch(err => console.log(err))
// })

router.post('/', (req, res) => {
    const { name, email, password, avatar } = req.body;
    const new_user = new User({
        name: name, email: email, password: password, avatar: avatar
    })
    new_user.save()
        .then(() => res.json({
            message: "Created account successfully"
        }))
        .catch(err => res.status(400).json({
            "error": err,
            "message": "Error creating account"
        }))
})
module.exports = router 