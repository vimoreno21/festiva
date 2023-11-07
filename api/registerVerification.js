const express = require('express');
const router = express.Router()
const User = require('../models/userModel')

router.post("/", async (req, res) => {
    console.log("inside register verification!")
    try {
        console.log("inside register verification!")
        console.log(req.params);

        const id = req.params.id
        const user = await User.find({_id: id});
        console.log(user)

        if(!user) 
            return res.status(400).send({message: "Invalid link"});

        //const token = await Token.findOne({
        //    userId: user._id,
        //    token: req.params.token
        //});

        //if(!token) return res.status(400).send({message: "invalid link"});

        await User.updateOne({ _id: id }, { verified: true });
        return res.status(200).send({message: "Account verified successfully! You may close this window and log in."})
    } catch(error) {
        console.log(error);
        return res.status(500).send({message: "Internal server error"});
    }
})


module.exports = router