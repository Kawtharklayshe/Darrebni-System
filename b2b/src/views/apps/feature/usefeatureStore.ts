import axios from '@axios'
import { defineStore } from 'pinia'
import type { featureData } from './types'

export const usefeatureStore = defineStore('featureStore', {
  actions: {
    // 👉 Fetch all Invoices
    fetchfeature(params: any) {
      return axios.get(`/feature/all`, { params })
    },

    fetchSeoPages(params: any) {
      return axios.get(`/seo/pages`, { params })
    },

    // 👉 Fetch single invoice
    fetchfeatureById(id: number) {
      return axios.get(`feature/${id}`)
    },
    addfeature(feature: featureData) {
  

      return new Promise((resolve, reject) => {
        axios.post(`feature/create`, feature).then(response =>

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
    updatefeature(feature: featureData) {
   

      return new Promise((resolve, reject) => {
        axios.post(`/feature/update/${feature.id}`, feature).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

    // DeleteUser
    Deletefeature( feature:any) {
      return new Promise((resolve, reject) => {
        axios.delete(`/feature/delete/${feature}`).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

 
  },
})
