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
        // gamesRef.push(newGame);
        // this.pushPlayerInfoToDB(winningPlayerInfo, players, user);
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

    render() {
        const { img, players, resetGame } = this.context;
        const btnGroupEntries = [];
        Object.values(players).forEach(p => {
            if (p.playing) {
                btnGroupEntries.push({text: p.name, clickHandler: this.declareWinner.bind(this)});
            }
        });

        return (
            <div className="postgame">
                <h2>Answer:</h2>
                {this.state.winnerDeclared && 
                <div className="caption">{this.state.congrats}</div>
                }
                {!this.state.winnerDeclared &&
                <div className="caption">{img.caption}</div>
                }
                <h2>Winner:</h2>
                <ButtonGroup elements={btnGroupEntries} disabled={this.state.winnerDeclared} icon={false} centered={true} />
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