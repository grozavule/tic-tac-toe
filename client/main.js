const BASE_URL = `http://localhost:4000`;
const PLAYER_CHARACTER = 'X';
const COMPUTER_CHARACTER = 'O';

//these status constants need to match those in server/classes/GameSuccessStatus.js
const STATUS_PLAYER_WINS = 1;
const STATUS_COMPUTER_WINS = 2;
const STATUS_DRAW_GAME = 3;
const STATUS_GAME_ONGOING = 4;
const STATUS_GAME_RESTARTED = 5;

const complimentBtn = document.getElementById("complimentButton");
const fortuneBtn = document.getElementById("fortuneButton");
const boardSpaces = document.querySelectorAll('.ttt-board-cell');
const ticTacToeBtns = document.querySelectorAll('.ttt-board-space');
const controlBtns = document.querySelector('#control-buttons');
const startOverBtn = document.querySelector('#btn-start-over');

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};
const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

const disableAllSpaces = () => {
    ticTacToeBtns.forEach(btn => {
        btn.disabled = true;
    });
};
const enableAllSpaces = () => {
    ticTacToeBtns.forEach(btn => {
        btn.removeAttribute('disabled');
    })
}

const hideControlButtons = () => {
    controlBtns.classList.add('hidden');
}

const resetGameboard = () => {
    controlBtns.classList.add('hidden');
    boardSpaces.forEach(space => {
        space.textContent = '';
        let button = document.createElement('button');
        button.classList.add('ttt-board-space');
        button.addEventListener('click', savePlayerMove);
        space.appendChild(button);
    });
}

const saveComputerMove = move => {
    let { row, col } = move;
    let computerMove = document.querySelector(`div[data-cell-ref='${row}-${col}']`);
    computerMove.textContent = COMPUTER_CHARACTER;
}

const savePlayerMove = (e) => {
    let cellReference = e.target.parentNode.getAttribute('data-cell-ref');

    let cell = e.target.parentNode;
    cell.textContent = PLAYER_CHARACTER;

    let move = {
        'cell': cellReference,
        'character': PLAYER_CHARACTER
    }

    //makes a post call to the server to save the player's move
    //in response, the server should send back the computer's move
    axios.post(`${BASE_URL}/api/tictactoe`, move)
    .then(res => {
        switch(res.data.status)
        {
            case STATUS_DRAW_GAME:
            case STATUS_PLAYER_WINS:
                showControlButtons();
                disableAllSpaces();
                alert(res.data.message);
                break;
            case STATUS_COMPUTER_WINS:
                saveComputerMove(res.data.lastMove);
                disableAllSpaces();
                showControlButtons();
                alert(res.data.message);
                break;
            case STATUS_GAME_ONGOING:
                saveComputerMove(res.data.lastMove);
                break;
        }
    })
    .catch(error => {        
        console.log(error);
    });
}

const showControlButtons = () => {
    controlBtns.classList.remove('hidden');
}

const startGameOver = () => {
    axios.delete(`${BASE_URL}/api/tictactoe`)
    .then(res => {
        resetGameboard();
    })
    .catch(error => {
        console.log(error);
    });
}

ticTacToeBtns.forEach(button => {
    button.addEventListener('click', savePlayerMove);
});

complimentBtn.addEventListener('click', getCompliment);
fortuneBtn.addEventListener('click', getFortune);
startOverBtn.addEventListener('click', startGameOver);