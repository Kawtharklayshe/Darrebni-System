import { defineStore } from 'pinia'
import type { socialMediaData } from './types'
import axios from '@axios'

export const usesocialMediastore = defineStore('usesocialMediastore', {
  actions: {
    // 👉 Fetch all Invoices
    fetchsocialMedia(params: any) {
      return axios.get('/social_media/get', { params })
    },

    // 👉 Fetch single invoice
    fetchsocialMediaById(id: number) {
      return axios.get(`social_media/${id}`)
    },
    addsocialMedia(socialMedia: socialMediaData) {
      return new Promise((resolve, reject) => {
        axios.post('/social_media/create', socialMedia).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },
    updatesocialMedia(socialMedia: socialMediaData) {
      return new Promise((resolve, reject) => {
        axios.post(`/social_media/${socialMedia.id}/update`, socialMedia).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

    // DeletesocialMedia
    DeletesocialMedia(socialMediaId: any) {
      return new Promise((resolve, reject) => {
        axios.get(`/social_media/${socialMediaId}/delete`).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

  },
})
