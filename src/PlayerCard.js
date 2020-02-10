import React, { Component } from 'react';
import Star from './img/star.png';
import StarOff from './img/star_off.png';
import Crown from './img/crown.png';
import CrownOff from './img/crown_off.png';
import './PlayerCard.css';
import GameContext from './GameContext';

class PlayerCard extends Component {
    generateAverageWin(wins, total) {
        const avg = wins && total 
                ? Math.round(100 * (Number(wins) / Number(total)))
                : 0;
        return avg.toString() + ' %';
    }
    generateAlt(isChamp) {
        return isChamp ? 'crown' : 'star';
    }
    getImages(isChamp) {
        return isChamp ? [Crown, CrownOff] : [Star, StarOff]; 
    }
    render() {
        const props = this.props;
        const images = this.getImages(props.isCurrentChamp);
        const alt = this.generateAlt(props.isCurrentChamp);
        return (
            <div className="player-card">
                {props.playing &&
                <img src={images[0]} alt={alt} onClick={() => props.togglePlaying(props.name)} />
                }
                {!props.playing &&
                <img src={images[1]} alt={alt + ' off'} onClick={() => props.togglePlaying(props.name)} />
                }
                {props.isCurrentChamp &&
                <span className="streak">{props.streak}</span>
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