// protected route
const express = require('express');
const router = express.Router();
const Quiz = require('../models/quizModel');
const auth = require('../middleware/auth_jwt');

router.post('/', auth, async (req, res) => {
    try {
        const { owner_id, quiz_name, quiz_description, number_of_questions, q_and_a } = req.body;
        const new_quiz = new Quiz({
            owner_id,
            quiz_name,
            quiz_description,
            number_of_questions,
            q_and_a,
        });

        const savedQuiz = await new_quiz.save();

        res.status(200).json({
            message: "Quiz created successfully",
            quizId: savedQuiz._id, // Assuming you have an _id field in your Quiz model
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
            message: "Error creating quiz.",
        });
    }
});

module.exports = router;
