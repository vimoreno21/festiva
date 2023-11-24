const express = require('express');
const router = express.Router()
const User = require('../models/userModel')
const Pin = require('../models/pin')
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto")

router.post('/', async (req, res) => {

    // incoming: email
    // outgoing: result
    const email = req.body.email;

    //check if user doesn't exist
    user_check = await User.find({email: email})
    if (user_check.length == 0)
    {
        return res.status(400).send({message: "User does not exist."})
    }

    //create pin
    var number = Math.floor(100000 + Math.random() * 900000)
    const pin = new Pin({email: email, pin: number})

    let message = ""
    //save pin in database
    pin.save();
    results = await Pin.find({email: email, pin: number})
                    .then(data => { 
                        message = "Pin Success"
                    }) 
                    .catch(error => { 
                        message = "Pin Error"
                    })
    
    //if successful then send email to recover
    if(message == "Pin Success")
    {
        let emailText = "Your recovery pin is: " + pin.pin
        await sendEmail(email, "Password Recovery", emailText)
        return res.status(200).send({message: "Password recovery email sent."})
    }
    else
    {
        return res.status(400).send({message: "Email could not be sent."})
    }

})


module.exports = router 