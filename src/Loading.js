import React, { Component } from "react";
import './Loading.css';
import Bouncing from './img/bouncing.gif';
import GameProvider from './GameProvider';
import GameSwitch from './GameSwitch';
import Spotlight from './img/spotlight.png';
import firebase, { auth } from './firebase';
import Login from "./Login";

class Loading extends Component {
    state = {
        loggedIn: false,
        displayLogin: false,
        user: null,
        isLoaded: false
    }

    componentDidMount() {
        this.checkUserStatus();
    }

    checkUserStatus() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.userIsLoggedIn(user);
            } else {
                this.setState({displayLogin: true});
            }
        });
    }

    userIsLoggedIn(user) {
        this.setState({displayLogin: false});
        this.setState({loggedIn: true});
        this.setState({user: user.uid});
    }

    appIsLoaded() {
        this.setState({isLoaded: true});
    }

    renderGameSwitch() {
        return <GameSwitch />
    }

    render() {
        let gameSwitch;
        if (this.state.isLoaded) {
            gameSwitch = this.renderGameSwitch();
        }
        return (
            <div className="loading-screen">
                {!this.state.isLoaded &&
                <img className={this.state.displayLogin ? 'logo higher' : 'logo'}
                src={Spotlight} alt="logo" />
                }
                {!this.state.displayLogin && !this.state.isLoaded &&
                <div>
                    <p>Loading...</p>
                    <img className="loading" src={Bouncing} alt="loading..." />
                </div>
                }

                {this.state.displayLogin &&
                    <Login setUser={this.userIsLoggedIn.bind(this)} />
                }
                
                {this.state.loggedIn && this.state.user &&
                <GameProvider isLoaded={this.appIsLoaded.bind(this)} user={this.state.user}>
                    {gameSwitch}
                </GameProvider>
                }
            </div>
        );
    }
}

export default Loading;