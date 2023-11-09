const { ObjectId } = require('mongodb');
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

// comment out module.exports line if adding something to DB with following lines!!!!
// make sure to uncomment it when you commit to main pls!

// also add require('./models/quizModel.js') to index.js, at the top of the file is fine. 
// pls comment out/delete that line when ur done adding something 
// to the db w this model. also make sure ur running the backend or else adding it in the DB wont work. ty<3

//const quiz = mongoose.model("Quiz", quizSchema)
// Creates two new quizzes owner_id should correspond to an existing user in the DB.
// quiz.create({
//     "owner_id": new ObjectId('6549c7f004719081b6c423fa'),
//     "quiz_name":"Ricardo Quiz 1",
//     "quiz_description":"Ricardo account Quiz.!!",
//     "number_of_questions":5,
//     "q_and_a":[{"question":"What?","answers":["No","eh","Web","bleh"],"correct_answer":"bleh"},{"question":"Is Victoria?","answers":["Perhaps","No","Maybe","what kind of question is this lol of course she is!!! :)"],"correct_answer":"what kind of question is this lol of course she is!!! :)"},{"question":"What role does Desa?","answers":["PM","Mobile","Frontend Web","Database"],"correct_answer":"Frontend Web"},{"question":"What does Ricardo?","answers":["API","Mobile","Web","DB"],"correct_answer":"API"},{"question":"What role does Melanie and Huda share?","answers":["API","Database","Mobile","They don't share any roles"],"correct_answer":"They don't share any roles"}]
// })
// quiz.create({
//     "owner_id": new ObjectId('6549c7f004719081b6c423fa'),
//     "quiz_name":"Ricardo Quiz 2",
//     "quiz_description":"Ricardo account Quiz TWO (the questions and answers are same as ricardo quiz 1!!!",
//     "number_of_questions":5,
//     "q_and_a":[{"question":"What?","answers":["No","eh","Web","bleh"],"correct_answer":"bleh"},{"question":"Is Victoria?","answers":["Perhaps","No","Maybe","what kind of question is this lol of course she is!!! :)"],"correct_answer":"what kind of question is this lol of course she is!!! :)"},{"question":"What role does Desa?","answers":["PM","Mobile","Frontend Web","Database"],"correct_answer":"Frontend Web"},{"question":"What does Ricardo?","answers":["API","Mobile","Web","DB"],"correct_answer":"API"},{"question":"What role does Melanie and Huda share?","answers":["API","Database","Mobile","They don't share any roles"],"correct_answer":"They don't share any roles"}]
// })

// check db w commands when ur done to make sure u added the desired stuff
