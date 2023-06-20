import { defineStore } from 'pinia'
import type { categoriesData } from './types'
import axios from '@axios'

export const useCategoriesstore = defineStore('useCategoriesstore', {
  actions: {
    // 👉 Fetch all Invoices
    fetchcategories(params: any) {
      return axios.get('course/category/all', { params })
    },
    fetchlevel(params: any) {
      return axios.get('level/all', { params })
    },

    // 👉 Fetch single invoice
    fetchcategoriesById(id: number) {
      return axios.get(`course/category/${id}`)
    },

    addcategories(categories: categoriesData) {
      return new Promise((resolve, reject) => {
        axios.post('course/category/create', categories).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },
    login(categories: any) {
      return new Promise((resolve, reject) => {
        axios.post('auth/login', categories).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },
    updatecategories(categories: categoriesData) {
      return new Promise((resolve, reject) => {
        axios.post(`course/category/update/${categories.id}`, categories).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

    // Deletecategories
    Deletecategories(categories: categoriesData) {
      return new Promise((resolve, reject) => {
        axios.delete(`course/category/delete/${categories}`).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

  },
})
