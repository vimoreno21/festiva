require('dotenv').config();
const { ObjectId } = require('mongodb');
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
}, { collection: 'users' });
const User = new mongoose.model("User", userSchema);


const questionSchema = new mongoose.Schema({ 
    question: { 
        type: String, 
        unique: true,
        require: true
    }
}, { collection: 'questions' });
const Question = new mongoose.model("Question", questionSchema);


const savedGamesSchema = new mongoose.Schema({ 
    user_id: { 
        type: mongoose.Types.ObjectId, 
        ref: "User",
        require: true
    },
    game_info: {
        type: String,
        require: true
    }
}, { collection: 'saved_games' });
  
const SavedGameInfo = new mongoose.model("SavedGameInfo", savedGamesSchema);
