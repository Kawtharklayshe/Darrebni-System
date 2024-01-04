import { defineStore } from 'pinia'
import type { trainerData } from './types'
import axios from '@axios'

export const usetrainerstore = defineStore('usetrainerstore', {
  actions: {
    // 👉 Fetch all Invoices
    fetchtrainer(params: any) {
      return axios.get('trainer/all', { params })
    },

    // 👉 Fetch single invoice
    fetchtrainerById(id: number) {
      return axios.get(`trainer/${id}`)
    },
    addtrainer(trainer: trainerData) {
      return new Promise((resolve, reject) => {
        axios.post('trainer/create', trainer).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },
    addTrainerCourse(trainer: any) {
      return new Promise((resolve, reject) => {
        axios.post(`course/${trainer.id}/sync/trainer`, trainer).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },
    addTrainerLangs(trainer: any) {
      return new Promise((resolve, reject) => {
        axios.post(`language/${trainer.id}/sync/trainer`, trainer).then(response =>

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
    login(trainer: any) {
      return new Promise((resolve, reject) => {
        axios.post('auth/login', trainer).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },
    updatetrainer(trainer: trainerData) {
      return new Promise((resolve, reject) => {
        axios.post(`trainer/update/${trainer.id}`, trainer).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

    // Deletetrainer
    Deletetrainer(trainer: trainerData) {
      return new Promise((resolve, reject) => {
        axios.delete(`trainer/delete/${trainer}`).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

  },
})
