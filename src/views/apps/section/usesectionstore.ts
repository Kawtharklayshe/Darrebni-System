import { defineStore } from 'pinia'
import type { sectionData } from './types'
import axios from '@axios'

export const usesectionstore = defineStore('usesectionstore', {
  actions: {
    // 👉 Fetch all Invoices
    fetchsection(params: any) {
      return axios.get('section/all', { params })
    },
    fetchTypes(params: any) {
      return axios.get('section/types', { params })
    },
    // 👉 Fetch single invoice
    fetchsectionById(id: number) {
      return axios.get(`section/${id}`)
    },
    addsection(section: sectionData) {
      return new Promise((resolve, reject) => {
        axios.post('section/create', section).then(response =>

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
    login(section: any) {
      return new Promise((resolve, reject) => {
        axios.post('auth/login', section).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },
    updatesection(section: sectionData) {
      return new Promise((resolve, reject) => {
        axios.post(`section/update/${section.id}`, section).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

    // Deletesection
    Deletesection(section: sectionData) {
      return new Promise((resolve, reject) => {
        axios.delete(`section/delete/${section}`).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

  },
})
