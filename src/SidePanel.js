import React, { Component } from 'react';
import './SidePanel.css';
import GameContext from './GameContext';
import MainButton from './MainButton';
import MapIcon from './img/map.png';
import Close from './img/cross.png';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Dropdown from './Dropdown';

class SidePanel extends Component {
    state = {
        suggestions: [],
        guessValue: '',
        selectedClass: '',
        hasFocusElem: null,
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.visible !== nextProps.visible
            || this.state.suggestions !== nextState.suggestions
            || this.state.hasFocusElem !== nextState.hasFocusElem;
    }

    async saveGuesses() {
        const { goToPostGame } = this.props;
        const { updateGuesses } = this.context;
        const inputs = document.getElementsByClassName('guess-input');
        const guesses = {};
        for (let i = 0; i < inputs.length; i++) {
            const child = inputs[i].children;
            const player = child[0].textContent;
            const guess = child[1].value;
            if (!player || !guess) {
                return;
            }
            guesses[player] = guess;
        }
        await updateGuesses(guesses);
        goToPostGame();
    }

    filterHints(val) {
        const { hints } = this.props;
        const re = new RegExp(val, 'i');
        const filteredHints = hints.filter(e => {
            if (re.test(e)) {
                return e;
            }

            return null;
        });
        if (filteredHints.length > 5) {
            filteredHints.length = 5;
        }
        
        this.setState({suggestions: filteredHints, guessValue: val});
    }

    handleGuessValueChange(event) {
        const cl = event.target.className;
        this.setState({selectedClass: cl, hasFocusElem: null});
        this.filterHints(event.target.value);
    }

    resetSuggestions() {
        this.setState({suggestions: [], selectedClass: '', guessValue: '', hasFocusElem: null});
    }

    handleKeyPress(event) {
        const k = event.key;
        const downPressed = k === 'ArrowDown';
        const upPressed = k === 'ArrowUp';
        const enterPressed = k === 'Enter';
        const { selectedClass } = this.state;

        if (!this.state.hasFocusElem) {
            if (downPressed) {
                if (this.state.suggestions.length) {
                    this.setState({hasFocusElem: {'idx': 0, 'val': this.state.suggestions[0]}});
                }
            }
        } else if (downPressed || upPressed) {
            const { idx } = this.state.hasFocusElem;
            let nIdx;
            if (downPressed) {
                nIdx = idx + 1;
            } else if (upPressed) {
                nIdx = idx - 1;
            }

            if (nIdx < 0) {
                this.setState({hasFocusElem: null});
            } else if (nIdx < this.state.suggestions.length) {
                this.setState({hasFocusElem: {'idx': nIdx, 'val': this.state.suggestions[nIdx]}});
            }
        } else if (enterPressed && selectedClass) {
            const { val } = this.state.hasFocusElem;
            this.setInputValue(val, selectedClass);
        }
    }

    setInputValue(val, cls) {
        const input = document.getElementsByClassName(cls)[1];
        input.value = val;
        this.resetSuggestions();
    }

    handleOnBlur() {
        setTimeout(this.resetSuggestions.bind(this), 100);
        this.setState({hasFocusElem: null});
    }

    render() {
        const { players } = this.context;
        const { visible, closePanel } = this.props;

        return (
            <TransitionGroup component={null}>
            {visible &&
                <CSSTransition classNames="panel-dialog" timeout={300} >
                <div className="side-panel">
                    <img className="close" src={Close} alt="X" onClick={closePanel} />
                    <div className="map">
                        <img src={MapIcon} alt="Guess" />
                    </div>
                    <div className="guesses">
                    {players.map((p, i) => {
                        if (p.name === 'No one' || !p.playing) return null;
                        const visible = i.toString() === this.state.selectedClass;

                        return (
                            <div className="guess-input" key={i}>
                                <div className={i}>{p.name}</div>
                                <input className={i} onChange={event => this.handleGuessValueChange(event)} onBlur={event => this.handleOnBlur()} onKeyDown={event => this.handleKeyPress(event)} />
                                <Dropdown visible={visible} hasFocus={this.state.hasFocusElem} data={this.state.suggestions} inputClass={i} onClickHandler={(val, cls) => this.setInputValue(val, cls)} />
                            </div>
                        )
                    })}
                    </div>
                    <div className="side-submit">
                        <MainButton
                            actionTitle="Submit" 
                            simple={true} 
                            clickHandler={this.saveGuesses.bind(this)} />
                    </div>
                </div>
                </CSSTransition>
            }
            </TransitionGroup>
        );
    }
}

SidePanel.contextType = GameContext;
 
export default SidePanel;