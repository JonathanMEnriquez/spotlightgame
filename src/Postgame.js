import React, { Component } from 'react';
import './Postgame.css';
import GameContext from './GameContext';
import ButtonGroup from './ButtonGroup';
import Game from './GameClass';
import firebase, { auth, provider } from './firebase.js';
import MainButton from './MainButton';

class Postgame extends Component {
    state = {
        winnerDeclared: false,
        congrats: ''
    }
    
    declareWinner(ev) {
        this.setState({winnerDeclared: true});
        const winner = ev.target.textContent;
        this.setState({congrats: `Congratulations to ${winner} for the Yuge win!`});
        const { img, players } = this.context;
        const gamesRef = firebase.database().ref('games');
        const winningPlayerInfo = players.find(e => e.name === winner);
        const winnerRef = firebase.database().ref('players/' + winningPlayerInfo._id);
        const newGame = new Game(img.caption, img.img_src, winner);
        gamesRef.push(newGame);
        winnerRef.set({ name: winningPlayerInfo.name,  wins: winningPlayerInfo.wins += 1 });
    }

    render() {
        const { img, players, resetGame } = this.context;
        const btnGroupEntries = [];
        Object.values(players).forEach(p => {
            btnGroupEntries.push({text: p.name, clickHandler: this.declareWinner.bind(this)});
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
                        <MainButton actionTitle="Start Over" simple={false} clickHandler={resetGame} />
                    </div>
                }
            </div>
         );
    }
}

Postgame.contextType = GameContext;
 
export default Postgame;