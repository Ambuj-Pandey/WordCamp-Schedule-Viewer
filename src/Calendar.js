import React, { useState } from 'react';
import EventModal from './EventModal';
import { addMonths, fromUnixTime, getDaysInMonth, getMonth, getYear, isFuture, isSameDay, isSameMonth } from 'date-fns';

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const getMonthWeeks = (monthIndex, year) => {
  const weeks = [];
  const daysInMonth = getDaysInMonth(new Date(year, monthIndex));
  let firstDayIndex = new Date(year, monthIndex, 1).getDay();
  let currentDate = 1;

  while (currentDate <= daysInMonth) {
    const week = Array(7).fill(null).map((_, index) => {
      const day = currentDate + index - firstDayIndex;
      return day > 0 && day <= daysInMonth ? day : null;
    });
    weeks.push(week);
    currentDate += 7 - firstDayIndex;
    firstDayIndex = 0; 
  }

  return weeks;
};

const Calendar = ({ eventsData = [] }) => {
  const [selectedMonth, setSelectedMonth] = useState(getMonth(new Date()));
  const [selectedYear, setSelectedYear] = useState(getYear(new Date()));

  const monthWeeks = getMonthWeeks(selectedMonth, selectedYear);
  const eventsInCurrentMonth = eventsData.filter(event =>
    isSameMonth(new Date(selectedYear, selectedMonth), fromUnixTime(event["Start Date (YYYY-mm-dd)"]))
  );

  const upcomingEvents = eventsData.filter(event =>
    isFuture(new Date(fromUnixTime(event["Start Date (YYYY-mm-dd)"])))
  );

  const changeMonth = (delta) => {
    const newDate = addMonths(new Date(selectedYear, selectedMonth), delta);
    setSelectedMonth(getMonth(newDate));
    setSelectedYear(getYear(newDate));
  };

  return (
    <div className='border p-4'>
      <div className='flex justify-between items-center pb-4 border-b'>
        <div className='flex'>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2' onClick={() => changeMonth(-1)}>
            Previous Month
          </button>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => changeMonth(1)}>
            Next Month
          </button>
        </div>
        <div className='flex'>
          <select className='border rounded mr-2 px-4 py-2' value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} onBlur={(e) => setSelectedYear(e.target.value)}>
            {new Array(25).fill(undefined).map((_, i) => (
              <option key={i + 2003} value={i + 2003}>{i + 2003}</option>
            ))}
          </select>
          <select className='border rounded px-4 py-2' value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} onBlur={(e) => setSelectedMonth(e.target.value)}>
            {MONTH_NAMES.map((monthName, i) => (
              <option key={i} value={i}>{monthName}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <table className='table-auto w-full'>
          <thead>
            <tr className='border-b'>
              {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, i) => (
                <th key={i} className='border-r px-4 py-2 text-center'>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {monthWeeks.map((week, i) => (
              <tr key={i}>
                {week.map((day, j) => {
                  const isTodayDay = isSameDay(new Date(selectedYear, selectedMonth, day), new Date());
                  const currentDayEvents = eventsInCurrentMonth.filter(event =>
                    isSameDay(new Date(selectedYear, selectedMonth, day), fromUnixTime(event["Start Date (YYYY-mm-dd)"]))
                  );
                  return (
                    <td key={j} className='border px-4 py-2 text-center'>
                      {day && (
                        <>
                          {isTodayDay ? <p className='font-bold'>{day}</p> : <p>{day}</p>}
                          {currentDayEvents.map(event => (
                            <EventModal key={event.id} event={event} />
                          ))}
                        </>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calendar;
