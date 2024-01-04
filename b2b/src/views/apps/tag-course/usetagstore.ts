import { defineStore } from 'pinia'
import type { tagData } from './types'
import axios from '@axios'

export const usetagCoursestore = defineStore('usetagCoursestore', {
  actions: {
    // 👉 Fetch all Invoices
    fetchtag(params: any) {
      return axios.get(`${params.id}/tag/get`, { params })
    },

    // 👉 Fetch single invoice
    fetchtagById(id: number) {
      return axios.get(`tag/${id}`)
    },
    addtag(tag: tagData) {
      return new Promise((resolve, reject) => {
        axios.post('tag/create', tag).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },
    addCourseTaG(tag: any) {
      return new Promise((resolve, reject) => {
        axios.post(`tag/${tag.id}/sync.course`, tag).then(response =>

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
    login(tag: any) {
      return new Promise((resolve, reject) => {
        axios.post('auth/login', tag).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },
    updatetag(tag: tagData) {
      return new Promise((resolve, reject) => {
        axios.post(`tag/update/${tag.id}`, tag).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

    // Deletetag
    Deletetag(tag: tagData) {
      return new Promise((resolve, reject) => {
        axios.delete(`tag/delete/${tag}`).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

  },
})
