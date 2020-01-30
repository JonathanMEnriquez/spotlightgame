import React, { Component } from 'react';
import './MainButton.css';

class MainButton extends Component {
    render() {
        const props = this.props;
        return ( 
        <button
            disabled={props.loading}
            className={props.simple ? 'simple' : 'main-button'}
            onClick={props.clickHandler}>
            {this.props.actionTitle}
        </button>
         );
    }
}
 
export default MainButton;