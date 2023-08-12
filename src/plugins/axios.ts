import axios from 'axios'

const token = localStorage.getItem('accessToken')


const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  // 'https://b2b.prokoders.space/api/',
  baseURL: 'https://academy.prokoders.com/api/',

  // timeout: 1000,
  headers: { Authorization: `Bearer ${token}` },
})

export default axiosIns
