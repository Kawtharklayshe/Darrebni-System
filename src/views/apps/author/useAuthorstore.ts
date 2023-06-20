import { defineStore } from 'pinia'
import type { authorData } from './types'
import axios from '@axios'

export const useAuthorstore = defineStore('useAuthorstore', {
  actions: {
    // 👉 Fetch all Invoices
    fetchauthor(params: any) {
      return axios.get('ebook/author/all', { params })
    },

    // 👉 Fetch single invoice
    fetchauthorById(id: number) {
      return axios.get(`ebook/author/${id}`)
    },
    addauthor(author: authorData) {
      return new Promise((resolve, reject) => {
        axios.post('ebook/author/create', author).then(response =>

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
    login(author: any) {
      return new Promise((resolve, reject) => {
        axios.post('auth/login', author).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },
    updateauthor(author: authorData) {
      return new Promise((resolve, reject) => {
        axios.post(`ebook/author/update/${author.id}`, author).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

    // Deleteauthor
    Deleteauthor(author: authorData) {
      return new Promise((resolve, reject) => {
        axios.delete(`ebook/author/delete/${author}`).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

  },
})
