import { defineStore } from 'pinia'
import type { assignmentData } from './types'
import axios from '@axios'

export const useassignmentstore = defineStore('useassignmentstore', {
  actions: {
    // 👉 Fetch all Invoices
    fetchassignment(params: any) {
      return axios.get(`course/${params.id}/assignment/get`, { params })
    },

    // 👉 Fetch single invoice
    fetchassignmentById(id: number) {
      return axios.get(`course/assignment/${id}`)
    },
    addassignment(assignment: assignmentData) {
      return new Promise((resolve, reject) => {
        axios.post('course/assignment/create', assignment).then(response =>

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
    login(assignment: any) {
      return new Promise((resolve, reject) => {
        axios.post('course/auth/login', assignment).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },
    updateassignment(assignment: assignmentData) {
      return new Promise((resolve, reject) => {
        axios.post(`course/assignment/update/${assignment.id}`, assignment).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

    // Deleteassignment
    Deleteassignment(assignment: assignmentData) {
      return new Promise((resolve, reject) => {
        axios.delete(`course/assignment/delete/${assignment}`).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },

  },
})
