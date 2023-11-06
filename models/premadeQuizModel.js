const mongoose = require('mongoose');

const premadeQuizSchema = new mongoose.Schema({ 
    quiz_name: { 
        type: String, 
        require: true
    },
    quiz_description: {
        type: String, 
        require: true
    },
    number_of_questions: {
        type: Number,
        require: true
    },
    q_and_a: [ // each question, its set of answers, and the correct answer for the question is an object in this array
        { 
            question: {
                type: String,
                require: true
            },
            answers: [String],
            correct_answer: {
                type: String, 
                require: true
            }                
        }
    ]
}, { collection: 'premade_quizzes' });

module.exports = mongoose.model("PremadeQuiz", premadeQuizSchema);