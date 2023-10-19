require('dotenv').config();
const mongoose = require('mongoose');
const connection = process.env.CONN_STRING;
mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));