require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { instrument } = require('@socket.io/admin-ui')
const http = require('http');
const { Server } = require('socket.io')

require('./database/database');

const path = require('path');
const PORT = process.env.PORT || 5000;
const app = express();

// socket.io
const serverGame = http.createServer(app);
const io = new Server(serverGame, {
    cors: {
      origin: ["http://localhost:3000", "https://admin.socket.io", "https://festiva-ucf-3a962394b6e7.herokuapp.com"],
      methods: ["GET", "POST", "DELETE", "PUT"],
    }
})

/*
    users = {
        'auto created id from socketio': {
            game_id: 123,
            nickname: 'pepe'
        }
    }
*/
const users = {};


const addUser = (socket, game, nickname) => {

    game.users[socket.id] = nickname;

    users[socket.id] = {
        game_id: game.id,
        nickname: nickname
    }
}

const getUsers = (socket) => {
    let tmpUsers = {};
    Object.keys(users).forEach(u => {
        if(users[u].game_id === users[socket.id].game_id){
            tmpUsers[u] = users[u].nickname
        }
    })

    return tmpUsers;
}


// runs every single time the client connects to our server
// gives socket instance for every one of them
io.on('connection', socket => {

    console.log(`user connected with id: ${socket.id}`)
    socket.on('send-message', (message, room) => {
        if (room === '') {
            // take current socket, and from that socket, broadcast message to 
            // every socket that is not the current one
            socket.broadcast.emit('receieve-message', message)
        }
        // if we do have a room, send message just to that room
        else {
            // .to already sends to everyone except yourself like broadcast does :)
            socket.to(room).emit('receieve-message', message)
        }
    })

    socket.on('join-room', room => {
        // join room
        socket.join(room)
        console.log(`user with ID: ${socket.id} joined room: ${room}`)
    })

    /*  kahoot <3 */
    socket.on('create-game', (game) => {
        if(game.id && !io.sockets.adapter.rooms.get(game.id)){
            socket.join(game.id);
            console.log(`user with ID: ${socket.id} created game: ${game.id}`);
            
            addUser(socket, game, 'host');
            game.users[socket.id] = 'host';

            socket.emit('receieve-users', game);
            socket.to(game.id).emit('receieve-users', game);
            console.log(users)
        }
    })

    socket.on('join-game', (game, nickname) => {

        if(game.id && io.sockets.adapter.rooms.get(game.id) && nickname && users[socket.id]?.nickname !== 'host'){
            socket.join(game.id);
            console.log(`user with ID: ${socket.id} aka '${nickname}' joined game: ${game.id}`);

            addUser(socket, game, nickname);
            const tmpUsers = getUsers(socket);
 
            socket.emit('receieve-users', {id: game.id, users: tmpUsers});
            socket.to(game.id).emit('receieve-users', {id: game.id, users: tmpUsers});

            console.log(users)
            console.log(io.sockets.adapter.rooms.get(game.id))
        }
    })

    // start with create Game, store game info in Db

    // in MyQuiz component
    // socket.on("init-game", (newGame, newLeaderboard) => {
    //     game = JSON.parse(JSON.stringify(newGame))
    //     // leaderboard = JSON.parse(JSON.stringify(newLeaderboard))
    //     socket.join(game.pin)
    //     hostId = socket.id
    //     console.log(
    //       "Host with id " + socket.id + " started game and joined room: " + game.pin
    //     )
    // })

    // in Join Game component
    // socket.on("add-player", (user, socketId, pin, cb) => {
    //     if (game.pin === pin) {
    //       addPlayer(user.userName, socketId)
    //       // console.log(game._id)
    //       cb("correct", user._id, game._id)
    //       socket.join(game.pin)
    //       console.log(
    //         "Student " +
    //           user.userName +
    //           " with id " +
    //           socket.id +
    //           " joined room " +
    //           game.pin
    //       )
    //       let player = getPlayer(socketId)
    //       io.emit("player-added", player)
    //     } else {
    //       cb("wrong", game._id)
    //     }
    // })

    // this is not the final spot for this
    // game_pin = String(Math.floor(Math.random() * 5000) + 1000) + '',
    // console.log()

    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id)

        const tmpUsers = getUsers(socket);
        const game = {
            id: users[socket.id]?.game_id || '',
            users: tmpUsers
        }

        delete users[socket.id];
        delete game.users[socket.id];
        console.log(game)

        socket.emit('receieve-users', game);
        socket.to(game.id).emit('receieve-users', game);
        console.log(users)
    })
})

// socket.io admin ui
instrument(io, { auth: false })

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

// API routes
const loginRouter = require('./api/login');
app.use('/api/login', loginRouter);

const registerRouter = require('./api/register');
app.use('/api/register', registerRouter);

const createQuizRouter = require('./api/createQuiz');
app.use('/api/createQuiz', createQuizRouter);

const searchPremadeQuizRouter = require('./api/searchPremadeQuiz');
app.use('/api/searchPremadeQuiz', searchPremadeQuizRouter);

const searchUserQuizRouter = require('./api/searchUserQuiz');
app.use('/api/searchUserQuiz', searchUserQuizRouter);

const getPremadeQuizzesRouter = require('./api/getPremadeQuizzes');
app.use('/api/getPremadeQuizzes', getPremadeQuizzesRouter);

const getUserQuizzesRouter = require('./api/getUserQuizzes');
app.use('/api/getUserQuizzes', getUserQuizzesRouter);


serverGame.listen(PORT, () => 
{
    console.log('Server listening on port ' + PORT);
}); 

