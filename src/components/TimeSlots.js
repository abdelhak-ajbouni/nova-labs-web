import React from 'react'
import { get } from 'lodash'
import toast, { Toaster } from 'react-hot-toast';

const TimeSlots = ({ data, isLoading, error, onClickAdd, onClickSlot }) => {
    const slots = get(data, 'data.timeSlots', [])

    const renderSingleSlot = (index, { _id, start, end, isBooked, appointmentRequests }) => {
        return (
            <div key={_id} className='single-time-slot' onClick={() => { isBooked ? toast('Already Booked') : onClickSlot({ _id, start, end, isBooked }) }} >
                <div><b className='single-time-slot-index'>#{index + 1}</b> <span>{start}</span> - <span>{end}</span></div>
                {
                    isBooked
                        ? <span className='single-time-slot-booked color-success'>booked</span>
                        : <span className='single-time-slot-request-count bg-fail'>{appointmentRequests.length}</span>
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

            <Toaster
                position="bottom-center"
                reverseOrder={true}
            />
        </div>
    )
}

export default TimeSlots;