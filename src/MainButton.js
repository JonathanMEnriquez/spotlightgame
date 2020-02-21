import React from 'react';
import './MainButton.css';

const MainButton = (props) => {
    const { loading, simple, clickHandler, actionTitle } = props;

    return ( 
        <button
            disabled={loading}
            className={simple ? 'simple' : 'main-button'}
            onClick={clickHandler}>
            {actionTitle}
        </button>
    );
}
 
export default MainButton;