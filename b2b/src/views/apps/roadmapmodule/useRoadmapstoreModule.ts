import { defineStore } from 'pinia'
import type { roadmapData } from './types'
import axios from '@axios'

export const useRoadmapstoreModule = defineStore('useRoadmapstoreModule', {
  actions: {
    // 👉 Fetch all Invoices
    fetchroadmap(params: any) {
      return axios.get('roadmap/all', { params })
    },

    // 👉 Fetch single invoice
    fetchroadmapById(id: number) {
      return axios.get(`roadmap/${id}`)
    },
    addroadmap(roadmap: roadmapData) {
      return new Promise((resolve, reject) => {
        axios.post('roadmap/create', roadmap).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },
    addroadmapCourse(roadmap: any) {
      return new Promise((resolve, reject) => {
        axios.post(`course/${roadmap.id}/sync/roadmap`, roadmap).then(response =>

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
    login(roadmap: any) {
      return new Promise((resolve, reject) => {
        axios.post('auth/login', roadmap).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },
    updateroadmap(roadmap: roadmapData) {
      return new Promise((resolve, reject) => {
        axios.post(`roadmap/update/${roadmap.id}`, roadmap).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

    // Deleteroadmap
    Deleteroadmap(roadmap: number) {
      return new Promise((resolve, reject) => {
        axios.delete(`roadmap/delete/${roadmap}`).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

  },
})
