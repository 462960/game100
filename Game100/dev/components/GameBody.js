import React from "react";
import cn from "classnames";

export const GameBody = ({ units, getValue, active, catched }) => {
  const gameSquare = (units || []).map(x => (
    <li
      className={cn("blue", {
        yellow: x === active,
        green: x === catched && x === active,
        red: x === catched && x !== active
      })}
      onClick={getValue}
      value={x}
      id={x}
      key={x}
    >
      {x}
    </li>
  ));

  return <ul className="unit-wrapper">{gameSquare}</ul>;
};
