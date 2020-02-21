import React, { Component } from 'react';
import GameContext from './GameContext';
import gears from './img/gears.png';
import globe from './img/globe.png';
import cancel from './img/cancel.png';
import './LiveGame.css';
import ButtonGroup from './ButtonGroup';
import SidePanel from './SidePanel';

class LiveGame extends Component {
    state = { 
        btnGroupVisible: false,
        timeout: null,
        sidePanelVisible: false
    }

    makeBtnGrpVisible() {
        if (this.state.timeout) {
            this.invalidateTimeout();
        }
        this.setState({btnGroupVisible: true});
    }

    setTimeoutBtnVisible() {
        if (this.state.timeout) {
            this.invalidateTimeout();
        }
        const nTimeout = setTimeout(() => this.setState({btnGroupVisible: false, timeout: null}),
            1200);
        this.setState({timeout: nTimeout});
    }

    componentWillUnmount() {
        this.invalidateTimeout();
    }

    invalidateTimeout() {
        clearTimeout(this.state.timeout);
        this.setState({timeout: null});
    }

    toggleSidePanelVisibility() {
        this.setState({sidePanelVisible: !this.state.sidePanelVisible});
    }

    render() {
        const { setToPostgameMode, skipImage, hints } = this.context;
        const { sidePanelVisible } = this.state;
        const btnGroupEntries = [
            {alt: 'globe', src: globe, clickHandler: this.toggleSidePanelVisibility.bind(this)},
            {alt: 'cancel/skip', src: cancel, clickHandler: skipImage}
        ]
        return ( 
            <div className="live-game">
                <SidePanel goToPostGame={setToPostgameMode} closePanel={this.toggleSidePanelVisibility.bind(this)} visible={sidePanelVisible} hints={hints} />
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
            </div>
         );
    }
}

LiveGame.contextType = GameContext;
 
export default LiveGame;