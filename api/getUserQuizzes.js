// protected route
const express = require('express');
const router = express.Router();
const Quiz = require('../models/quizModel')
const auth = require('../middleware/auth_jwt')

router.post('/', auth, async (req, res) => {

    const id = req.body._id
    results = await Quiz.find({owner_id: id, quiz_name: {$regex: "", $options: "i"}})

    if (results.length > 0)
    {
        return res.status(200).send(results)
    }
    else
    {
        console.log("No quizzes found");
        return res.status(400).send({message: "No quizzes found."})
    }

})

module.exports = router ;
