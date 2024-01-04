import type { UserProperties } from '@/@fake-db/types'
import type { UserParams } from '@/views/apps/user/types'
import axios from '@axios'
import type { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'

export const useUserListStore = defineStore('UserListStore', {
  actions: {

    // 👉 Fetch users data
    fetchUsers(params: UserParams) { return axios.get('/user/all', { params }) },

    // 👉 Add User
    addUser(userData: UserProperties) {
      return new Promise((resolve, reject) => {
  
        axios.post('/user/create', userData).then(response =>

          resolve(response))
          .catch(error => reject(error))
      })
    },
    UpdateUser(userData: UserProperties) {
      return new Promise((resolve, reject) => {
      

        axios.post(`/user/update/${userData.id}`, userData).then(response => resolve(response))
          .catch(error => reject(error))
      })
    },

    // DeleteUser
    async DeleteUser(userId: number) {
      return axios.get(`/user/${userId}/delete`)
    },

    // 👉 fetch single user
    fetchUser(id: number) {
      return new Promise<AxiosResponse>((resolve, reject) => {
        axios.get(`/user/${id}`).then(response => resolve(response.data)).catch(error => reject(error))
      })
    },
  },
})
