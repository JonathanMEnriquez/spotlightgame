class Game {
    constructor(location, imgSrc, winner) {
        this.location = location;
        this.imgSrc = imgSrc;
        this.winner = winner;
        this.date = new Date();
    }
}

export default Game;