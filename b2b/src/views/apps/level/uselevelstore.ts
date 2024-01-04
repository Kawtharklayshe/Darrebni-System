import { defineStore } from 'pinia'
import type { levelData } from './types'
import axios from '@axios'

export const uselevelstore = defineStore('uselevelstore', {
  actions: {
    // 👉 Fetch all Invoices
    fetchlevel(params: any) {
      return axios.get('level/all', { params })
    },
   
    // 👉 Fetch single invoice
    fetchlevelById(id: number) {
      return axios.get(`level/${id}`)
    },

    addlevel(level: levelData) {
      return new Promise((resolve, reject) => {
        axios.post('level/create', level).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },
    login(level: any) {
      return new Promise((resolve, reject) => {
        axios.post('auth/login', level).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },
    updatelevel(level: levelData) {
      return new Promise((resolve, reject) => {
        axios.post(`level/update/${level.id}`, level).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

    // Deletelevel
    Deletelevel(level: levelData) {
      return new Promise((resolve, reject) => {
        axios.delete(`level/delete/${level}`).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

  },
})
