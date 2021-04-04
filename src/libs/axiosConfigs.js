import axios from 'axios'

const customInstance = axios.create({
    baseURL: 'http://localhost:3200/api/',
    timeout: 1000,
    headers: { 'Accept': 'application/json' }
})

export default customInstance