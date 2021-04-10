import React from 'react'
import moment from "moment"
import { get } from 'lodash'
import { useMutation, useQuery } from 'react-query'
import toast, { Toaster } from 'react-hot-toast';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { getRequests, updateRequest } from 'libs/apis'

const AppointmentRequests = ({ sellerId, timeSlotId, date, timeSlot }) => {
  const { isFetching, error, refetch, data } = useQuery(["request", sellerId, timeSlotId],
    () => getRequests(sellerId, timeSlotId)
  )
  const { mutate } = useMutation(({requestId, isAccepted}) => updateRequest(sellerId, timeSlotId, requestId, { isAccepted }), {
    onSuccess: () => {
      refetch()
      toast.success('Appointment Request Accepted.')
    },
    onError: () => {
      toast.error('Something Went Wrong.')
    }
  })
  const requests = get(data, 'data', [])
  const readableDate = moment(date).format('MMMM Do')

  return (
    <div className='appointment-requests'>
      <div className='container ptb-100'>
        <h3> Appointment Requests for {readableDate}: {timeSlot[0]} - {timeSlot[1]} </h3>
        <List>
          {
            requests.map(({ _id, isAccepted }) => (
              <ListItem className='bg-color-1 mp-8' key={_id} autoFocus>
                <ListItemText primary={_id} />
                <button className='primary-btn bg-success' onClick={() => mutate({requestId: _id, isAccepted: true })}>{isAccepted ? 'reject' : 'accept'}</button>
              </ListItem>
            ))
          }

        </List>
      </div>
    </div>
  )
}
export default AppointmentRequests;