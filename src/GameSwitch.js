import React, { Component } from 'react';
import GameContext from './GameContext';
import Pregame from './Pregame';
import LiveGame from './LiveGame';
import './GameSwitch.css';
import Postgame from './Postgame';
import Login from './Login';

class GameSwitch extends Component {
    state = {
        imgLoaded: false
    }

    handleImgLoaded() {
        this.setState({imgLoaded: true});
    }

    handleImgError() {
        const game = this.context;
        this.setState({imgLoaded: false});
        game.getNewImage();
    }

    render() {
        const game = this.context;
        const { mode, modes, img, user } = game;
        
        return (
            <div className="main">
                {user && img &&
                    <img className={mode !== modes.PREGAME ? 'game-img' : 'hidden'}
                    src={img.img_src}
                    alt='game img'
                    onLoad={this.handleImgLoaded.bind(this)}
                    onError={this.handleImgError.bind(this)} />
                }

                {!user &&
                    <Login />
                }

                {user && mode === modes.PREGAME && 
                    <Pregame imgLoaded={this.state.imgLoaded} />
                }
                {user && mode === modes.LIVEGAME &&
                    <LiveGame />
                }
                {user && mode === modes.POSTGAME &&
                    <Postgame />
                }
            </div>
        );
    }
}

GameSwitch.contextType = GameContext;
 
export default GameSwitch;