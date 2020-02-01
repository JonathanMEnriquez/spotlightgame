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

    render() {
        const { players, toggleUserPlayingState } = this.context;
        return ( 
            <div className="standings">
                <img className="expand" src={Expand} alt="expand" onClick={this.toggleDisplayOfInfo.bind(this)} />
                {players.map((e, i) => {
                    if (e.name !== 'No one') {
                        return (
                            <PlayerCard name={e.name} allInfo={this.state.showAllInfo} key={i} wins={e.wins} playing={e.playing} togglePlaying={toggleUserPlayingState} gamesPlayed={e.gamesPlayed} />
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