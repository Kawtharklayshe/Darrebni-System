import { defineStore } from 'pinia'
import type { blogData } from './types'
import axios from '@axios'

export const useBlogstore = defineStore('useBlogstore', {
  actions: {
    // 👉 Fetch all Invoices
    fetchblog(params: any) {
      return axios.get('blog/all', { params })
    },

    // 👉 Fetch single invoice
    fetchblogById(id: number) {
      return axios.get(`blog/${id}`)
    },
    addblog(blog: blogData) {
      return new Promise((resolve, reject) => {
        axios.post('blog/create', blog).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },
    addblogCourse(blog: any) {
      return new Promise((resolve, reject) => {
        axios.post(`course/${blog.id}/sync/blog`, blog).then(response =>

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
    login(blog: any) {
      return new Promise((resolve, reject) => {
        axios.post('auth/login', blog).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },
    updateblog(blog: blogData) {
      return new Promise((resolve, reject) => {
        axios.post(`blog/update/${blog.id}`, blog).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

    // Deleteblog
    Deleteblog(blog: blogData) {
      return new Promise((resolve, reject) => {
        axios.delete(`blog/delete/${blog}`).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

  },
})
