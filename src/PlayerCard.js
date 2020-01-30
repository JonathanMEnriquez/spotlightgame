import React, { Component } from 'react';
import Star from './img/star.png';
import './PlayerCard.css';
import GameContext from './GameContext';

class PlayerCard extends Component {
    render() {
        const props = this.props;
        return (
            <div className="player-card">
                <img src={Star} alt="star" />
                <p>{props.name}</p>
                <p>{props.wins}</p>
            </div>
        );
    }
}

PlayerCard.contextType = GameContext;

export default PlayerCard;