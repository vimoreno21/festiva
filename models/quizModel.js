const mongoose = require('mongoose');

// in the quizzes collection, there can be multiple Quiz entries with the same owner_id
const quizSchema = new mongoose.Schema({ 
    owner_id: { 
        type: mongoose.Types.ObjectId, 
        ref: "User",
        require: true
    },
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
}, { collection: 'quizzes' });

module.exports = mongoose.model("Quiz", quizSchema);