import axios from '@/utils/axios'

export function getNoticePage(page, limit, params) {
  return axios.get(`/sys/notice/page`, { params: { page, limit, ...params } })
}

export function saveNotice(data) {
  return axios.post('/sys/notice', data)
}

export function updateNotice(data) {
  return axios.put('/sys/notice', data)
}

export function deleteNotice(id) {
  return axios.delete(`/sys/notice/${id}`)
}

export function deleteBatch(ids) {
  return axios.delete(`/sys/notice/batch`, ids)
}
