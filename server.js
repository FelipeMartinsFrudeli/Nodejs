import express from 'express';
import http from 'http';
import createGame from './public/createGame.js';

//import socketio from 'socket.io';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app)

//const sockets = socketio(server)
const sockets = new Server(server);

app.use(express.static('public'))

const game = createGame();
game.addPlayer({ playerId: 'player1', posX: 0, posY: 0 })
game.addFruit({ fruitId: 'fruit1', posX: 3, posY: 3 })

sockets.on('connection', (socket) => {
    const playerId = socket.id
    console.log(playerId);

    socket.emit('setup', game.state)
})

server.listen(3000, () => {
    console.log(`port: 3000`)
})