import axios from '@axios'
import { defineStore } from 'pinia'
import { useRoute, useRouter } from 'vue-router'

// import {useRoute} from '@/router'

const route = useRoute()
const router = useRouter()

export const useLoginStore = defineStore('useLoginStore', {
  actions: {
    // 👉 Login
    login(LoginData) {
      console.log(LoginData)
      
      return new Promise((resolve, reject) => {
        axios.post('/login', {
          email: LoginData.email,
          password: LoginData.password,
        }).then(r => {
          console.log(r.data.data)
          const {  token } = r.data.data

          localStorage.setItem('token', JSON.stringify(token))
          localStorage.setItem('name', JSON.stringify(name))

          console.log(token, name)
          router.replace(route.query.to ? String(route.query.to) : '/')
        })

        // .catch(e => {
        // const { errors: formErrors } = e.response.data
      
        // errors.value = formErrors
        // console.error(e.response.data)
        // })
      })
    },

  
  } })
