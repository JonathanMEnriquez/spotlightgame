import React, { Component } from 'react';
import Button from './Button';
import './ButtonGroup.css';

class ButtonGroup extends Component {
    render() {
        const props = this.props;
        const elements = props.elements;
        const className = props.centered ? 'centered' : 'btn-group';

        return ( 
            <div className={className}
                onMouseEnter={props.mouseEnter}
                onMouseLeave={props.mouseLeave}>
                {elements.map((el, i) => {
                    return (
                    <Button
                        key={i}
                        src={el.src} 
                        icon={props.icon} 
                        clickHandler={el.clickHandler}
                        alt={el.alt}
                        text={el.text}
                        disabled={props.disabled}
                    />)
                })}
            </div>
        );
    }
}
 
export default ButtonGroup;