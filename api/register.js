const express = require('express');
const router = express.Router()
const User = require('../models/userModel')
const Token = require("../models/token")
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto")
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {

    // incoming: name, email, password, avatar
    // outgoing: result
    const { name, email, password, avatar, verified } = req.body;
    const new_user = new User({
        name: name, email: email, password: password, verified: false, avatar: avatar
    })

    console.log("in register api!");

    //check if user already exists
    user_check = await User.find({ email: new_user.email })
    if (user_check.length > 0) {
        return res.status(400).send({ message: "User already exists with email." })
    }

    // register user
    try {
        await new_user.save()

        // return jwt
        const payload = {
            user: {
                id: new_user.id,
            },
        };

        const message = "Created account successfully! An Email has been sent to your account, please verify to login."
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '7 days' },
            (err, token) => {
                if (err) res.status(500).json({message: "Error creating account."});
                else res.status(200).json({message, token });
            }
        );

        // res.status(200).json({"message": "Created account successfully! An Email has been sent to your account, please verify to login."})

        //if user successfully saved then send email to verify
        if (res.statusCode === 200) {
            const token = await new Token({
                userId: new_user._id,
                token: crypto.randomBytes(32).toString("hex")
            }).save();
    
            const url = `https://festiva-ucf-3a962394b6e7.herokuapp.com/api/registerVerification/${new_user._id}/verify/${token.token}`;
            // const url = `http://localhost:5000/api/registerVerification/${new_user._id}/verify/${token.token}`;
            await sendEmail(new_user.email, "Verify Email", url)
        }
        else console.log(res.statusCode)
    } catch (err) {
        console.error(err.message)
        res.status(400).send('Error creating account.')
    }
 


})


module.exports = router 