import React, { Component } from 'react';
import GameContext from './GameContext';
import { data } from './contents.json';
import firebase, { auth, provider } from './firebase.js';

class GameProvider extends Component {
    state = { 
        gameModes: {
            PREGAME: 'pre',
            LIVEGAME: 'live',
            POSTGAME: 'post'
        },
        gameMode: 'pre',
        img: this.getImageInfo(),
        players: [],
        history: [],
        user: null,
     }
    
    componentDidMount() {
        this.getPlayerInfo();
        this.getGameHistory();
    }

    render() { 
        return ( 
            <GameContext.Provider
                value={{
                    modes: this.state.gameModes,
                    mode: this.state.gameMode,
                    setToPregameMode: () => this.setState({gameMode: this.state.PREGAME}),
                    setToLiveMode: () => this.setState({gameMode: this.state.gameModes.LIVEGAME}),
                    setToPostgameMode: () => this.setState({gameMode: this.state.gameModes.POSTGAME}),
                    img: this.state.img,
                    getNewImage: () => this.setState({img: this.getImageInfo()}),
                    players: this.state.players,
                    history: this.state.history,
                    resetGame: this.resetGame.bind(this),
                    user: this.state.user,
                    setUser: (userInfo) => this.setState({user: userInfo}), 
                }}
            >
                {this.props.children}
            </GameContext.Provider>
         );
    }
    getImageInfo() {
        // const entry = data[Math.floor(Math.random() * data.length)];
        // if (this.state.history.find(e => e.imgSrc === entry.img_src)) {
        //     this.getImageInfo();
        // }
        //for testing
        return data.find(e => e.id === '6ee0d4d8fb5cdc629b1541ed5b677391');
    }
    getPlayerInfo() {
        if (this.state.user) {
            const playersRef = firebase.database().ref('players');
            playersRef.on('value', (snap) => {
                const val = snap.val();
                const players = [];
                for (let _id in val) {
                    val[_id]['_id'] = _id;
                    players.push(val[_id]);
                }
                this.setState({players: players});
            });
        }
    }
    getGameHistory() {
        if (this.state.user) {
            const gameHistoryRef = firebase.database().ref('games');
            gameHistoryRef.on('value', (snap) => {
                const val = snap.val();
                if (val) {
                    const values = Object.values(snap.val());
                    const sorted = values.sort((a, b) => {
                        const valA = new Date(a.date).getTime();
                        const valB = new Date(b.date).getTime();
                        return valB - valA;
                    });
                    this.setState({history: sorted});
                }
            });
        }
    }
    resetGame() {
        this.setState({gameMode: this.state.gameModes.PREGAME, players: [], history: [], img: this.getImageInfo()});
        // this.getPlayerInfo();
        // this.getGameHistory();
    }
}
 
export default GameProvider;