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
  const SAVING = "SAVING";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // console.log("PROPS: ", props)
  function save(name, interviewer) {
    // console.log(`PERSON: ${name}, INTERVIEWER: ${interviewer}`)
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview);
    transition("SHOW");
  }

  return (
    <main className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={prev => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          name={""}
          interviewer={""}
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={(name, interviewer) => save(name, interviewer)}
        />
      )}
    </main>
  );
}
