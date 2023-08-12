import { defineStore } from 'pinia'
import type { adsData } from './types'
import axios from '@axios'

export const useadsstore = defineStore('useadsstore', {
  actions: {
    // 👉 Fetch all Invoices
    fetchads(params: any) {
      return axios.get('ads/all', { params })
    },

    // 👉 Fetch single invoice
    fetchadsById(id: number) {
      return axios.get(`ads/${id}`)
    },
    addads(ads: adsData) {
      return new Promise((resolve, reject) => {
        axios.post('ads/create', ads).then(response =>

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
    login(ads: any) {
      return new Promise((resolve, reject) => {
        axios.post('auth/login', ads).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },
    updateads(ads: adsData) {
      return new Promise((resolve, reject) => {
        axios.post(`ads/update/${ads.id}`, ads).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

    // Deleteads
    Deleteads(ads: adsData) {
      return new Promise((resolve, reject) => {
        axios.delete(`ads/delete/${ads}`).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

  },
})
