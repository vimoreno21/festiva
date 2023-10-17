require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.CONN_STRING);

const questionSchema = new mongoose.Schema({ 
    question: { 
        type: String, 
        unique: true,
        require: true
    },
    category: { 
        type: String, 
        require: true
    }
}, { collection: 'questions' });

module.exports = mongoose.model("Question", questionSchema);