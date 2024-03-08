import axiosIns from '@/plugins/axios'
import { state } from '@/views/demos/forms/form-elements/textfield/demoCodeTextfield'
import { defineStore } from 'pinia'

export const useTrainerListStore = defineStore('TrainerListStore', {
  state: () => {
    return {
      trainerImage: '',
      valid: null,
    }
  },
  actions: {
    addTrainer(trainerInfo) {
      console.log(trainerInfo)
      
      return new Promise((resolve, reject) => {
        axiosIns.post('coach/store', { ...trainerInfo }).then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    getTrainers() {
      return new Promise((resolve, reject) => {
        axiosIns.get('coach/index')
          .then(response => resolve(response.data.data.data))
          .catch(error => reject(error))
      })
    },
    addTrainingBatch() {
      return new Promise((resolve, reject) => {
        axiosIns.post('TrainingBatch', { 
          name: "test12",
          TrainingBatchID: "sp012",
          price: 3000,
          currency: "$",
        }).then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    deleteTrainer(id) {
      return new Promise((resolve, reject) => {
        axiosIns.delete(`coach/delete/${id}`).then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchTrainer(id) {
      return new Promise((resolve, reject) => {
        axiosIns.get(`coach/show/${id}`)
          .then(response => resolve(response.data.data))
          .catch(error => reject(error))
      })
    },
    updateTrainer(trainerObj) {
      return new Promise((resolve, reject) => {
        axiosIns.put(`coach/update/${trainerObj.id}`,  { ...trainerObj })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
})
