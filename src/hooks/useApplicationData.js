import { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

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

  function bookInterview(id, interview, isEdit = false) {
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => {
        dispatch({
          type: SET_INTERVIEW,
          id,
          interview,
          edit: isEdit,
          isBooking: true
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
          isBooking: false
        });
      })
      .catch(err => console.log("Error deleting appointment: ", err));
  }

  return { state, setDay, bookInterview, cancelInterview };
}
