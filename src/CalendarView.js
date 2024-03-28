import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const CalendarView = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchWordCamps = async () => {
      try {
        const response = await axios.get('https://central.wordcamp.org/wp-json/wp/v2/wordcamps');
        const wordCamps = response.data;
        setEvents(wordCamps.map(camp => ({
          title: camp.title.rendered,
          start: new Date(camp.date),
          url: camp.link
        })));
      } catch (error) {
        console.error('Error fetching WordCamps:', error);
      }
    };

    fetchWordCamps();
  }, []);

  return (
    <div>
      <h2>Upcoming and Past WordCamps</h2>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={(info) => {
          info.jsEvent.preventDefault();
          window.open(info.event.url, '_blank');
        }}
      />
    </div>
  );
};

export default CalendarView;
