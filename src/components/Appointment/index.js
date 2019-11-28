import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";

import "./styles.scss";


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const { time, interview } = props
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  return (
    <main className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={prev => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          aStudent={interview.student}
          anInterviewer={interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={[]}
          onCancel={prev => transition(EMPTY)}
          // onSave={prev => }
        />
      )}
    </main>
  )
}