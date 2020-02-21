import React, { useContext, useState } from 'react';
import './Standings.css';
import GameContext from './GameContext';
import PlayerCard from './PlayerCard';
import Expand from './img/expand.png';

const Standings = () => {
    const [showAllInfo, setAllInfo] = useState(false);
    const { players, toggleUserPlayingState, history } = useContext(GameContext);

    const toggleDisplayOfInfo = () => {
        setAllInfo(show => !show);
    }

    const sortAndReturnGameHistory = (history) => {
        return history.sort((a, b) => a.date - b.date);
    }

    const getReigningChampion = (sortedHistory) => {
        for (let i = 0; i < sortedHistory.length; i++) {
            if (sortedHistory[i].winner !== 'SKIPPED') {
                return sortedHistory[i].winner;
            }
        }
        return '';
    }

    const getCurrentWinStreak = (sortedHistory) => {
        const champ = getReigningChampion(sortedHistory);
        let streak = 0;

        for (let i = 0; i < sortedHistory.length; i++) {
            if (sortedHistory[i].winner === 'SKIPPED') {
                continue;
            }
            else if (champ === sortedHistory[i].winner) {
                streak++;
            } else {
                break;
            }
        }

        return streak;
    }

    /*
    currently, the behavior in the GameProvider is to provide History already sorted,
    however, this may not always be the case in the future so this sort is added as insurance.
    */
    const sortedHistory = sortAndReturnGameHistory(history);
    const reigningChamp = getReigningChampion(sortedHistory);
    const currentWinStreak = getCurrentWinStreak(sortedHistory);

    return ( 
        <div className="standings">
            <img className="expand" src={Expand} alt="expand" onClick={toggleDisplayOfInfo.bind(this)} />
            {players.map((e, i) => {
                if (e.name !== 'No one' && e.active) {
                    return (
                        <PlayerCard name={e.name} key={i} 
                        isCurrentChamp={e.name === reigningChamp} 
                        streak={currentWinStreak} 
                        allInfo={showAllInfo} 
                        wins={e.wins} 
                        playing={e.playing} 
                        togglePlaying={toggleUserPlayingState} 
                        gamesPlayed={e.gamesPlayed} />
                    );
                } else {
                    return null;
                }
            })}
        </div>
    );
}
 
export default Standings;