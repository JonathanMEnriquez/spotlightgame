import React, { Component } from 'react';
import GameContext from './GameContext';
import { data } from './contents.json';
import firebase from './firebase';

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
        history: []
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
        const playersRef = firebase.database().ref('players');
        playersRef.once('value', (snap) => {
            const val = snap.val();
            const players = [];
            for (let _id in val) {
                val[_id]['_id'] = _id;
                players.push(val[_id]);
            }
            this.setState({players: players});
        });
    }
    getGameHistory() {
        const gameHistoryRef = firebase.database().ref('games');
        gameHistoryRef.once('value', (snap) => {
            this.setState({history: Object.values(snap.val())});
        });
    }
}
 
export default GameProvider;