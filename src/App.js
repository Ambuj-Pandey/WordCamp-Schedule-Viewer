import React from 'react';
import CalendarView from './CalendarView';
import './style.css';
import 'leaflet/dist/leaflet.css'

const App = () => {
  return (
    <div className="App">
      <h1>WordCamp Schedule Viewer</h1>
      <CalendarView />
    </div>
  );
};

export default App;
