import React from 'react';
import './Dropdown.css';

const Dropdown = (props) => {
    console.log('hola from dropdown');
    const { visible, data, inputClass } = props;

    return (
        <div className="dropdown">
            {visible &&
            <div className="dropdown-content">
                {data.map((d, i) => {
                    return <p key={i}>{d}</p>;
                })}
            </div>
            }
        </div>
    );
}

export default Dropdown;