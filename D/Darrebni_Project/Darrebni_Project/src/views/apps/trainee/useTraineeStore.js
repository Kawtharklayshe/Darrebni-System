import { defineStore } from 'pinia'
import axiosIns from '@axios'

export const useTraineeStore = defineStore('TraineeListStore', {
  actions: {
    // 👉 Fetch Trainees data
    fetchTraineeList() { return axiosIns.get('trainee') },

    // 👉 Add Trainee
    addTrainee(userData) {
      console.log(userData)
      return new Promise((resolve, reject) => {
        axiosIns.post(`trainee`, userData).then(response => resolve(response))
          .catch(error => reject(error))
      })
    },

    // 👉 fetch single Trainee  
    fetchTrainee() {
      return new Promise((resolve, reject) => {
        axiosIns.get(`trainee`).then(response => resolve(response)).catch(error => reject(error))
      })
    },
    fetchTraineeById(id) {
      return new Promise((resolve, reject) => {
        axiosIns.get(`trainee/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },
    updateTrainer(traineeObject) {
      return new Promise((resolve, reject) => {
        axiosIns.put(`trainee/${traineeObject.id}`, {...traineeObject}).then(response => resolve(response)).catch(error => reject(error))
      })
    },
  
    // 👉 Delete Trainee
    deleteTrainee(id) {
      return new Promise((resolve, reject) => {
        axiosIns.delete(`trainee/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },
  },
})
