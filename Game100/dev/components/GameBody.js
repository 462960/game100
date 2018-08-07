import React from 'react';
import * as cn from 'classnames';

 export const GameBody = ({
     units,
     clickActive
    }) => {
   

   const gameSquare = (units || []).map(x => 
                 <li
                 onClick={clickActive}
                 value={x}
                 id={x} 
                 key={x}>
                 {x}
                 </li>
             )

    return(      <ul>
                     {gameSquare}
                 </ul>
    )
}






