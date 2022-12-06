class Gameboard {
    constructor(){
        this.squares = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
    }

    clearBoard(){
        this.squares = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
    }

    //this will only be invoked to clear hypothetical moves made while analyzing the gameboard
    //or when resetting the gameboard for a new game
    clearMove(row, col){
        this.squares[row][col] = '';
    }

    findWinner(character){
        return this.findVerticalWinner(character) || 
        this.findHorizontalWinner(character) || 
        this.findDiagonalWinner(character);
    }

    findVerticalWinner(character){
        return (this.squares[0][0] === character && this.squares[1][0] === character && this.squares[2][0] === character)
        || (this.squares[0][1] === character && this.squares[1][1] === character && this.squares[2][1] === character)
        || (this.squares[0][2] === character && this.squares[1][2] === character && this.squares[2][2] === character);
    }

    findHorizontalWinner(character){
        return (this.squares[0][0] === character && this.squares[0][1] === character && this.squares[0][2] === character)
        || (this.squares[1][0] === character && this.squares[1][1] === character && this.squares[1][2] === character)
        || (this.squares[2][0] === character && this.squares[2][1] === character && this.squares[2][2] === character);
    }

    findDiagonalWinner(character){
        return (this.squares[0][0] === character && this.squares[1][1] === character && this.squares[2][2] === character)
        || (this.squares[0][2] === character && this.squares[1][1] === character && this.squares[2][0] === character);
    }

    isSpaceAvailable(row, col){
        return this.squares[row][col].length === 0;
    }

    saveMove(row, column, character){
        if(!this.isSpaceAvailable(row, column))
        {
            return false;
        }
        this.squares[row][column] = character;
        return true;
    }
}
module.exports = Gameboard;