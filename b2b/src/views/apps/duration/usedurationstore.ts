import { defineStore } from 'pinia'
import type { durationData } from './types'
import axios from '@axios'

export const usedurationstore = defineStore('usedurationstore', {
  actions: {
    // 👉 Fetch all Invoices
    fetchduration(params: any) {
      return axios.get('duration/all', { params })
    },
    fetchTypes(params: any) {
      return axios.get('duration/types', { params })
    },
    // 👉 Fetch single invoice
    fetchdurationById(id: number) {
      return axios.get(`duration/${id}`)
    },
    addduration(duration: durationData) {
      return new Promise((resolve, reject) => {
        axios.post('duration/create', duration).then(response =>

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
    uploadFile( payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('upload/file', payload, { headers: { 'Content-Type': 'multipart/form-data' } })
          .then(response => resolve(response.data))
          .catch(error => reject(error))
      })
    },
    uploadVideo( payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('upload/video', payload, { headers: { 'Content-Type': 'multipart/form-data' } })
          .then(response => resolve(response.data))
          .catch(error => reject(error))
      })
    },
    login(duration: any) {
      return new Promise((resolve, reject) => {
        axios.post('auth/login', duration).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },
    updateduration(duration: durationData) {
      return new Promise((resolve, reject) => {
        axios.post(`duration/update/${duration.id}`, duration).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

    // Deleteduration
    Deleteduration(duration: durationData) {
      return new Promise((resolve, reject) => {
        axios.delete(`duration/delete/${duration}`).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

  },
})
