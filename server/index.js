const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const controller = require('./controller')
const tictactoeController = require('./tictactoeController');
const madlibController = require('./madlibController');
const introductionController = require('./introductionController');

//default routes
app.get("/api/compliment", controller.getCompliment);
app.get("/api/fortune", controller.getFortune);

//introduction routes
app.get('/api/introduction', introductionController.getName);
app.post('/api/introduction', introductionController.saveName);
app.put('/api/introduction', introductionController.updateName);

//tic-tac-toe routes
app.post('/api/tictactoe', tictactoeController.savePlayerMove);
app.delete('/api/tictactoe', tictactoeController.startGameOver);

//madlib routes
app.get('/api/madlibs/:madlib', madlibController.getMadlib);
app.post('/api/madlibs/:madlib/answers', madlibController.saveAnswers);

app.listen(4000, () => console.log("Server running on 4000"));
