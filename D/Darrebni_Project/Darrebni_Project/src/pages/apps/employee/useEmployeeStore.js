import axiosIns, { default as axios } from '@axios'
import { defineStore } from 'pinia'
export const useEmployeeListStore = defineStore('useEmployeeListStore', {
  actions: {
    // 👉 get Specializations data
    getSpecializations()
    {
      return new Promise((resolve, reject) => {
        axiosIns.get('specializetion/index').then(response =>
          { resolve(response)
          }
        )
          .catch(error => reject(error))
      })
    },
    getBranch()
    {
      return new Promise((resolve, reject) => {
        axiosIns.get('brunch/index').then(response =>
          { resolve(response)
          }
        )
          .catch(error => reject(error))
      })
    },
    // 👉 get Employees data
    getEmployees()
     { 
      return new Promise((resolve, reject) => {
        axiosIns.get('employee/index').then(response => resolve(response)
        )
          .catch(error => reject(error))
      })
    },
    // 👉 add Emplyee
    addEmployee(userData) {
      return new Promise((resolve, reject) => {
        axios.post('employee/store',userData).then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
     // 👉 update Employee
    updateEmployee(form) {
        return new Promise((resolve, reject) => {
          axios.put(`employee/update/${form.id}`, form).then(response => resolve(response))
            .catch(error => reject(error))
        })
      },

    // 👉 get Employee
    getEmployee(id) {
      return new Promise((resolve, reject) => { axios.get(`employee/show/${Number(id)}`).then(response => resolve(response)
      )
        .catch(error => reject(error))
    })
  },
    // 👉 Delete Employee
    deleteEmployee(id) {
      return new Promise((resolve, reject) => {
        axiosIns.delete(`employee/delete/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },
  }
}
)
