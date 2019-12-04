export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return {
        ...state,
        day: action.day
      };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days.data,
        appointments: action.appointments.data,
        interviewers: action.interviewers.data
      };
    case SET_INTERVIEW: {
      const appointment = {
        ...state.appointments[action.id],
        interview: action.interview && { ...action.interview }
      };

      const appointments = {
        ...state.appointments,
        [action.id]: appointment
      };

      let day;
      if (action.id >= 1 && action.id <= 5) day = 0;
      if (action.id >= 6 && action.id <= 10) day = 1;
      if (action.id >= 11 && action.id <= 15) day = 2;
      if (action.id >= 16 && action.id <= 20) day = 3;
      if (action.id >= 21 && action.id <= 25) day = 4;

      let days;
      if (action.book) {
        days = [...state.days];
        days[day].spots--;
      } else {
        days = [...state.days];
        days[day].spots++;
      }

      return { ...state, appointments, days };
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
