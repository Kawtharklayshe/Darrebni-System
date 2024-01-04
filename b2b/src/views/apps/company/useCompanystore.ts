import { defineStore } from 'pinia'
import type { companyData } from './types'
import axios from '@axios'

export const useCompanystore = defineStore('useCompanystore', {
  actions: {
    // 👉 Fetch all Invoices
    fetchcompany(params: any) {
      return axios.get('course/company/all', { params })
    },
    fetchcompanyCategory(params: any) {
      return axios.get('course/category/categorize')
    },

    // 👉 Fetch single invoice
    fetchcompanyById(id: number) {
      return axios.get(`course/company/${id}`)
    },
    addcompany(company: companyData) {
      return new Promise((resolve, reject) => {
        axios.post('course/company/create', company).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

    uploadImage( payload:any) {
      return new Promise((resolve, reject) => {
        axios
          .post('upload/image', payload, { headers: { 'Content-Type': 'multipart/form-data' } })
          .then(response => resolve(response.data))
          .catch(error => reject(error))
      })
    },
    
    login(company: any) {
      return new Promise((resolve, reject) => {
        axios.post('auth/login', company).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },
    updatecompany(company: companyData) {
      return new Promise((resolve, reject) => {
        axios.post(`course/company/update/${company.id}`, company).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

    // Deletecompany
    Deletecompany(company: companyData) {
      return new Promise((resolve, reject) => {
        axios.delete(`course/company/delete/${company}`).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

  },
})
