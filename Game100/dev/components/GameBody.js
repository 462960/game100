import React from 'react';
import  cn from 'classnames';

 export const GameBody = ({
     units,
     getValue,
     active,
     isGameStarted,
     catched
    }) => {
   
   const gameSquare = (units || []).map(x => 
                 <li
                 className={cn("blue", {
                     yellow: isGameStarted && x === active,
                     green: isGameStarted && x === catched && x === active,
                     red: isGameStarted && x === catched && x !== active,
                 })}
                 onClick={getValue}
                 value={x}
                 id={x} 
                 key={x}>
                 {x}
                 </li>
             )

    return(      <ul className="unit-wrapper">
                     {gameSquare}
                 </ul>
    )
}






