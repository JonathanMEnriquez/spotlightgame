import React, { Component } from 'react';
import './Standings.css';
import GameContext from './GameContext';
import PlayerCard from './PlayerCard';

class Standings extends Component {
    render() {
        const { players, toggleUserPlayingState } = this.context;
        return ( 
            <div className="standings">
                {players.map((e, i) => {
                    if (e.name !== 'No one') {
                        return (
                            <PlayerCard name={e.name} key={i} wins={e.wins} playing={e.playing} togglePlaying={toggleUserPlayingState} />
                        );
                    }
                })}
            </div>
        );
    }
}

Standings.contextType = GameContext;
 
export default Standings;