import axios from './axiosConfigs'

const addTimeSlotToSeller = (sellerId, body) => {
   return axios.post(`sellers/${sellerId}/timeslots`, body)
}

const addSeller = (body) => {
  return axios.post(`sellers/`, body)
}

const getSellerById = (sellerId, date) => {
    return axios.get(`sellers/${sellerId}`, {
        params: {
          date: date
        }
      })
}

const updateTimeSlot = (sellerId, timeslotId, body) => {
  return axios.put(`sellers/${sellerId}/timeslots/${timeslotId}`, body)
}

const getRequests = (sellerId, timeslotId) => {
  return axios.get(`sellers/${sellerId}/timeslots/${timeslotId}/requests`)
}

const updateRequest = (sellerId, timeslotId, requestId, body) => {
  return axios.put(`sellers/${sellerId}/timeslots/${timeslotId}/requests/${requestId}`, body)
}

export { 
    addTimeSlotToSeller,
    getSellerById,
    updateTimeSlot,
    getRequests,
    addSeller,  
    updateRequest
}