import React, { useState, useEffect } from "react";
import "./Calendar.css";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid/index.js";

import { getEvents, getProfile } from "../../network/api";
import { useNavigate } from "react-router-dom";

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdminStatus = async () => {
    try {
      const res = await getProfile();
      setIsAdmin(res.data.isAdmin);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEvents = async (startDate, endDate) => {
    try {
      const res = await getEvents(startDate, endDate);
      setEvents(
        res.data.map((e) => {
          return {
            title: e.name,
            start: e.timestamp,
            id: e._id,
            location: e.location
          };
        })
      );

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkAdminStatus();

    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    fetchEvents(startOfMonth, endOfMonth);
  }, []);

  return (
    <div>
      <h1>Calendar</h1>
      <div>
        {isAdmin && (
          <a className="calendar-btn" href="/addEvent">
            Adauga eveniment
          </a>
        )}
      </div>
      <FullCalendar
        datesSet={(event) => {
          var midDate = new Date(
            (event.start.getTime() + event.end.getTime()) / 2
          );
          const startOfMonth = new Date(
            midDate.getFullYear(),
            midDate.getMonth(),
            1
          );
          const endOfMonth = new Date(
            midDate.getFullYear(),
            midDate.getMonth() + 1,
            0
          );
          fetchEvents(startOfMonth, endOfMonth);
        }}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={events}
        eventContent={(eventContent) => {
          return (< EventComponent eventInfo={eventContent} isAdmin={isAdmin} />)
        }}
      />
    </div>
  );
}

function EventComponent({ eventInfo, isAdmin }) {
  const navigate = useNavigate();

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const offset = eventInfo.event.start.getTimezoneOffset()
  const newDate = new Date(eventInfo.event.start.getTime() - (offset * 60 * 1000))

  const formInitialValues = {
    Name: eventInfo.event.title,
    Day: newDate.toISOString().split('T')[0],
    Time: eventInfo.event.start.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "numeric",
    }),
    Location: eventInfo.event.extendedProps.location
  };

  return (
    <>
      <span
        onClick={() => {
          navigate("/addEvent", { state: { formInitialValues: formInitialValues, update: true } })
        }}
      >
        <b>
          {eventInfo.event.start.toLocaleTimeString(undefined, {
            hour: "numeric",
            minute: "numeric",
          })}
        </b>{" "}
        <i>{eventInfo.event.title}</i>
      </span>
    </>
  );
}
