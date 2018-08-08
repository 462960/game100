import React from 'react';
import  cn from 'classnames';

export const InteractiveBar = ({
    gamerScore,
    computerScore,
    getValue,
    delay,
    gameStart,
    isGameStarted
}) => {

    return(
        <div>
            <h6>Scores</h6>
            <div>Player<span> {gamerScore}</span></div>
            <div>Computer<span> {computerScore}</span></div>
            <div>Enter msec of delay 
                <input
                type="text"
                id="delay"
                onChange={getValue}
                value={delay}
                />
                </div>
                <button
                // className={cn({disabled: isGameStarted})}
                // disabled={isGameStarted}
                type="button"
                onClick={gameStart}
                >
                    Start the game
                    </button> 
        </div>
    )
}