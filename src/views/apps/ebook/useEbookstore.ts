import { defineStore } from 'pinia'
import type { ebookData } from './types'
import axios from '@axios'

export const useEbookstore = defineStore('useEbookstore', {
  actions: {
    // 👉 Fetch all Invoices
    fetchebook(params: any) {
      return axios.get('ebook/all', { params })
    },

    // 👉 Fetch single invoice
    fetchebookById(id: number) {
      return axios.get(`ebook/${id}`)
    },
    addebook(ebook: ebookData) {
      return new Promise((resolve, reject) => {
        axios.post('ebook/create', ebook).then(response =>

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
    login(ebook: any) {
      return new Promise((resolve, reject) => {
        axios.post('auth/login', ebook).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },
    updateebook(ebook: ebookData) {
      return new Promise((resolve, reject) => {
        axios.post(`ebook/update/${ebook.id}`, ebook).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

    // Deleteebook
    Deleteebook(ebook: ebookData) {
      return new Promise((resolve, reject) => {
        axios.delete(`ebook/delete/${ebook}`).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

  },
})
