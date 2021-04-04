import axios from './axiosConfigs'

const addTimeSlotToSeller = (sellerId, body) => {
   return axios.post(`sellers/${sellerId}/timeslots`, body)
}

const getSellerById = (sellerId, date) => {
    return axios.get(`sellers/${sellerId}`, {
        params: {
          date: date
        }
      })
}

export { 
    addTimeSlotToSeller,
    getSellerById
}