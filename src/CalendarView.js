import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Calendar from './Calendar';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';

const BASE_API = 'https://central.wordcamp.org/wp-json/wp/v2/wordcamps';

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  // const calendarRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_API}?per_page=100&order=desc&page=1`);
        const totalPages = res.headers['x-wp-totalpages'];
        setEvents(res.data);

        if (totalPages >= 2) {
          const promises = [];
          for (let i = 2; i <= totalPages; i++) {
            promises.push(axios.get(`${BASE_API}?per_page=100&order=desc&page=${i}`));
          }
          Promise.all(promises)
            .then((responses) => {
              const allEvents = responses.reduce((acc, response) => acc.concat(response.data), []);
              setEvents((prevEvents) => [...prevEvents, ...allEvents]);
            })
            .catch((err) => console.error('Error fetching additional pages:', err));
        }
      } catch (err) {
        console.error('Error fetching WordCamps:', err);
      }
    };

    fetchData();
  }, []);

  // const handleYearChange = (e) => {
  //   const selectedYear = parseInt(e.target.value);
  //   const currentDate = new Date();
  //   currentDate.setFullYear(selectedYear);
  //   const calendarApi = calendarRef.current?.getApi();
  //   if (calendarApi) {
  //     calendarApi.gotoDate(currentDate);
  //   }
  // };

  // const years = [];
  // const currentYear = new Date().getFullYear();
  // for (let year = currentYear - 20; year <= currentYear + 20; year++) {
  //   years.push(year);
  // }

  return (
    <div className="wordcamp-calendar">
      <Calendar eventsData={events} />
      {/* <div className="calendar-header">
        <button className="btn" onClick={() => calendarRef.current?.getApi()?.prev()}>Prev</button>
        <select className="year-select" onChange={handleYearChange} defaultValue={currentYear}>
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <button className="btn" onClick={() => calendarRef.current?.getApi()?.next()}>Next</button>
      </div>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events.map((event) => ({
          title: event.title.rendered,
          start: new Date(event['Start Date (YYYY-mm-dd)'] * 1000).toISOString(),
          end: new Date(event['End Date (YYYY-mm-dd)'] * 1000).toISOString(),
          url: event.link,
          display: 'auto', // Rendering type
          overlap: false, // Prevent overlapping events
          backgroundColor: '#FFC107', // Background color
          borderColor: '#FFA000', // Border color
          textColor: '#212121', // Text color
        }))}
        eventClick={(info) => {
          info.jsEvent.preventDefault();
          window.open(info.event.url, '_blank');
        }}
        headerToolbar={{
          start: 'title',
          center: '',
          end: '',
        }
        }
      /> */}
    </div>
  );
};

export default CalendarView;
