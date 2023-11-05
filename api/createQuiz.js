const express = require('express');
const router = express.Router();
const Quiz = require('../models/quizModel')

router.post('/', async (req, res) => {

    const { owner_id, quiz_name, quiz_description, number_of_questions, q_and_a} = req.body;
    const new_quiz = new Quiz({
        owner_id: owner_id, quiz_name: quiz_name, quiz_description: quiz_description, number_of_questions: number_of_questions, q_and_a: q_and_a
    })

    new_quiz.save()
        .then(() => res.status(200).json({
            message: "Quiz created successfully"
        }))
        .catch(err => res.status(400).json({
            "error": err,
            "message": "Error creating quiz."
        }))


})

module.exports = router ;