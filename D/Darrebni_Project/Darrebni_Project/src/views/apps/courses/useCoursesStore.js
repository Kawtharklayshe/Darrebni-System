import axiosIns from '@/plugins/axios'
import { defineStore } from 'pinia'

export const useCoursesStore = defineStore('useCoursesStore', {
  actions: {
    // 👉

    // 👉 fetch all Specialization
    fetchAllCourses() {
      
      return new Promise((resolve, reject) => {
        axiosIns.get(`/course`).then(response =>  {
          resolve(response.data.data.data)}).catch(error => reject(error))
      })
    },

    // 👉 Add Specialization
    addCourse(CourseData) {
      return new Promise((resolve, reject) => {
        axiosIns.post('/course', CourseData,
        ).then(response => resolve(response))
          .catch(error => reject(error))
      })
    },

    //update 
    updateCourse(id, CourseData) {
      return new Promise((resolve, reject) => {
        axiosIns.put(`/course/${id}`,
          CourseData,
        ).then(response => resolve(response)).catch(error => reject(error))
      })
    },

    // 👉 fetch single 
    fetchCourse(id) {
      return new Promise((resolve, reject) => {
        axiosIns.get(`/course/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },

    // 👉 Delete Specialization
    deleteCourse(id) {
      return new Promise((resolve, reject) => {
        axiosIns.delete(`/course/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },
  },
})
