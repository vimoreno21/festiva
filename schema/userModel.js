require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.CONN_STRING);

const userSchema = mongoose.Schema({ 
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
    },
    avatar: {
        type: String, 
        require: true
    }, 
    friend_ids: [{ type : mongoose.Types.ObjectId, ref: 'User' }]
}, { collection: 'users' });

module.exports = mongoose.model("User", userSchema);