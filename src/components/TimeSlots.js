import React from 'react'
import { get } from 'lodash'

const TimeSlots = ({ data, isLoading, error, onClickAdd, onClickSlot }) => {
    const slots = get(data, 'data.timeSlots', [])

    const renderSingleSlot = (index, { _id, start, end, isBooked, appointmentRequests }) => {
        return (
            <div key={_id} className='single-time-slot' onClick={() => { onClickSlot({ _id, start, end, isBooked }) }} >
                <b className='single-time-slot-index'>#{index + 1}</b>
                <div><span>{start}</span> - <span>{end}</span></div>
                {
                    isBooked
                        ? <span className='single-time-slot-booked color-success'>booked</span>
                        : appointmentRequests.length > 0 && <span className='single-time-slot-request-count bg-fail'>{appointmentRequests.length}</span>
                }

            </div>
        )
    }

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (
        <div className='time-slots'>
            <button className='primary-btn' onClick={onClickAdd}> Add New Time Slot </button>
            <div className='time-slots'>
                {slots.length === 0 && <p> no time slots to show in this day </p>}
                {slots.map((slot, index) => {
                    return renderSingleSlot(index, slot)
                })}
            </div>
        </div>
    )
}

export default TimeSlots;