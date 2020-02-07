class Game {
    constructor(location, imgSrc, winner, guesses, skipped=false) {
        this.location = location;
        this.imgSrc = imgSrc;
        this.winner = winner;
        this.date = new Date().toLocaleDateString();
        this.guesses = guesses;
        this.skipped = skipped;
    }
}

export default Game;