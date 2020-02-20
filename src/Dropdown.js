import React from 'react';
import './Dropdown.css';

const Dropdown = (props) => {
    const { visible, data, inputClass, onClickHandler, hasFocus } = props;

    return (
        <div className="dropdown">
            {visible &&
            <div className="dropdown-content">
                {data.map((d, i) => {
                    return <p className={hasFocus && hasFocus.idx === i ? "selection focused" : "selection"} onClick={event => onClickHandler(d, inputClass, event)} key={i}>{d}</p>;
                })}
            </div>
            }
        </div>
    );
}

export default Dropdown;