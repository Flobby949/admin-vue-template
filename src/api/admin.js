import axios from '@/utils/axios'

export function getInfo() {
  return axios.post('/sys/user/info')
}

export function rePassword(data) {
  return axios.post('/sys/user/password', data)
}

export function getLogs(page, limit, params) {
  let url = `/sys/log/page`
  return axios.get(url, { params: { page, limit, ...params } })
}
