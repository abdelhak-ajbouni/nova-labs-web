import React, { useState, useEffect } from 'react'

import { getTimeSlots } from 'libs/apis'

const TimeSlots = ({date = null}) => {
    // const [loading, setLoading] = useState(false)
    const [slots, setSlots] = useState([])

    useEffect(() => {
        (async function() {
            const response = await getTimeSlots(date) 
            setSlots(response);
        })()
    }, [date]);

    const renderTimeSlots = () => {
       return slots.map(slot => (<div className='single-time-slot'>{slot.start}</div>))
    }

    return (
        <div className='time-slots'>
            {date ? renderTimeSlots() : 'chose a date from the calender'}
        </div>
    )
}

export default TimeSlots;