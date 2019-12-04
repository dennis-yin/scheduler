import React from "react";

import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  const formatSpots = function() {
    let text = "";
    if (props.spots === 0) {
      text += "no spots remaining";
    } else if (props.spots === 1) {
      text += "1 spot remaining";
    } else {
      text += `${props.spots} spots remaining`;
    }
    return text;
  };

  const spotsRemaining = formatSpots();

  return (
    <li
      className={dayClass}
      onClick={() => props.setDay(props.name)}
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{spotsRemaining}</h3>
    </li>
  );
}
