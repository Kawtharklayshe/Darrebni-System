import { defineStore } from 'pinia'
import type { courseData } from './types'
import axios from '@axios'

export const useCourseStore = defineStore('useCourseStore', {
  actions: {
    // 👉 Fetch all Invoices
    fetchcourse(params: any) {
      return axios.get('course/all', { params })
    },

    // 👉 Fetch single invoice
    fetchcourseById(id: number) {
      return axios.get(`course/${id}`)
    },
    addcourse(course: courseData) {
      return new Promise((resolve, reject) => {
        axios.post('course/create', course).then(response =>

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
    login(course: any) {
      return new Promise((resolve, reject) => {
        axios.post('auth/login', course).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },
    updatecourse(course: courseData) {
      return new Promise((resolve, reject) => {
        axios.post(`course/update/${course.id}`, course).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

    // Deletecourse
    Deletecourse(course: courseData) {
      return new Promise((resolve, reject) => {
        axios.delete(`course/delete/${course}`).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

  },
})
