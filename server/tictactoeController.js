let Gameboard = require('./classes/Gameboard');
let TicTacToePlayer = require('./classes/TicTacToePlayer');
let GameStatus = require('./classes/GameStatus');
let GameSuccessStatus = require('./classes/GameSuccessStatus');

let gameboard = new Gameboard();
let computerPlayer = new TicTacToePlayer(gameboard);

const parseCellReference = reference => { 
    return { 
        row: +reference.charAt(0),
        col: +reference.charAt(2)
    }
}

module.exports = {
    savePlayerMove: (req, res) => {
        let { cell, character } = req.body;
        let { row, col } = parseCellReference(cell);
        
        let isSpaceAvailable = gameboard.saveMove(row, col, character);
        let playerWins = gameboard.findWinner(TicTacToePlayer.OPPONENT_CHARACTER);

        //if the player somehow selected a spot that has already been taken...
        if(!isSpaceAvailable){
            console.log('tictactoeController.js - 26', gameboard);
            res.status(400).send(GameStatus.ERROR_SPACE_ALREADY_TAKEN);
            return;
        }
        //if the player's move wins the game...
        else if(playerWins)
        {
            let status = new GameSuccessStatus(GameSuccessStatus.STATUS_PLAYER_WINS, GameSuccessStatus.OUTCOME_PLAYER_WINS, { row, col });
            res.status(200).send(status);
            return;
        }
        //otherwise, it is the computer's turn
        else
        {
            let move = computerPlayer.makeMove(gameboard);
            if(move.row < 0 || move.col < 0)
            {
                let status = new GameSuccessStatus(GameSuccessStatus.STATUS_DRAW_GAME, GameSuccessStatus.OUTCOME_DRAW);
                res.status(200).send(status);
                return;
            }
            gameboard.saveMove(move.row, move.col, TicTacToePlayer.COMPUTER_CHARACTER);
            console.log(gameboard);

            //if the computer's last move won the game, return the move to the frontend 
            //and send back a unique status to indicate that the game is over
            if(gameboard.findWinner(TicTacToePlayer.COMPUTER_CHARACTER))
            {
                //res.status(207).send(move);
                let status = new GameSuccessStatus(GameSuccessStatus.STATUS_COMPUTER_WINS, GameSuccessStatus.OUTCOME_COMPUTER_WINS, move);
                res.status(200).send(status);
                return;
            }
            //if neither the player nor the computer has won, return the computer's last move and keep playing
            else
            {
                let status = new GameSuccessStatus(GameSuccessStatus.STATUS_GAME_ONGOING, ``, move);
                res.status(200).send(status);
            }
        }
    },
    startGameOver: (req, res) => {
        gameboard.clearBoard();
        let status = new GameSuccessStatus(GameSuccessStatus.STATUS_GAME_RESTARTED, ``);
        res.status(200).send(status);
    }
}