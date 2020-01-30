import React, { Component } from 'react';
import GameContext from './GameContext';
import './Pregame.css';
import MainButton from './MainButton';
import Standings from './Standings';
import Spotlight from './img/spotlight.png';
import Close from './img/cross.png';

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
                <div className={this.state.showHistory ? 'history' : 'hidden'}>
                    <img className="close" src={Close} alt="x" onClick={this.hideHistory.bind(this)} />
                    <h3>Previous Results</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Location</th>
                                <th>Winner</th>
                                <th>Source</th>
                            </tr>
                        </thead>
                        <tbody>
                        {history && history.map((en, i) => {
                        return (
                            <tr key={i} className="record">
                                <td>{en.date}</td>
                                <td>{en.location}</td>
                                <td>{en.winner}</td>
                                <td><a href={en.imgSrc}>Link</a></td>
                            </tr>
                        )
                        })}
                        </tbody>
                    </table>
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

    hideHistory() {
        this.setState({showHistory: false});
    }

    showHistory() {
        this.setState({showHistory: true});
    }

    login(setUser) {
        // auth.createUserWithEmailAndPassword()        
        // auth.getRedirectResult()
        //     .then(result => {
        //         console.log(result);
        //         // setUser(result.user);
        //     });
    }
}

Pregame.contextType = GameContext;
 
export default Pregame;