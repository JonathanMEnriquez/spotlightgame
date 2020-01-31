class Game {
    constructor(location, imgSrc, winner, skipped=false) {
        this.location = location;
        this.imgSrc = imgSrc;
        this.winner = winner;
        this.date = new Date().toLocaleDateString();
        this.skipped = skipped;
    }
}

export default Game;