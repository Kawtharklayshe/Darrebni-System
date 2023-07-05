import { defineStore } from 'pinia'
import type { keywordData } from './types'
import axios from '@axios'

export const usekeywordstore = defineStore('usekeywordstore', {
  actions: {
    // 👉 Fetch all Invoices
    fetchkeyword(params: any) {
      return axios.get('keyword/all', { params })
    },
   
    // 👉 Fetch single invoice
    fetchkeywordById(id: number) {
      return axios.get(`keyword/${id}`)
    },

    addkeyword(keyword: keywordData) {
      return new Promise((resolve, reject) => {
        axios.post('keyword/create', keyword).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },
    login(keyword: any) {
      return new Promise((resolve, reject) => {
        axios.post('auth/login', keyword).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },
    updatekeyword(keyword: keywordData) {
      return new Promise((resolve, reject) => {
        axios.post(`keyword/update/${keyword.id}`, keyword).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

    // Deletekeyword
    Deletekeyword(keyword: keywordData) {
      return new Promise((resolve, reject) => {
        axios.delete(`keyword/delete/${keyword}`).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

  },
})
