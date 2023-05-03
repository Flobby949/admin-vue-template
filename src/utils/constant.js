import { getToken } from '@/utils/storage'

/**
 * 常量
 */
export default {
  // API地址
  apiUrl: import.meta.env.VITE_API_URL,

  // 文件上传地址
  uploadUrl: import.meta.env.VITE_API_URL + '/sys/file/upload?accessToken=' + getToken(),

  // 导入用户 excel 文件
  uploadUserExcelUrl: import.meta.env.VITE_API_URL + '/sys/user/import?accessToken=' + getToken(),

  // 环境变量
  env: {
    DEV: import.meta.env.DEV,
    PROD: import.meta.env.PROD
  }
}
