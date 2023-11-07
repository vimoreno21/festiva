const express = require('express');
const router = express.Router()
const User = require('../models/userModel')
const Token = require("../models/token")
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto")

router.post('/', async (req, res) => {

    // incoming: name, email, password, avatar
    // outgoing: result

    const { name, email, password, avatar, verified} = req.body;
    const new_user = new User({
        name: name, email: email, password: password, verified: false, avatar: avatar
    })
    );

  const token = await new Token({
    userId: new_user._id,
    token: crypto.randomBytes(32).toString("hex"),
  }).save();

    console.log("in register api!")

    new_user.save()
        .then(() => res.status(200).json({
            message: "Created account successfully! An Email has been sent to your account, please verify to login."
        }))
        .catch(err => res.status(400).json({
            "error": err,
            "message": "Error creating account."
        }))

    const token = await new Token({
        userId: new_user._id,
        token: crypto.randomBytes(32).toString("hex")
    }).save();

    const url = `https://festiva-ucf-3a962394b6e7.herokuapp.com/api/registerVerification/${new_user._id}/verify/${token.token}`;
    await sendEmail(new_user.email, "Verify Email", url)

})


module.exports = router 

    //if(!token) return res.status(400).send({message: "invalid link"});

    await User.updateOne({ _id: id }, { verified: true });
    return res
      .status(200)
      .send({
        message:
          "Account verified successfully! You may close this window and log in.",
      });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
