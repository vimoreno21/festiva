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
      origin: "*",
      methods: ["GET", "POST", "DELETE", "PUT"],
    }
})

class Game {

    constructor(id, host, q_and_a){
        this._id = id;
        this._users = {};
        this._host = host;
        this._round = 0;
        this._q_and_a = q_and_a;
        this._submitted = {}
    }

    getID(){
        return this._id;
    }

    getHost(){
        return this._host;
    }

    setHost(newHost){
        this._host = newHost;
    }

    getUsers(){
        return this._users;
    }

    getUser(key){
        return this._users[key];
    }

    setUser(key, value){
        this._users[key] = value;
    }

    removeUser(key){
        delete this._users[key]
    }

    getRound(){
        return this._round;
    }

    increaseRound(){
        this._round += 1;
    }

    getQ_and_A(){
        return this._q_and_a;
    }

    setQ_and_A(newQ_and_A){
        this._q_and_a = newQ_and_A;
    }

    getSubmitted(){
        return this._submitted;
    }

    addSubmitted(userID, answer){
        this._submitted[userID] = answer;
    }

    resetSubmitted(){
        this._submitted = {};
    }


}

/*
    users = {
        'auto created id from socketio': {
            game_id: 123,
            nickname: 'pepe'
        }
    }
*/
// const users = {};


// const addUser = (socket, game, nickname) => {

//     game.users[socket.id] = nickname;

//     users[socket.id] = {
//         game_id: game.id,
//         nickname: nickname
//     }
// }

// const getUsers = (socket) => {
//     let tmpUsers = {};
//     Object.keys(users).forEach(u => {
//         if(users[u].game_id === users[socket.id].game_id){
//             tmpUsers[u] = users[u].nickname
//         }
//     })

//     return tmpUsers;
// }

const users = {};

const addUser = (gameID, userID) => {
    users[userID] = gameID;
}

const games = {};


// runs every single time the client connects to our server
// gives socket instance for every one of them
io.on('connection', socket => {

    // console.log(`user connected with id: ${socket.id}`)
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

    /*  kahoot <3 */
    // host has selected the quiz they want to host and said they want to play
    socket.on('create-game', (game) => {
        if(game.id && !io.sockets.adapter.rooms.get(game.id)){
            socket.join(game.id);
            // console.log(`user with ID: ${socket.id} created game: ${game.id}`);
            
            //addUser(socket, game, 'host');
            games[game.id] = new Game(game.id, socket.id, game.q_and_a);
            //game.users[socket.id] = 'host';
            
            // console.log(game)
            socket.emit('receieve-users', game.users);
        }
    })

    // on mobile, join game will send info about users joined. frontend web should be able to display
    // those nicknames on the screen.... does this need editing for that to happen? 
    socket.on('join-game', (game, nickname) => {

        if(game.id && io.sockets.adapter.rooms.get(game.id) && nickname && games[game.id].getHost() !== socket.id){
            socket.join(game.id);
            // console.log(`user with ID: ${socket.id} aka '${nickname}' joined game: ${game.id}`);

            const currentGame = games[game.id];
            currentGame.setUser(socket.id, {
                nickname: nickname,
                points: 0
            });
            addUser(game.id, socket.id);
            const tmpUsers = games[game.id].getUsers();
            // console.log(tmpUsers)
 
            socket.emit('receieve-users', tmpUsers);
            socket.to(game.id).emit('receieve-users', tmpUsers);

            // console.log(users)
            // console.log(io.sockets.adapter.rooms.get(game.id))
        }
    })


    // working...
    socket.on('start-round', (game) => {
        // console.log("PRINTING THE GAME OBJ")
        //console.log("hi")
        let currentGame = games[game.id];
        // console.log('---->>>>', currentGame.getUsers())
        if(Object.keys(currentGame.getUsers()).length === 0) return;
        if(currentGame.getRound() >= currentGame.getQ_and_A().length ) return;
        // console.log(currentGame.getRound(), currentGame.getUsers())

        // console.log(currentGame.getQ_and_A()[currentGame.getRound()].question)
        // console.log(currentGame.getQ_and_A()[currentGame.getRound()].answers)
        // console.log("yo what?");
        socket.to(game.id).emit('get-answers', {id: currentGame.getID(), users: currentGame.getUsers(), currentAnswer: currentGame.getQ_and_A()[currentGame.getRound()].answers, currentQuestion:currentGame.getQ_and_A()[currentGame.getRound()].question});
        let remainingTime = 15;
        const intervalID = setInterval(() => {
            if (remainingTime > 0) {
                socket.emit('count-down', remainingTime);
                socket.to(game.id).emit('count-down', remainingTime);
                remainingTime--;
            }
            else if (remainingTime == 0)
            {
                socket.emit('count-down', "Time is up!");
                socket.to(game.id).emit('count-down', "Time is up!");

                currentGame.resetSubmitted();
                currentGame.increaseRound();
                
                socket.emit('get-scores', currentGame.getUsers());
                socket.to(game.id).emit('get-scores', currentGame.getUsers());
                clearInterval(intervalID);
            }
        }, 1000)
    })

    socket.on('submit-answer', (game) => {
        let currentGame = games[game.id];
        if(currentGame){
            currentGame.addSubmitted(socket.id, game.answer);
            let currentUser = currentGame.getUser(socket.id);
            let points = 0;
            // console.log('correct answer:', currentGame.getQ_and_A()[currentGame.getRound()].correct_answer)
            if(currentGame.getQ_and_A()[currentGame.getRound()].correct_answer === game.answer){
                points = game.count > 10 ? 100 : game.count*10;
            }
            
            currentGame.setUser(socket.id, {
                ...currentUser,
                points: currentUser.points + points 
            })

            // console.log('SUBMITED ANSWER!', currentGame.getUser(socket.id))
        }
    })


    // this is not the final spot for this
    // game_pin = String(Math.floor(Math.random() * 5000) + 1000) + '',


    socket.on('disconnect', () => {
        // console.log('user disconnected', socket.id)

        if(users[socket.id]){
    
            games[users[socket.id]].removeUser(socket.id)
            
            socket.to(users[socket.id]).emit('receieve-users', games[users[socket.id]].getUsers());
            delete users[socket.id];
        }

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

const registerVerificationRouter = require('./api/registerVerification');
app.use('/api/registerVerification', registerVerificationRouter);

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
