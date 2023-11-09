const mongoose = require('mongoose');
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
    verified: {
        type: Boolean,
        require: true
    },
    avatar: {
        type: String 
    },
    friend_ids: [{ type : mongoose.Types.ObjectId, ref: 'User' }]
}, { collection: 'users' });

module.exports = mongoose.model("User", userSchema);