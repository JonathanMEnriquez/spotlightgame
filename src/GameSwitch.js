import React, { Component } from 'react';
import GameContext from './GameContext';
import Pregame from './Pregame';
import LiveGame from './LiveGame';
import './GameSwitch.css';
import Postgame from './Postgame';

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
        return (
            <div className="main">
                <img className={game.mode !== game.modes.PREGAME ? 'game-img' : 'hidden'}
                    src={game.img.img_src}
                    alt='game img'
                    onLoad={this.handleImgLoaded.bind(this)}
                    onError={this.handleImgError.bind(this)} />

                {game.mode === game.modes.PREGAME && 
                    <Pregame imgLoaded={this.state.imgLoaded} />
                }
                {game.mode === game.modes.LIVEGAME &&
                    <LiveGame />
                }
                {game.mode === game.modes.POSTGAME &&
                    <Postgame />
                }
            </div>
        );
    }
}

GameSwitch.contextType = GameContext;
 
export default GameSwitch;