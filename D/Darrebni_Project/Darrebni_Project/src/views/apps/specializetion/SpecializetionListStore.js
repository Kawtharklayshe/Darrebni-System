import { defineStore } from 'pinia'
import axiosIns from '../../../plugins/axios'

export const useSpecializetionListStore = defineStore('SpecializetionListStore', {
  actions: {
    // add new specializetion
    addSpecialzetion(specializetionName) {
      return new Promise((resolve, reject) => {
        axiosIns.post('specializetion/store', {
          name: specializetionName,
        }).then(response => resolve(response))
          .catch(error => reject(error))
      })
    },


    // // 👉 Fetch users data
    // fetchSpecialzetion(params) { return axios.get('/apps/specialzetion/add/UseInfoSpecialzetion', { params }) },

    // // 👉 Add User

    // // 👉 fetch single user
    // fetchSpecialzetion(id) {
    //   return new Promise((resolve, reject) => {
    //     axios.get(`/apps/specialzetion/add/${id}`).then(response => resolve(response)).catch(error => reject(error))
    //   })
    // },

    // // 👉 Delete User
    // deleteSpecialzetion(id) {
    //   return new Promise((resolve, reject) => {
    //     axios.delete(`/apps/specialzetion/add/${id}`).then(response => resolve(response)).catch(error => reject(error))
    //   })
    // },
  },
})
