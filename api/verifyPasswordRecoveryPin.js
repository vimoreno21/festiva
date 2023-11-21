// take the pin and email as input
// check the database for the pin
// if pin is matched to the email that comes in then change password
const express = require('express');
const router = express.Router()
const User = require('../models/userModel')
const Pin = require('../models/pin')
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto")

router.post('/', async (req, res) => {

    // incoming: email and pin
    // outgoing: result
    const email = req.body.email;
    const pin = req.body.pin;

    //check if pin doesn't exist
    pin_check = await Pin.find({pin: pin})
    if (pin_check.length == 0)
    {
        return res.status(400).send({message: "Incorrect pin."})
    }


    //verify pin to email
    if (pin_check[0].email == email)
    {
        return res.status(200).send({message: "Correct Pin."})
    }
    else
    {
        return res.status(400).send({message: "Incorrect Pin."})
    }
})


module.exports = router