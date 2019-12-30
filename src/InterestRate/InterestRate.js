import React from 'react';
import './InterestRate.css';

function InterestRate() {
    return (
        <div className="InterestRate-div">
            <input type="range" min="1" max="100" value="50" class="slider" id="myRange"></input>
        </div>
    );
}

export default InterestRate;