// Rewrite this when you have time
export function getAppointmentsForDay(state, day) {
  let results = [];
  const theDay = state.days.filter(d => d.name === day);
  if (theDay.length === 0) return results;
  const appts = theDay[0].appointments;
  for (const appt of appts) {
    if (Object.keys(state.appointments).includes(appt.toString())) {
      results.push(state.appointments[appt.toString()])
    }
  }
  return results;
}

export function getInterview(state, interview) {
  if (!interview) return null;

  const interviewerId = interview.interviewer;

  return {
    "student": interview.student,
    "interviewer": state.interviewers[interviewerId.toString()]
  }
}

// Seriously, rewrite this travesty of a function
export function getInterviewersForDay(state, day) {
  let results = [];
  const theDay = state.days.filter(d => d.name === day);
  if (theDay.length === 0) return results;
  const appts = theDay[0].appointments;
  console.log("APPTS", appts)
  for (const appt of appts) {
    const interview = state.appointments[appt.toString()].interview;
    if (interview) {
      results.push(state.interviewers[interview.interviewer.toString()]);
    }
  }
  return results;
}