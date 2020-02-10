import React from 'react';
import Star from './img/star.png';
import StarOff from './img/star_off.png';
import Crown from './img/crown.png';
import CrownOff from './img/crown_off.png';
import './PlayerCard.css';

const PlayerCard = (props) => {
    const { playing, togglePlaying, isCurrentChamp, streak, wins, gamesPlayed, 
        name, allInfo } = props;

    const generateAverageWin = (wins, total) => {
        const avg = wins && total 
                ? Math.round(100 * (Number(wins) / Number(total)))
                : 0;
        return `${avg} %`;
    }

    const generateAlt = (isChamp) => {
        return isChamp ? 'crown' : 'star';
    }

    const getImages = (isChamp) => {
        return isChamp ? [Crown, CrownOff] : [Star, StarOff]; 
    }

    const images = getImages(isCurrentChamp);
    const alt = generateAlt(isCurrentChamp);

    return (
        <div className="player-card">
            {playing &&
            <img src={images[0]} alt={alt} onClick={() => togglePlaying(name)} />
            }
            {!playing &&
            <img src={images[1]} alt={alt + ' off'} onClick={() => togglePlaying(name)} />
            }
            {isCurrentChamp &&
            <span className="streak">{streak}</span>
            }
            <p className="name">{name}</p>
            <p>{wins}</p>
            {allInfo &&
            <p>{generateAverageWin(wins, gamesPlayed)}</p>
            }
        </div>
    );
}

export default PlayerCard;