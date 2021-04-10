import React from 'react'
import moment from "moment"
import { get } from 'lodash'
import { useMutation, useQuery } from 'react-query'
import toast, { Toaster } from 'react-hot-toast';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { getRequests, updateRequest, updateTimeSlot } from 'libs/apis'

const AppointmentRequests = ({ sellerId, timeSlotId, date, timeSlot }) => {
  const { refetch, data } = useQuery(["request", sellerId, timeSlotId],
    () => getRequests(sellerId, timeSlotId)
  )
  const { mutate: mutateUpdateTimeSlot } = useMutation(() => updateTimeSlot(sellerId, timeSlotId, { isBooked: true }), {
    onSuccess: () => {
      refetch()
      toast.success('Appointment Request Accepted.')
    },
    onError: () => {
      toast.error('Something Went Wrong.')
    }
  })
  const { mutate: mutateUpdateRequest } = useMutation(({requestId, isAccepted}) => updateRequest(sellerId, timeSlotId, requestId, { isAccepted }), {
    onSuccess: () => {
      mutateUpdateTimeSlot()
    },
    onError: () => {
      toast.error('Something Went Wrong.')
    }
  })
  const requests = get(data, 'data', [])
  const readableDate = moment(date).format('MMMM Do')

  return (
    <div className='appointment-requests'>
      <div className='container ptb-70'>
        <h3> Appointment Requests for {readableDate}: {timeSlot[0]} - {timeSlot[1]} </h3>
        <hr />
        <List>
          {requests.length === 0 && <p> no appointment requests to show in this time slots </p>}
          {
            requests.map(({ _id, requestedBy, isAccepted }) => (
              <ListItem className='bg-color-1' key={_id} autoFocus>
                <ListItemText primary={requestedBy} />
                <button className='primary-btn bg-success' onClick={() => mutateUpdateRequest({requestId: _id, isAccepted: true })}>{isAccepted ? 'reject' : 'accept'}</button>
              </ListItem>
            ))
          }

        </List>
      </div>

      <Toaster
        position="bottom-center"
        reverseOrder={true}
      />
    </div>
  )
}
export default AppointmentRequests;