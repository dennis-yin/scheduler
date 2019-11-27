import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment";
import getAppointmentsForDay from "../helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  const appointments = getAppointmentsForDay(state, state.day);
  const apptComponents = appointments.map(appointment => <Appointment
    key={appointment.id} {...appointment}/>)

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments")
    ]).then(all => {
        setState(prev => ({ days: all[0].data, appointments: all[1].data }));
      })
  }, [])  // Pass empty array so that this request only runs once

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
        {/* Replace this with the sidebar elements during the "Environment Setup" activity. */}
      </section>
      <section className="schedule">
        {apptComponents}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}