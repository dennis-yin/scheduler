export function getAppointmentsForDay(state, day) {
  let results = [];
  const theDay = state.days.find(d => d.name === day);
  if (theDay) {
    theDay.appointments.map(appt => {
      if (state.appointments[appt.toString()]) {
        results.push(state.appointments[appt.toString()]);
      }
    });
  }
  return results;
}

export function getInterview(state, interview) {
  if (!interview) return null;
  const interviewerId = interview.interviewer.toString();

  return {
    student: interview.student,
    interviewer: state.interviewers[interviewerId]
  };
}

export function getInterviewersForDay(state, day) {
  let results = [];
  const theDay = state.days.find(d => d.name === day);
  if (theDay) {
    theDay.interviewers.map(interviewer => {
      if (state.interviewers[interviewer.toString()]) {
        results.push(state.interviewers[interviewer.toString()]);
      }
    });
  }
  return results;
}
