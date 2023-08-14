import { defineStore } from 'pinia'
import type { tagData } from './types'
import axios from '@axios'

export const usetagstore = defineStore('usetagstore', {
  actions: {
    // 👉 Fetch all Invoices
    fetchtag(params: any) {
      return axios.get('tag/all', { params })
    },
    fetchlevel(params: any) {
      return axios.get('level/all', { params })
    },

    // 👉 Fetch single invoice
    fetchtagById(id: number) {
      return axios.get(`tag/${id}`)
    },
    uploadImage( payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('upload/image', payload, { headers: { 'Content-Type': 'multipart/form-data' } })
          .then(response => resolve(response.data))
          .catch(error => reject(error))
      })
    },
    addtag(tag: tagData) {
      return new Promise((resolve, reject) => {
        axios.post('tag/create', tag).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },
    addTagCourse(tag: any) {
      return new Promise((resolve, reject) => {
        axios.post(`tag/course/${tag.id}/sync`, tag).then(response =>

          resolve(response))
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
