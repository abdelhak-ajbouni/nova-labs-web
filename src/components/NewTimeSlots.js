import React, { useState } from 'react'
import TimeRangePicker from '@wojtekmaj/react-timerange-picker'


const NewTimeSlots = ({ onSubmit }) => {
    const [timeRange, setTimeRange] = useState(['10:00', '11:00']);

    return (
        <div className='new-time-slot'>
            <TimeRangePicker
                onChange={setTimeRange}
                value={timeRange}
            />
            <button className='primary-btn' onClick={() => onSubmit(timeRange)}> Submit </button>
        </div>
    )
}

export default NewTimeSlots;