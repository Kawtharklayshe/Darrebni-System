// import { createLocalVue, mount } from '@vue/test-utils'

// create an extended `Vue` constructor


import jwtDefaultConfig from './jwtDefaultConfig'
// const localVue = createLocalVue()
export default class JwtService {
  // Will be used by this service for making API calls
  axiosIns = null

  // jwtConfig <= Will be used by this service
  jwtConfig = { ...jwtDefaultConfig }

  // For Refreshing Token
  isAlreadyFetchingAccessToken = false

  // For Refreshing Token
  subscribers = []

  constructor(axiosIns, jwtOverrideConfig) {
    this.axiosIns = axiosIns
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig }

    // Request Interceptor
    this.axiosIns.interceptors.request.use(
      config => {
        // Get token from localStorage
        const accessToken = this.getToken()

        // If token is present add it to request's Authorization Header
        if (accessToken)

          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`

        return config
      },
      error => Promise.reject(error),
    )

    // Add request/response interceptor
    this.axiosIns.interceptors.response.use(
      response => response,
      error => {
        // const { config, response: { status } } = error
        const { config, response } = error
        const originalRequest = config
        if (response && response.status === 403) {
          // localVue.swal({
            console.log("sssss")
          //   text: 'Email or password is not correct',
          //   icon: 'error',
          //   buttonsStyling: false,
          //   allowOutsideClick: false,
          //   confirmButtonText: 'Ok, got it!',
          //   customClass: {
          //     confirmButton: 'btn btn-primary',
          //   },
          // })
        }

        // if (status === 401) {
        if (response && response.status === 401) {
          console.log("401")
          window.location.href = "/login";
          if (!this.isAlreadyFetchingAccessToken) {
            this.isAlreadyFetchingAccessToken = true
            console.log("sssss")
            // localVue.swal({
            //   title: 'Session Expired',
            //   text: 'You have to login again',
            //   icon: 'error',
            //   buttonsStyling: false,
            //   allowOutsideClick: false,
            //   confirmButtonText: 'Ok, got it!',
            //   customClass: {
            //     confirmButton: 'btn btn-primary',
            //   },
            // }).then(() => {
            //   localStorage.removeItem(this.jwtConfig.storageTokenKeyName)
            //   localStorage.removeItem(this.jwtConfig.storageRefreshTokenKeyName)

            //   // Remove userData from localStorage
            //   localStorage.removeItem('userData')

            //   window.location.href = '/login'
            // })
          }

          return new Promise(resolve => {
            this.addSubscriber(accessToken => {
              // Make sure to assign accessToken according to your response.
              // Check: https://pixinvent.ticksy.com/ticket/2413870
              // Change Authorization header
              originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
              resolve(this.axiosIns(originalRequest))
            })
          })
        }

        return Promise.reject(error)
      },
    )
  }

  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter(callback => callback(accessToken))
  }

  addSubscriber(callback) {
    this.subscribers.push(callback)
  }

  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName)
  }

  getRefreshToken() {
    return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName)
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value)
  }

  setRefreshToken(value) {
    localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value)
  }

  login(...args) {
    return this.axiosIns.post(this.jwtConfig.loginEndpoint, ...args)
  }

  resetEmail(...args) {
    return this.axiosIns.post(this.jwtConfig.resetEmailEndpoint, ...args)
  }

  checkCode(...args) {
    return this.axiosIns.post(this.jwtConfig.checkCodeEndpoint, ...args)
  }

  resetPassword(...args) {
    return this.axiosIns.post(this.jwtConfig.resetPasswordEndpoint, ...args)
  }

  register(...args) {
    return this.axiosIns.post(this.jwtConfig.registerEndpoint, ...args)
  }

  refreshToken() {
    const formData = new FormData()
    const refreshToken = this.getRefreshToken()

    // if(refreshToken){
    formData.append('refreshToken', refreshToken)

    return this.axiosIns.post(this.jwtConfig.refreshEndpoint, formData).then(res => {
      // localVue.swal({
      //   title: 'Session Expired',
      //   text: 'You have to login again',
      //   icon: 'error',
      //   buttonsStyling: false,
      //   allowOutsideClick: false,
      //   confirmButtonText: 'Ok, got it!',
      //   customClass: {
      //     confirmButton: 'btn btn-primary',
      //   },
      // }).then(() => {
      //   localStorage.removeItem(this.jwtConfig.storageTokenKeyName)
      //   localStorage.removeItem(this.jwtConfig.storageRefreshTokenKeyName)

      //   // Remove userData from localStorage
      //   localStorage.removeItem('userData')

      //   window.location.href = '/login'
      // })
    })
  }

  // else{
  //   Vue.swal({
  //     text: "Email or password is not correct",
  //     icon: "error",
  //     buttonsStyling: false,
  //     allowOutsideClick: false,
  //     confirmButtonText: "Ok, got it!",
  //     customClass: {
  //       confirmButton: "btn btn-primary",
  //     },
  //   })
  // }
  // }
}
