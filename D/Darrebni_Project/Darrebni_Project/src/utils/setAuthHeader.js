import axiosIns from "../plugins/axios"

const setAuthHeader = token => {
  if(token) {
    axiosIns.defaults.headers = {
      Authorization: "Bearer " + token,
    }
  } else {
    delete axiosIns.defaults.headers.Authorization
  }
}

export default setAuthHeader
