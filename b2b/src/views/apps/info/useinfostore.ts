import { defineStore } from 'pinia'
import type { infoData } from './types'
import axios from '@axios'

export const useinfostore = defineStore('useinfostore', {
  actions: {
    // 👉 Fetch all Invoices
    fetchinfo(params: any) {
      return axios.get('info/get', { params })
    },

    // 👉 Fetch single invoice
    fetchinfoById(id: number) {
      return axios.get(`info/get`)
    },
    addinfo(info: infoData) {
      return new Promise((resolve, reject) => {
        axios.post('info/create', info).then(response =>

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
    login(info: any) {
      return new Promise((resolve, reject) => {
        axios.post('auth/login', info).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },
    updateinfo(info: infoData) {
      return new Promise((resolve, reject) => {
        axios.post(`info/update`, info).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

    // Deleteinfo
    Deleteinfo(info: infoData) {
      return new Promise((resolve, reject) => {
        axios.delete(`info/delete/${info}`).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

  },
})
