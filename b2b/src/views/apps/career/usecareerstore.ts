import { defineStore } from 'pinia'
import type { careerData } from './types'
import axios from '@axios'

export const usecareerstore = defineStore('usecareerstore', {
  actions: {
    // 👉 Fetch all Invoices
    fetchcareer(params: any) {
      return axios.get(`career/all`, { params })
    },
    fetchcareerData() {
      return axios.get(`career/get-form-data`)
    },
    // 👉 Fetch single invoice

    fetchcareerById(id: number) {
      return axios.get(`career/${id}`)
    },
    addcareer(career: careerData) {
      return new Promise((resolve, reject) => {
        axios.post('career/create', career).then(response =>

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
    login(career: any) {
      return new Promise((resolve, reject) => {
        axios.post('auth/login', career).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },
    updatecareer(career: careerData) {
      return new Promise((resolve, reject) => {
        axios.post(`career/update/${career.id}`, career).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

    // Deletecareer
    Deletecareer(career: careerData) {
      return new Promise((resolve, reject) => {
        axios.delete(`career/delete/${career}`).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

  },
})
