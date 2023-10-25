require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require('./database/database');

const path = require('path');
const PORT = process.env.PORT || 5000;
const app = express();




// socket.io

//idk if this port is right...
const ioPort = process.env.PORT || 8080;
const io = require('socket.io')(ioPort, {
    cors: {
        origin: ['http://localhost:3000']
    }
});

// runs every single time the client connects to our server
//gives socket instance for every one of them
io.on('connection', socket => {
    console.log(socket.id)
    socket.on('send-message', (message) => {
        console.log(message)

        // sends message to all other clients (including the one that made the request in the first place)
        //, every other socket out there
        io.emit('receieve-message', message)
    })
})



app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) =>
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});


if (process.env.NODE_ENV === 'production')
{
    // Set static folder
    app.use(express.static('frontend/build'));
    app.get('*', (req, res) =>
    {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}

// API
const loginRouter = require('./api/login');
app.use('/api/login', loginRouter);

const registerRouter = require('./api/register');
app.use('/api/register', registerRouter);


app.listen(PORT, () =>
{
    console.log('Server listening on port ' + PORT);
}); 

