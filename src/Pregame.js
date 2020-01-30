import React, { Component } from 'react';
import GameContext from './GameContext';
import './Pregame.css';
import MainButton from './MainButton';
import Standings from './Standings';
import Spotlight from './img/spotlight.png'

class Pregame extends Component {
    render() { 
        const game = this.context;
        return (
            <div className="pregame">
                <div className="header">
                    <img src={Spotlight} alt="logo" />
                    <h1>BE IN THE SPOTLIGHT</h1><h2>darkmode</h2>
                </div>
                <div className="button-div">
                    <MainButton actionTitle="Start" loading={!this.props.imgLoaded} simple={true} clickHandler={game.setToLiveMode} />
                </div>
                <div className="standings-container">
                    <Standings />
                </div>
                <div className="footer">
                    <p>{this.getCurrentDate()}</p>
                </div>
            </div>
         );
    }

    getCurrentDate() {
        const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const curr = new Date();
        return day[curr.getDay()] + ', ' + month[curr.getMonth()] + ' ' + curr.getDate();
    }
}

Pregame.contextType = GameContext;
 
export default Pregame;