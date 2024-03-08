import axiosIns from '@/plugins/axios'
import { defineStore } from 'pinia'


export const useSpecializationsStore = defineStore('useSpecializationsStore', {
  actions: {
   
    // 👉 fetch all Specialization
    fetchAllSpecializetion() {
    
      return new Promise((resolve, reject) => {
        axiosIns.get(`specializetion/index`).
          then(response =>  {
            resolve(response.data.data.data)
          }).
          catch(error => reject(error))
      })
      
 
    },

    // 👉 Add Specialization
    addSpecialization(SpecializationData) {
    
      
      return new Promise((resolve, reject) => {
        axiosIns.post('/specializetion/store', {
          name: SpecializationData.name,
        }).then(response => resolve(response))
          .catch(error => reject(error))
      })
    },

    //update 
    updateSpecializetion(id, SpecializationData) {
      return new Promise((resolve, reject) => {
        axiosIns.put(`/specializetion/update/${id}`,
          { name: SpecializationData.name },
        ).then(response => resolve(response)).catch(error => reject(error))
      })
    },



    // 👉 fetch single Specialization
    fetchSpecializetion(id) {
      return new Promise((resolve, reject) => {
        axiosIns.get(`/specializetion/index/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },

    // 👉 Delete Specialization
    deleteSpecializetion(id) {
      return new Promise((resolve, reject) => {
        axiosIns.delete(`/specializetion/delete/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },
  },
})
