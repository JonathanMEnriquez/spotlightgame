import React, { Component } from 'react';
import './Postgame.css';
import GameContext from './GameContext';
import ButtonGroup from './ButtonGroup';
import Game from './GameClass';
import firebase from './firebase.js';
import MainButton from './MainButton';
import Confetti from './Confetti';

class Postgame extends Component {
    state = {
        winnerDeclared: false,
        congrats: ''
    }
    
    declareWinner(ev) {
        this.setState({winnerDeclared: true});
        const { user, img, players, guesses } = this.context;
        const winner = ev.target.textContent;
        this.startConfetti(winner);
        this.setState({congrats: `Congratulations to ${winner} for earning the spotlight!`});
        const gamesRef = firebase.database().ref(user + '/games');
        const winningPlayerInfo = players.find(e => e.name === winner);
        const newGame = new Game(img.caption, img.img_src, winner, guesses);
        gamesRef.push(newGame);
        this.pushPlayerInfoToDB(winningPlayerInfo, players, user);
    }

    startConfetti(winner) {
        if (winner !== 'No one') {
            const con = new Confetti();
            con.startConfetti();
            setTimeout(() => con.stopConfetti(), 3000);
        }
    }

    pushPlayerInfoToDB(winner, players, user) {
        players.forEach(p => {
            if (p.playing) {
                const playerRef = firebase.database().ref(user + '/players/' + p._id);
                if (p.name === winner.name) {
                    playerRef.update({ wins: p.wins += 1, gamesPlayed: p.gamesPlayed += 1 });
                } else {
                    playerRef.update({ gamesPlayed: p.gamesPlayed += 1 });
                }
                
            }
        });
    }

    setGoogleSrc() {
        const { img } = this.context;
        return `https://www.google.com/maps/embed/v1/place?q=${img.caption}&zoom=7&key=AIzaSyC1aEMKRB6A4_rZq8uwov5Q_uRkYy1TK0Q`;
    }

    getGoogleWidth() {
        const width = window.innerWidth * 0.4;
        return `${width}`;
    }

    getGoogleHeight() {
        const height = window.innerHeight * 0.25;
        return `${height}`;
    }

    render() {
        const { img, players, resetGame, guesses, skipImageAndReload } = this.context;
        const btnGroupEntries = [];
        const sortedGuesses = [];
        Object.values(players).forEach(p => {
            if (p.playing) {
                btnGroupEntries.push({text: p.name, clickHandler: this.declareWinner.bind(this)});
                sortedGuesses.push(guesses[p.name]);
            }
        });

        return (
            <div className="postgame">
                {this.state.winnerDeclared &&
                <p className="small-caption">{img.caption}</p>
                }
                <h2>Answer:</h2>
                {this.state.winnerDeclared && 
                <div className="caption">{this.state.congrats}</div>
                }
                {!this.state.winnerDeclared &&
                <div className="caption">{img.caption}</div>
                }
                {!this.state.winnerDeclared &&
                <p className="skip" onClick={skipImageAndReload}>SKIP IMAGE</p>
                }
                <div className={this.state.winnerDeclared ? 'hidden' : ''}>
                    <ButtonGroup elements={btnGroupEntries} disabled={this.state.winnerDeclared} icon={false} centered={true} />
                    <div className="guesses-caption">
                        {sortedGuesses.map((g, i) => {
                            return <span key={i} className="guess-caption">{g}</span>
                        })}
                    </div>
                </div>
                <div className={!this.state.winnerDeclared ? 'hidden' : 'google'}>
                    <iframe title="google" width={this.getGoogleWidth()} height={this.getGoogleHeight()} frameBorder="0"
                        src={this.setGoogleSrc()} allowFullScreen></iframe>
                </div>
                {this.state.winnerDeclared && 
                <span className="google-warning">If no specific location is displayed, Maps could not locate based on the caption.</span>
                }
                {this.state.winnerDeclared &&
                    <div className="main-button-container">
                        <MainButton actionTitle="Home" simple={false} clickHandler={resetGame} />
                    </div>
                }
            </div>
         );
    }
}

Postgame.contextType = GameContext;
 
export default Postgame;