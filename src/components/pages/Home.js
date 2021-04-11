import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { useMutation, useQuery } from 'react-query'
import toast, { Toaster } from 'react-hot-toast';
import Drawer from '@material-ui/core/Drawer';
import moment from 'moment'

import TimeSlots from 'components/TimeSlots'
import NewTimeSlots from 'components/NewTimeSlots'
import AppointmentRequests from 'components/AppointmentRequests'

import { addTimeSlotToSeller, getSellerById } from 'libs/apis'

import 'react-calendar/dist/Calendar.css';

function Home({ location }) {
    const [date, setDate] = useState(null);
    const [showDrawer, setShowDrawer] = useState(null)
    const [currentSlot, setCurrentSlot] = useState(null)
    const { sellerId } = location.state
    const { isFetching, error, refetch, data } = useQuery(["seller", sellerId, date],
        () => getSellerById(sellerId, moment(date).add(1, 'days').toISOString()),
        {
            enabled: false
        }
    )
    const { mutate } = useMutation(newTimeSlot => addTimeSlotToSeller(sellerId, { ...newTimeSlot, date: moment(date).add(1, 'days').toISOString() }), {
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

    useEffect(() => {
        refetch(sellerId, date)
    }, [date]);

    return (
        <div className="home">
            <div className='container flex'>
                <div className='col-1'>
                    <Calendar
                        onChange={setDate}
                        value={date}
                        activeStartDate={new Date()}
                        tileDisabled={({ date }) => (date.getDay() === 0 || date < new Date())}
                        calendarType="ISO 8601"
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
                            : <div className='notice'> &#9754; choose a date from the calendar </div>
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
                        sellerId={sellerId}
                        timeSlotId={currentSlot._id}
                        date={date}
                        timeSlot={[currentSlot.start, currentSlot.end]}
                        onRefetch={() => refetch()}
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

export default Home;
