import { defineStore } from 'pinia'
import type { quizData } from './types'
import axios from '@axios'

export const useQuizstore = defineStore('useQuizstore', {
  actions: {
    // 👉 Fetch all Invoices
    fetchquiz(params: any) {
      return axios.get(`quiz/get`, { params })
    },

    // 👉 Fetch single invoice
    fetchquizById(id: number) {
      return axios.get(`quiz/${id}`)
    },
    addquiz(quiz: quizData) {
      return new Promise((resolve, reject) => {
        axios.post('quiz/create', quiz).then(response =>

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
    login(quiz: any) {
      return new Promise((resolve, reject) => {
        axios.post('auth/login', quiz).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },
    updatequiz(quiz: quizData) {
      return new Promise((resolve, reject) => {
        axios.post(`quiz/update/${quiz.id}`, quiz).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

    // Deletequiz
    Deletequiz(quiz: quizData) {
      return new Promise((resolve, reject) => {
        axios.delete(`quiz/delete/${quiz}`).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

  },
})
