import React, { useState } from 'react';
import './Dialog.css';
import ButtonGroup from './ButtonGroup';

const Dialog = (props) => {
    const { visible, message, cancelText, onCompleteText, onCancel, onComplete, preCompleteMessage } = props;
    const [showSecondary, setShowSecondary] = useState(false);

    const setToComplete = () => {
        if (!preCompleteMessage) {
            onComplete();
            return;
        }

        setShowSecondary(true);
    }

    const modalClicked = (el) => {
        if (el.target.className === 'modal' && !showSecondary) {
            onCancel();
        }
    }

    const resetAndComplete = () => {
        setShowSecondary(false);
        onComplete();
    }

    const btnGroupEntries = [
        {text: cancelText, clickHandler: onCancel},
        {text: onCompleteText, clickHandler: setToComplete}
    ];

    const secondaryBtnGroupEntries = [
        {text: 'Continue', clickHandler: resetAndComplete}
    ];

    return (
        <div className={visible ? 'modal' : 'hidden'}
            onClick={modalClicked}>
            <div className="dialog">
                <div className="message">
                    {showSecondary ? preCompleteMessage : message}
                </div>
                <div className="button-group-div">
                    <ButtonGroup 
                        elements={showSecondary ? secondaryBtnGroupEntries : btnGroupEntries} 
                        icon={false} />
                </div>
            </div>
        </div>
    );
}

export default Dialog;