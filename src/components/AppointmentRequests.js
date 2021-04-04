import React from 'react'
import moment from "moment"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const AppointmentRequests = ({ date, timeSlot, appointment = [{ _id: 'ddd' },{ _id: 'ddd' }], onClickAccept }) => {
  const readableDate = moment(date).format('MMMM Do')

  return (
    <div className='appointment-requests'>
      <div className='container ptb-100'>
        <h3> Appointment Requests for {readableDate}: {timeSlot[0]} - {timeSlot[1]} </h3>
        <List>
          {
            appointment.map(({ _id, isAccepted }) => (
              <ListItem className='bg-color-1 mp-8' key={_id} autoFocus>
                <ListItemText primary={_id} />
                <button className='primary-btn bg-success' onClick={() => onClickAccept(isAccepted)}>{isAccepted ? 'reject' : 'accept'}</button>
              </ListItem>
            ))
          }

        </List>
      </div>
    </div>
  )
}
export default AppointmentRequests;