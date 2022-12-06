let GameStatus = require('./GameStatus');

class GameSuccessStatus extends GameStatus {
    static STATUS_PLAYER_WINS = 1;
    static STATUS_COMPUTER_WINS = 2;
    static STATUS_DRAW_GAME = 3;
    static STATUS_GAME_ONGOING = 4;
    static STATUS_GAME_RESTARTED = 5;
    
    static OUTCOME_PLAYER_WINS = `You win!`;
    static OUTCOME_COMPUTER_WINS = `You lose`;
    static OUTCOME_DRAW = `It's a draw`;

    constructor(status, message, lastMove = {})
    {
        super(status, message);
        this.lastMove = lastMove;
    }
}

module.exports = GameSuccessStatus;