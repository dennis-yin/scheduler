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
