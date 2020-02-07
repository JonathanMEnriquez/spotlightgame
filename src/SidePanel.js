import React, { Component } from 'react';
import './SidePanel.css';
import GameContext from './GameContext';
import MainButton from './MainButton';
import MapIcon from './img/map.png';

class SidePanel extends Component {
    async saveGuesses() {
        const { goToPostGame } = this.props;
        const { updateGuesses } = this.context;
        const inputs = document.getElementsByClassName('guess-input');
        const guesses = {};
        for (let i = 0; i < inputs.length; i++) {
            const child = inputs[i].children;
            const player = child[0].textContent;
            const guess = child[1].value;
            if (!player || !guess) {
                return;
            }
            guesses[player] = guess;
        }
        await updateGuesses(guesses);
        goToPostGame();
    }
    render() {
        const { players } = this.context;
        return (
            <div className="side-panel">
                <div className="map">
                    <img src={MapIcon} alt="Guess" />
                </div>
                <div className="guesses">
                {players.map((p, i) => {
                    if (p.name === 'No one') return null;
                    return (
                    <div className="guess-input" key={i}>
                        <div>{p.name}</div>
                        <input />
                    </div>                    
                    )
                })}
                </div>
                <div className="side-submit">
                    <MainButton
                        actionTitle="Submit" 
                        simple={true} 
                        clickHandler={this.saveGuesses.bind(this)} />
                </div>
            </div>
        );
    }
}

SidePanel.contextType = GameContext;
 
export default SidePanel;