import { defineStore } from 'pinia'
import type { bootcampData } from './types'
import axios from '@axios'

export const usebootcampstore = defineStore('usebootcampstore', {
  actions: {
    // 👉 Fetch all Invoices
    fetchbootcamp(params: any) {
      return axios.get('bootcamp/all', { params })
    },

    // 👉 Fetch single invoice
    fetchbootcampById(id: number) {
      return axios.get(`bootcamp/${id}`)
    },
    addbootcamp(bootcamp: bootcampData) {
      return new Promise((resolve, reject) => {
        axios.post('bootcamp/create', bootcamp).then(response =>

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
    login(bootcamp: any) {
      return new Promise((resolve, reject) => {
        axios.post('auth/login', bootcamp).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },
    updatebootcamp(bootcamp: bootcampData) {
      return new Promise((resolve, reject) => {
        axios.post(`bootcamp/update/${bootcamp.id}`, bootcamp).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

    // Deletebootcamp
    Deletebootcamp(bootcamp: bootcampData) {
      return new Promise((resolve, reject) => {
        axios.delete(`bootcamp/delete/${bootcamp}`).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

  },
})
