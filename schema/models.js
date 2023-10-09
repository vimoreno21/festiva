require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.CONN_STRING);

const userSchema = new mongoose.Schema({ 
    name: { 
        type: String, 
        require: true
    }, 
    email: { 
        type: String, 
        unique: true,
        require: true
    }, 
    password: { 
        type: String, 
        require: true
    }
}, { collection: 'users' }) 

const questionSchema = new mongoose.Schema({ 
    question: { 
        type: String, 
        unique: true,
        require: true
    }
}, { collection: 'questions' }) 
  
const User = new mongoose.model("User", userSchema);
const Question = new mongoose.model("Question", questionSchema);

// Example of adding to the database
// const q = new Question({ 
//     question: "How are you today?", 
// }); 
  
// q.save();
