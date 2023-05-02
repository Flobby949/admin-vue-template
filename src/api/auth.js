import axios from '@/utils/axios'

export function getCaptcha() {
  return axios.get('/sys/auth/captcha')
}

export function login(data) {
  return axios.post('/sys/auth/login', data)
}

export function logout() {
  return axios.post('/sys/auth/logout')
}

export function sendCode(mobile) {
  return axios.post(`/sys/auth/send/code?mobile=${mobile}`)
}

export function mobileLogin(data) {
  return axios.post(`/sys/auth/mobile`, data)
}
