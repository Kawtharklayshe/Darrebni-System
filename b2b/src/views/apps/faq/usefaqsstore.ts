import { defineStore } from 'pinia'

import axios from '@axios'

export const usefaqsstore = defineStore('faqsStore', {
  actions: {
    // 👉 Fetch all Invoices
    fetchfaqs(params: any) {
      return axios.get(`/faq/get`, { params })
    },

    // 👉 Fetch single invoice
    fetchfaqsById(id: number) {
      return axios.get(`faq/${id}`)
    },
    addfaqs(faqs: any) {
      
      return new Promise((resolve, reject) => {
        axios.post('/faq/create', faqs).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },
    updatefaqs(faqs: any) {
     

      return new Promise((resolve, reject) => {
        axios.post(`/faq/update/${faqs.id}`, faqs).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

    // Deletefaqs
    Deletefaqs(faqs) {
      return new Promise((resolve, reject) => {
        axios.delete(`/faq/delete/${faqs}`).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

  

  },
})
