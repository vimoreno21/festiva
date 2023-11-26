// protected route
const express = require('express');
const router = express.Router();
const PQuiz = require('../models/premadeQuizModel')
const auth = require('../middleware/auth_jwt')

router.post('/', auth, async (req, res) => {


    results = await PQuiz.find({quiz_name: {$regex: "", $options: "i"}})

    if (results.length > 0)
    {
        return res.status(200).send(results)
    }
    else
    {
        return res.status(400).send({message: "No quizzes found."})
    }

})

module.exports = router ;