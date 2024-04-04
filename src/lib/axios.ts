import Axios from "axios"
import { getCurrentUser } from "vuefire"

const getAccessToken = async () => {
  const user = await getCurrentUser()
  const accessToken = await user?.getIdToken()
  return accessToken
}

export const axios = Axios.create({
  baseURL: "http://localhost:8080" // todo: replace
})
axios.interceptors.request.use(async (config) => {
  const accessToken = await getAccessToken()
  config.headers.Authorization = `Bearer ${accessToken}`
  config.headers.Accept = "application/json"
  return config
})
