import { defineStore } from 'pinia'
import type { categoriesData } from './types'
import axios from '@axios'

export const useCategorieBlogsstore = defineStore('useCategorieBlogsstore', {
  actions: {
    // 👉 Fetch all Invoices
    fetchcategories(params: any) {
      return axios.get('blog/category/all', { params })
    },
    fetchlevel(params: any) {
      return axios.get('level/all', { params })
    },

    // 👉 Fetch single invoice
    fetchcategoriesById(id: number) {
      return axios.get(`blog/category/${id}`)
    },

    addcategories(categories: categoriesData) {
      return new Promise((resolve, reject) => {
        axios.post('blog/category/create', categories).then(response =>

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
        axios.post(`blog/category/update/${categories.id}`, categories).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

    // Deletecategories
    Deletecategories(categories: categoriesData) {
      return new Promise((resolve, reject) => {
        axios.delete(`blog/category/delete/${categories}`).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

  },
})
