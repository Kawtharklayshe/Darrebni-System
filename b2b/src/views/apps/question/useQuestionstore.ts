import { defineStore } from 'pinia'
import type { questionData } from './types'
import axios from '@axios'

export const useQuestionstore = defineStore('useQuestionstore', {
  actions: {
    // 👉 Fetch all Invoices
    fetchquestion(params: any) {
      return axios.get(`${params.id}/question/get`, { params })
    },

    // 👉 Fetch single invoice
    fetchquestionById(id: number) {
      return axios.get(`question/${id}`)
    },
    addquestion(question: questionData) {
      return new Promise((resolve, reject) => {
        axios.post('question/create', question).then(response =>

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
    login(question: any) {
      return new Promise((resolve, reject) => {
        axios.post('auth/login', question).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },
    updatequestion(question: questionData) {
      return new Promise((resolve, reject) => {
        axios.post(`question/update/${question.id}`, question).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

    // Deletequestion
    Deletequestion(question: questionData) {
      return new Promise((resolve, reject) => {
        axios.delete(`question/delete/${question}`).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

  },
})
