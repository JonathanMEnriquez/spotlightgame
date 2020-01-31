import React, { Component } from 'react';
import GameContext from './GameContext';
import { data } from './contents.json';
import firebase from './firebase.js';
import Game from './GameClass';

class GameProvider extends Component {
    constructor(props) {
        super(props);
        this.state.user = props.user;
    }

    state = { 
        gameModes: {
            PREGAME: 'pre',
            LIVEGAME: 'live',
            POSTGAME: 'post'
        },
        gameMode: 'pre',
        img: null,
        players: [],
        history: []
     }
    
    componentDidMount() {
        this.loadAssets();
    }

    loadAssets() {
        const { isLoaded } = this.props;
        this.setState({players: [], history: []});
        Promise.all([this.getPlayerInfo(), this.getGameHistory()])
            .then(async snaps => {
                let val = snaps[0].val();
                const players = [];
                for (let _id in val) {
                    val[_id]['_id'] = _id;
                    val[_id].playing = true;
                    players.push(val[_id]);
                }
                this.setState({players: players});

                val = snaps[1].val();
                if (val) {
                    const values = Object.values(val).filter(v => !v.skipped);
                    const sorted = values.sort((a, b) => {
                        const valA = new Date(a.date).getTime();
                        const valB = new Date(b.date).getTime();
                        return valB - valA;
                    });
                    this.setState({history: sorted});
                }

                const img = this.getImageInfo();
                this.setState({img: img});
                isLoaded();
            })
            .catch(err => console.error(err));
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
                    getNewImage: this.getNewImage.bind(this),
                    skipImage: this.skipImage.bind(this),
                    players: this.state.players,
                    history: this.state.history,
                    resetGame: this.resetGame.bind(this),
                    user: this.state.user,
                    setUser: (userInfo) => this.setState({user: userInfo}),
                    toggleUserPlayingState: this.togglePlayingStateOfPlayer.bind(this),
                }}
            >
                {this.props.children}
            </GameContext.Provider>
         );
    }

    togglePlayingStateOfPlayer(name) {
        let arr = this.state.players.map(e => {
            if (e.name === name) {
                e.playing = !e.playing;
            }
            return e;
        });
        this.setState({players: arr});
    }

    getNewImage() {
        const img = this.getImageInfo();
        this.setState({img: img});
    }

    skipImage() {
        const gamesRef = firebase.database().ref(this.state.user + '/games');
        const skippedGame = new Game(this.state.img.caption, this.state.img.img_src, 'SKIPPED', true);
        gamesRef.push(skippedGame);
        this.getNewImage();
    }
    getImageInfo() {
        const entry = data[Math.floor(Math.random() * data.length)];
        if (this.state.history.find(e => e.imgSrc === entry.img_src)) {
            return this.getImageInfo();
        }
        return entry;
        //for testing
        // return data.find(e => e.id === '6ee0d4d8fb5cdc629b1541ed5b677391');
    }
    getPlayerInfo() {
        const playersRef = firebase.database().ref(this.state.user + '/players');
        return playersRef.once('value');
    }
    getGameHistory() {
        const gameHistoryRef = firebase.database().ref(this.state.user + '/games');
        return gameHistoryRef.once('value');
    }
    resetGame() {
        this.loadAssets();
        this.setState({gameMode: this.state.gameModes.PREGAME});
    }
}
 
export default GameProvider;