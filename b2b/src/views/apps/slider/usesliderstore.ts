import { defineStore } from 'pinia'
import type { sliderData } from './types'
import axios from '@axios'

export const usesliderstore = defineStore('usesliderstore', {
  actions: {
    // 👉 Fetch all Invoices
    fetchslider(params: any) {
      return axios.get('slider/all', { params })
    },
    fetchTypes(params: any) {
      return axios.get('slider/types', { params })
    },
    // 👉 Fetch single invoice
    fetchsliderById(id: number) {
      return axios.get(`slider/${id}`)
    },
    addslider(slider: sliderData) {
      return new Promise((resolve, reject) => {
        axios.post('slider/create', slider).then(response =>

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
    login(slider: any) {
      return new Promise((resolve, reject) => {
        axios.post('auth/login', slider).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },
    updateslider(slider: sliderData) {
      return new Promise((resolve, reject) => {
        axios.post(`slider/update/${slider.id}`, slider).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

    // Deleteslider
    Deleteslider(slider: sliderData) {
      return new Promise((resolve, reject) => {
        axios.delete(`slider/delete/${slider}`).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

  },
})
