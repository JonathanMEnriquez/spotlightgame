import React, { Component } from 'react';
import GameContext from './GameContext';
import gears from './img/gears.png';
import globe from './img/globe.png';
import cancel from './img/cancel.png';
import './LiveGame.css';
import ButtonGroup from './ButtonGroup';

class LiveGame extends Component {
    state = { 
        btnGroupVisible: false,
        timeout: null
    }
    makeBtnGrpVisible() {
        if (this.state.timeout) {
            //invalidate
            clearTimeout(this.state.timeout);
            this.setState({timeout: null});
        }
        this.setState({btnGroupVisible: true});
    }
    setTimeoutBtnVisible() {
        if (this.state.timeout) {
            //invalidate
            clearTimeout(this.state.timeout);
            this.setState({timeout: null});
        }
        const nTimeout = setTimeout(() => this.setState({btnGroupVisible: false, timeout: null}),
            1200);
        this.setState({timeout: nTimeout});
    }
    componentWillUnmount() {
        this.setState({timeout: null});
    }
    render() {
        const { setToPostgameMode, getNewImage } = this.context;
        const btnGroupEntries = [
            {alt: 'globe', src: globe, clickHandler: setToPostgameMode},
            {alt: 'cancel/skip', src: cancel, clickHandler: getNewImage}
        ]
        return ( 
            <div className="footer-actions">
                <img src={gears}
                    onMouseEnter={this.makeBtnGrpVisible.bind(this)}
                    onMouseLeave={this.setTimeoutBtnVisible.bind(this)}
                    alt="Settings"
                    className="gears" />

                {this.state.btnGroupVisible &&
                    <ButtonGroup elements={btnGroupEntries} icon={true} mouseLeave={this.setTimeoutBtnVisible.bind(this)} mouseEnter={this.makeBtnGrpVisible.bind(this)} />
                }
            </div>
         );
    }
}

LiveGame.contextType = GameContext;
 
export default LiveGame;