import React from 'react';
import Button from './Button';
import './ButtonGroup.css';

const ButtonGroup = (props) => {
    const { elements, centered, icon, mouseEnter, mouseLeave, disabled } = props;
    const className = centered ? 'centered' : 'btn-group';
    
    return ( 
        <div className={className}
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}>
            {elements.map((el, i) => {
                return (
                <Button
                    key={i}
                    src={el.src} 
                    icon={icon} 
                    clickHandler={el.clickHandler}
                    alt={el.alt}
                    text={el.text}
                    disabled={disabled}
                />)
            })}
        </div>
    );
}
 
export default ButtonGroup;