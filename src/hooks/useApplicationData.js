import { useReducer, useEffect } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  console.log("STATE: ", state);
  console.log("DAY: ", action.day);

  function updateObjectInArray(array, action) {
    return array.map((item, index) => {
      if (index !== action.index) {
        // This isn't the item we care about - keep it as-is
        return item;
      }

      // Otherwise, this is the one we want - return an updated value
      return {
        ...item,
        ...action.item
      };
    });
  }

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

export default function useApplicationData() {
  const setDay = day => dispatch({ type: SET_DAY, day });

  const [state, dispatch] = useReducer(reducer, {
    day: "",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(([days, appointments, interviewers]) => {
      console.log(days);
      dispatch({
        type: SET_APPLICATION_DATA,
        days: days,
        appointments: appointments,
        interviewers: interviewers
      });
    });
  }, []); // Pass empty array so that this request only runs once

  function bookInterview(id, interview) {
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => {
        dispatch({
          type: SET_INTERVIEW,
          id,
          interview,
          book: true
        });
      })
      .catch(err => console.log("Error creating appointment :", err));
  }

  function cancelInterview(id) {
    return axios
      .delete(`api/appointments/${id}`)
      .then(() => {
        dispatch({
          type: SET_INTERVIEW,
          id,
          interview: null,
          book: false
        });
      })
      .catch(err => console.log("Error deleting appointment: ", err));
  }

  return { state, setDay, bookInterview, cancelInterview };
}
