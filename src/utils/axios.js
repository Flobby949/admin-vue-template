import axios from 'axios'

const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

// 添加请求拦截器
service.interceptors.request.use(
  config => {
    // 往header头自动添加token
    const token = getToken()
    if (token) {
      config.headers['Authorization'] = token
    }
    console.log('============= 请求 =============')
    console.log(config)
    console.log('============= 请求 =============')
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    if (response.status !== 200) {
      return Promise.reject(new Error(response.statusText || 'Error'))
    }
    const res = response.data
    console.log('============= 响应 =============')
    console.log(res)
    console.log('============= 响应 =============')
    // 响应成功
    if (res.code === 1) {
      //  调用的地方就不需要再解析了
      return res.data
    }
    // 错误提示
    toast(res.msg, 'error')
    if (response.config.url == '/sys/auth/login') {
      location.reload()
    }
    if (res.code === 401) {
      // 没有权限，如：未登录、登录过期等，需要跳到登录页
      setToken('')
      location.reload()
    }
    return Promise.reject(new Error(res.msg || 'Error'))
  },
  error => {
    toast(error.message)
    return Promise.reject(error)
  }
)

export default service
