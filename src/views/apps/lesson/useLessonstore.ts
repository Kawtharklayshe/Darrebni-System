import { defineStore } from 'pinia'
import type { lessonData } from './types'
import axios from '@axios'

export const useLessonstore = defineStore('useLessonstore', {
  actions: {
    // 👉 Fetch all Invoices
    fetchlesson(params: any) {
      return axios.get(`course/${params.id}/lesson/get`, { params })
    },

    // 👉 Fetch single invoice
    fetchlessonById(id: number) {
      return axios.get(`course/lesson/${id}`)
    },
    addlesson(lesson: lessonData) {
      return new Promise((resolve, reject) => {
        axios.post('course/lesson/create', lesson).then(response =>

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
    login(lesson: any) {
      return new Promise((resolve, reject) => {
        axios.post('course/auth/login', lesson).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },
    updatelesson(lesson: lessonData) {
      return new Promise((resolve, reject) => {
        axios.post(`course/lesson/update/${lesson.id}`, lesson).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

    // Deletelesson
    Deletelesson(lesson: lessonData) {
      return new Promise((resolve, reject) => {
        axios.delete(`course/lesson/delete/${lesson}`).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

  },
})
