import axios from 'axios'
import { getToken } from './auth'

const requestBaseURL = process.env.VUE_APP_MODE === "development" ? '' : '/pro-api'

const request = axios.create({
  baseURL: requestBaseURL,
  timeout: 5000
})

//请求拦截器
request.interceptors.request.use(request => {
  //从localStorage获取token并添加到headers
  const token = getToken()
  if(token) {
    request.headers.common['Authorization'] = 'Bearer ' + token
  }
  return request
})

export default request
