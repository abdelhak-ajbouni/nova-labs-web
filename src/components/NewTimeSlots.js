import React, { useState } from 'react'
import moment from "moment"
import TextField from '@material-ui/core/TextField';

const NewTimeSlots = ({ date, onSubmit }) => {
    const [timeRange, setTimeRange] = useState(['10:00', '11:00']);
    const readableDate = moment(date).format('MMMM Do')

    return (
        <div className='new-time-slot'>
            <div className='container ptb-100'>
                <h2>Add New Time Slot in {readableDate}</h2>
                <TextField
                    id="start-time"
                    className='mp-8'
                    label="Start Time"
                    type="time"
                    value={timeRange[0]}
                    onChange={event => setTimeRange([event.target.value, timeRange[1]])}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        step: 300, // 5 min
                    }}
                    variant="outlined"
                />
                <TextField
                    id="end-time"
                    className='mp-8'
                    label="End Time"
                    type="time"
                    value={timeRange[1]}
                    onChange={event => setTimeRange([timeRange[0], event.target.value])}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        step: 300, // 5 min
                    }}
                    variant="outlined"
                />
                <button 
                    className='primary-btn' 
                    onClick={() => {
                        onSubmit({date, start: timeRange[0], end: timeRange[1]})
                    }}
                    > 
                        Submit 
                    </button>
            </div>
        </div>
    )
}

export default NewTimeSlots;