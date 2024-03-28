import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { startOfMonth } from 'date-fns';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const BASE_API = 'https://central.wordcamp.org/wp-json/wp/v2/wordcamps';

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [isAllDataLoaded, setIsAllDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const monthStartDate = startOfMonth(new Date());
        const todayDateInISO = monthStartDate.toISOString();
        const res = await axios.get(`${BASE_API}?per_page=100&order=desc&page=1`);
        const totalPages = res.headers["x-wp-totalpages"];
        setEvents(res.data);

        if (totalPages >= 2) {
          for (let i = 2; i <= totalPages; i++) {
              axios.get(`${BASE_API}?per_page=100&order=desc&page=${i}`)
                .then(res => {
                  setEvents(data => data.concat(res.data));
                  return res.data;
                })
                .catch(err => console.log(err));
          }
          
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Upcoming and Past WordCamps</h2>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events.map(event => ({
          title: event.title.rendered,
          start: new Date(event['Start Date (YYYY-mm-dd)'] * 1000).toISOString(), // Convert Unix timestamp to ISO string
          url: event.link
        }))}
        eventClick={(info) => {
          info.jsEvent.preventDefault();
          window.open(info.event.url, '_blank');
        }}
      />
    </div>
  );
};

export default CalendarView;
