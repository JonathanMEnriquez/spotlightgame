import React, { Component } from 'react';
import GameContext from './GameContext';
import './Pregame.css';
import MainButton from './MainButton';
import Standings from './Standings';
import Spotlight from './img/spotlight.png';
import History from './History';

class Pregame extends Component {
    state = {
        showHistory: false,
        showLogin: false
    }
    
    render() { 
        const { setToLiveMode, history } = this.context;
        const { imgLoaded } = this.props;

        return (
            <div className="pregame">
                <div className="header">
                    <img src={Spotlight} alt="logo" />
                    <h1>BE IN THE SPOTLIGHT</h1><h2>darkmode</h2>
                </div>
                <div className={this.state.showHistory ? 'hidden' : 'pregame-grid'}>
                    <div className="button-div">
                        <MainButton actionTitle="Start" loading={!imgLoaded} simple={true} clickHandler={setToLiveMode} />
                        <br/>
                        <MainButton actionTitle="History" loading={!imgLoaded} simple={true} clickHandler={this.showHistory.bind(this)} />
                    </div>
                    <div className="standings-container">
                        <Standings />
                    </div>
                    <div className="footer">
                        <p>{this.getCurrentDate()}</p>
                    </div>
                </div>
                <History history={history} shouldDisplay={this.state.showHistory} hideHistory={this.hideHistory.bind(this)} />
            </div>
         );
    }

    getCurrentDate() {
        const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const curr = new Date();
        return day[curr.getDay()] + ', ' + month[curr.getMonth()] + ' ' + curr.getDate();
    }

    hideHistory() {
        this.setState({showHistory: false});
    }

    showHistory() {
        this.setState({showHistory: true});
    }
}

Pregame.contextType = GameContext;
 
export default Pregame;