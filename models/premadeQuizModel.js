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

// comment out module.exports line if adding something to DB with following lines!!!!
// make sure to uncomment it when you commit to main pls!

// also add require('./models/premadeQuizModel.js') to index.js, at the top of the file is fine. 
// pls comment out/delete that line when ur done adding something 
// to the db w this model. also make sure ur running the backend or else adding it in the DB wont work. ty<3

//const pquiz = mongoose.model("PremadeQuiz", premadeQuizSchema)

// const pquiz = mongoose.model("PremadeQuiz", premadeQuizSchema)
// // Create a new house
// pquiz.create({
//    "quiz_name":"Team Quiz 2","quiz_description":"Quiz about team member roles<3 woo hoo","number_of_questions":5,"q_and_a":[{"question":"What role does Arian have?","answers":["Database","API","Frontend Web","Mobile"],"correct_answer":"Mobile"},{"question":"Is Victoria project manager?","answers":["Perhaps","No","Maybe","what kind of question is this lol of course she is!!! :)"],"correct_answer":"what kind of question is this lol of course she is!!! :)"},{"question":"What role does Desa and Victoria share?","answers":["PM","Mobile","Frontend Web","Database"],"correct_answer":"Frontend Web"},{"question":"What role does Ricardo have?","answers":["API","Mobile","Web","DB"],"correct_answer":"API"},{"question":"What role does Melanie and Huda share?","answers":["API","Database","Mobile","They don't share any roles"],"correct_answer":"They don't share any roles"}]
// })

// check db w commands when ur done to make sure u added the desired stuff