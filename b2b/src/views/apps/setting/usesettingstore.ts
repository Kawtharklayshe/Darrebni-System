import { defineStore } from 'pinia'
import type { settingData } from './types'
import axios from '@axios'

export const usesettingstore = defineStore('usesettingstore', {
  actions: {
    // 👉 Fetch all Invoices
    fetchsetting(params: any) {
      return axios.get('setting/all', { params })
    },
    fetchTypes(params: any) {
      return axios.get('setting/types', { params })
    },
    // 👉 Fetch single invoice
    fetchsettingById(id: number) {
      return axios.get(`setting/${id}`)
    },
    addsetting(setting: settingData) {
      return new Promise((resolve, reject) => {
        axios.post('setting/create-or-update', setting).then(response =>

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
    login(setting: any) {
      return new Promise((resolve, reject) => {
        axios.post('auth/login', setting).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },
    updatesetting(setting: settingData) {
      return new Promise((resolve, reject) => {
        axios.post(`setting/create-or-update/${setting.type}`, setting).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

    // Deletesetting
    Deletesetting(setting: settingData) {
      return new Promise((resolve, reject) => {
        axios.delete(`setting/delete/${setting}`).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

  },
})
