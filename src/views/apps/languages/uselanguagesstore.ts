import { defineStore } from 'pinia'
import type { languageData } from './types'
import axios from '@axios'

export const uselanguagesstore = defineStore('uselanguagesstore', {
  actions: {
    // 👉 Fetch all Invoices
    fetchlanguage(params: any) {
      return axios.get('language/all', { params })
    },
    fetchlevel(params: any) {
      return axios.get('level/all', { params })
    },

    // 👉 Fetch single invoice
    fetchlanguageById(id: number) {
      return axios.get(`language/${id}`)
    },

    addlanguage(language: languageData) {
      return new Promise((resolve, reject) => {
        axios.post('language/create', language).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },
    login(language: any) {
      return new Promise((resolve, reject) => {
        axios.post('auth/login', language).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },
    updatelanguage(language: languageData) {
      return new Promise((resolve, reject) => {
        axios.post(`language/update/${language.id}`, language).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

    // Deletelanguage
    Deletelanguage(language: languageData) {
      return new Promise((resolve, reject) => {
        axios.delete(`language/delete/${language}`).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

  },
})
