import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { useMutation, useQuery } from 'react-query'
import toast, { Toaster } from 'react-hot-toast';
import Drawer from '@material-ui/core/Drawer';

import TimeSlots from 'components/TimeSlots'
import NewTimeSlots from 'components/NewTimeSlots'
import AppointmentRequests from 'components/AppointmentRequests'

import { addTimeSlotToSeller, getSellerById } from 'libs/apis'

import './App.scss';
import 'react-calendar/dist/Calendar.css';

function App() {
  const [date, setDate] = useState(null);
  const [showDrawer, setShowDrawer] = useState(null)
  const [currentSlot, setCurrentSlot] = useState(null)
  const { isFetching, error, refetch, data } = useQuery(["seller", '6068d7e84b40b22cecb64da5', date],
    () => getSellerById('6068d7e84b40b22cecb64da5', date)
  )
  const { mutate } = useMutation(newTimeSlot => addTimeSlotToSeller('6068d7e84b40b22cecb64da5', newTimeSlot), {
    onSuccess: () => {
      setShowDrawer(null)
      refetch()
      toast.success('Time Slot Added Successfully.')
    },
    onError: () => {
      setShowDrawer(null)
      toast.error('Something Went Wrong.')
    }
  })

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Appointment Booking
        </h1>
      </header>
      <div className='container flex bg-color-1'>
        <div className='col-1'>
          <Calendar
            onChange={setDate}
            value={date}
            activeStartDate={new Date()}
            tileDisabled={({ date }) => (date.getDay() === 0 || date < new Date())}
          />
        </div>
        <div className='col-2'>
          {
            date
              ? <TimeSlots 
                  data={data} 
                  isLoading={isFetching} 
                  error={error} 
                  onClickAdd={() => setShowDrawer('addView')} 
                  onClickSlot={(currentSlot) => { setShowDrawer('appointmentView'); setCurrentSlot(currentSlot) }} 
                />
              : <div className='notice'>choose a date from the calendar</div>
          }
        </div>
      </div>

      <Drawer anchor={'top'} open={showDrawer} onClose={() => setShowDrawer(null)}>
        {
          showDrawer === 'addView' && <NewTimeSlots
            date={date}
            onSubmit={(newTimeSlot) => {
              mutate(newTimeSlot)
            }}
          />
        }
        {
          showDrawer === 'appointmentView' && <AppointmentRequests 
          date={date}
          timeSlot={[currentSlot.start, currentSlot.end]} 
          />
        }
      </Drawer>
      <Toaster
        position="bottom-center"
        reverseOrder={true}
      />
    </div>
  );
}

export default App;
