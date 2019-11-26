import React from "react";

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const itemClass = `list__item ${
    props.selected ? "list__item--selected" : ""
  }`;

  return (
    <li className={itemClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}