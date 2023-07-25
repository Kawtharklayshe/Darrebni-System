import axios from 'axios'

const token = localStorage.getItem('accessToken')


const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: 'https://b2b.prokoders.space/api/',

  // timeout: 1000,
  headers: { Authorization: `Bearer ${token}` },
})

export default axiosIns
