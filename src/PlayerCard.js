import React, { Component } from 'react';
import Star from './img/star.png';
import StarOff from './img/star_off.png';
import './PlayerCard.css';
import GameContext from './GameContext';

class PlayerCard extends Component {
    generateAverageWin(wins, total) {
        const avg = wins && total 
                ? Math.round(10 * (Number(2) / Number(3))) / 10
                : 0;
        return avg.toString() + ' %';
    }
    render() {
        const props = this.props;
        return (
            <div className="player-card">
                {props.playing &&
                <img src={Star} alt="star" onClick={() => props.togglePlaying(props.name)} />
                }
                {!props.playing &&
                <img src={StarOff} alt="star off" onClick={() => props.togglePlaying(props.name)} />
                }
                <p className="name">{props.name}</p>
                <p>{props.wins}</p>
                {props.allInfo &&
                <p>{this.generateAverageWin(props.wins, props.gamesPlayed)}</p>
                }
            </div>
        );
    }
}

PlayerCard.contextType = GameContext;

export default PlayerCard;