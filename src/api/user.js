import axios from '@/utils/axios'

export function getLogs(page, limit, params) {
  return axios.get('/sys/log/page', { params: { page, limit, ...params } })
}

export function getInfo() {
  return axios.post('/sys/user/info')
}

export function rePassword(data) {
  return axios.post('/sys/user/password', data)
}

export function getUserPage(page, limit, params) {
  return axios.get('/sys/user/page', { params: { page, limit, ...params } })
}

export function getInfoById(id) {
  return axios.get(`/sys/user/${id}`)
}

export function saveInfo(data) {
  return axios.post('/sys/user', data)
}

export function updateInfo(data) {
  return axios.put('/sys/user', data)
}

export function deleteUser(ids) {
  ids = Array.isArray(ids) ? ids : [ids]
  return axios.delete('/sys/user', { data: ids })
}

export function exportUser() {
  const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { Authorization: getToken() }
  })

  return http({
    method: 'get',
    url: '/sys/user/export',
    responseType: 'blob'
  })
}

export function changeStatus(id, status) {
  return axios.post(`/sys/user/status?id=${id}&status=${status}`)
}
