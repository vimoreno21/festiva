const express = require('express');
const router = express.Router()
const User = require('../models/userModel')

router.post('/', async (req, res) => {

    // incoming: password
    // outgoing: result
    const email = req.body.email;
    const new_pass = req.body.password;

    //maybe validate password

    //update password
    await User.updateOne({ email: email }, { password: new_pass })
                .then(() => res.status(200).json({
                    "message": "Password reset successfully! You may now login."
                }))
                .catch(err => res.status(400).json({
                    "error": err,
                    "message": "Error resetting password"
                }));
    
})


module.exports = router