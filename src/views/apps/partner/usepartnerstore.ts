import { defineStore } from 'pinia'
import type { partnerData } from './types'
import axios from '@axios'

export const usepartnerstore = defineStore('usepartnerstore', {
  actions: {
    // 👉 Fetch all Invoices
    fetchpartner(params: any) {
      return axios.get(`partner/all`, { params })
    },

    // 👉 Fetch single invoice
    fetchpartnerById(id: number) {
      return axios.get(`partner/${id}`)
    },
    addpartner(partner: partnerData) {
      return new Promise((resolve, reject) => {
        axios.post('partner/create', partner).then(response =>

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
    login(partner: any) {
      return new Promise((resolve, reject) => {
        axios.post('auth/login', partner).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },
    updatepartner(partner: partnerData) {
      return new Promise((resolve, reject) => {
        axios.post(`partner/update/${partner.id}`, partner).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

    // Deletepartner
    Deletepartner(partner: partnerData) {
      return new Promise((resolve, reject) => {
        axios.delete(`partner/delete/${partner}`).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

  },
})
