import axios from '@axios'
import { defineStore } from 'pinia'
import type { ServiceData } from './types'

export const useServiceStore = defineStore('ServiceStore', {
  actions: {
    // 👉 Fetch all Invoices
    fetchService(params: any) {
      return axios.get(`/service/all`, { params })
    },

    // 👉 Fetch single invoice
    fetchServiceById(id: number) {
      return axios.get(`service/${id}`)
    },
    addService(Service: ServiceData) {
   
      return new Promise((resolve, reject) => {
        axios.post(`service/create`, Service).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },
    uploadImage( payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('upload/image', payload, { headers: { 'Content-Type': 'multipart/form-data' } })
          .then(response => resolve(response.data))
          .catch(error => reject(error))
      })
    },
    updateService(Service: ServiceData) {
   

      return new Promise((resolve, reject) => {
        axios.post(`/service/update/${Service.id}`, Service).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

    // DeleteUser
    DeleteService( service:any) {
      return new Promise((resolve, reject) => {
        axios.delete(`/service/delete/${service}`).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

 
  },
})
