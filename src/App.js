import React, { useState } from 'react';
import Calendar from 'react-calendar';

import TimeSlots from 'components/TimeSlots'

import './App.scss';
import 'react-calendar/dist/Calendar.css';

function App() {
  const [date, setDate] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Appointment Booking
        </h1>
      </header>
      <div className='container'>
        <div className='col-1'>
          <Calendar
            onChange={setDate}
            value={date}
          />
          <button className='primary-btn'> Add New Time Slot</button>
        </div>
        <div className='col-2'>
          <TimeSlots date={date} />
        </div>
      </div>
    </div>
  );
}

export default App;
