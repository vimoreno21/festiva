const express = require('express');
const router = express.Router();
const Quiz = require('../models/quizModel')

router.post('/', async (req, res) => {

    const name = req.body.quiz_name;
    console.log(name)

    results = await Quiz.find({quiz_name: {$regex: name, $options: "i"}})

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