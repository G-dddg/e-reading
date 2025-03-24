import axios from 'axios'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
import router from '@/router'

const baseURL = 'http://localhost:3000'
const request = axios.create({
  baseURL,
  timeout: 5000
})
// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const useStore = useUserStore()
    if (useStore.token) {
      config.headers.Authorization = useUserStore.token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// 响应拦截器
request.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data
    }
    ElMessage.error(response.data.message || '服务异常')
    return Promise.reject(response.data)
  },
  (error) => {
    ElMessage.error(error.response.data.message || '服务异常')
    if (error.response?.status === 401) {
      router.push('/login')
    }
    return Promise.reject(error)
  }
)
export default request
export { baseURL }
