import { defineStore } from 'pinia'
import type { eventData } from './types'
import axios from '@axios'

export const useEventstore = defineStore('useEventstore', {
  actions: {
    // 👉 Fetch all Invoices
    fetchevent(params: any) {
      return axios.get('event/all', { params })
    },

    // 👉 Fetch single invoice
    fetcheventById(id: number) {
      return axios.get(`event/${id}`)
    },
    addevent(event: eventData) {
      return new Promise((resolve, reject) => {
        axios.post('event/create', event).then(response =>

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
    login(event: any) {
      return new Promise((resolve, reject) => {
        axios.post('auth/login', event).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },
    updateevent(event: eventData) {
      return new Promise((resolve, reject) => {
        axios.post(`event/update/${event.id}`, event).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

    // Deleteevent
    Deleteevent(event: eventData) {
      return new Promise((resolve, reject) => {
        axios.delete(`event/delete/${event}`).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

  },
})
