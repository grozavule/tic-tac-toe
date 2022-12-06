class GameStatus {
    static ERROR_SPACE_ALREADY_TAKEN = `The space you've chosen was already taken`;

    constructor(status, message)
    {
        this.status = status;
        this.message = message;
    }
}

module.exports = GameStatus;