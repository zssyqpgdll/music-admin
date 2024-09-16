import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service_dc = axios.create({
  baseURL: process.env.VUE_APP_DC_BASE_API , // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service_dc.interceptors.request.use(
  config => {
    // do something before request is sent
    config.headers['appId'] = "10ec8da1d801a90a9c5a0cc56ec7ce4a"
    config.headers['userName'] = "sjfx"
    config.headers['password'] = "000000"
    // config.headers['Cookie'] = "JSESSIONID=D578F087EAB91814795B728F128243C0"
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service_dc.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    return res
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service_dc
