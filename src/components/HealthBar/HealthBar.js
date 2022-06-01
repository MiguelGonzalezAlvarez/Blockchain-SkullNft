import React from 'react';
import './HealthBar.css';

const HealthBar = ({hp, maxHp}) => {
    return (
        <div className="health-bar">
            <progress className="health-bar-color health-bar-width" value={hp} max={maxHp} />
            <p className="health-element">Health {`${hp} / ${maxHp}`}</p>
        </div>
    );
};

export default HealthBar;