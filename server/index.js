const express = require("express");
const cors = require("cors");
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('client'));

const tictactoeController = require('./tictactoeController');

//tic-tac-toe routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../client/index.html')));
app.post('/api/tictactoe', tictactoeController.savePlayerMove);
app.delete('/api/tictactoe', tictactoeController.startGameOver);

app.listen(5005, () => console.log("Server running on 5005"));
