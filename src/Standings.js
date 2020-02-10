import React, { Component } from 'react';
import './Standings.css';
import GameContext from './GameContext';
import PlayerCard from './PlayerCard';
import Expand from './img/expand.png'

class Standings extends Component {
    state = {
        showAllInfo: false
    }

    toggleDisplayOfInfo() {
        this.setState({showAllInfo: !this.state.showAllInfo});
    }
    /*
    currently, the behavior in the GameProvider is to provide History already sorted,
    however, this may not always be the case in the future so this sort is added as insurance.
    */
    sortAndReturnGameHistory(history) {
        return history.sort((a, b) => a.date - b.date);
    }

    getReigningChampion(sortedHistory) {
        return sortedHistory[0].winner;
    }

    currentWinStreak(sortedHistory) {
        const champ = this.getReigningChampion(sortedHistory);
        let streak = 0;

        while (streak < sortedHistory.length) {
            if (champ === sortedHistory[streak].winner) {
                streak++;
            } else {
                break;
            }
        }

        return streak;
    }

    render() {
        const { players, toggleUserPlayingState, history } = this.context;
        const sortedHistory = this.sortAndReturnGameHistory(history);
        const reigningChamp = this.getReigningChampion(sortedHistory);
        const currentWinStreak = this.currentWinStreak(sortedHistory);
        return ( 
            <div className="standings">
                <img className="expand" src={Expand} alt="expand" onClick={this.toggleDisplayOfInfo.bind(this)} />
                {players.map((e, i) => {
                    if (e.name !== 'No one') {
                        return (
                            <PlayerCard name={e.name} isCurrentChamp={e.name === reigningChamp} streak={currentWinStreak} allInfo={this.state.showAllInfo} key={i} wins={e.wins} playing={e.playing} togglePlaying={toggleUserPlayingState} gamesPlayed={e.gamesPlayed} />
                        );
                    } else {
                        return null;
                    }
                })}
            </div>
        );
    }
}

Standings.contextType = GameContext;
 
export default Standings;