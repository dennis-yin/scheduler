import React from "react";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const { time, interview } = props
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  return (
    <main className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          aStudent={interview.student}
          anInterviewer={interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={[]}
        />
      )}
    </main>
  )
}