import nprogress from 'nprogress'

// 封装消息提示组件
export function toast(message, type = 'success', duration = 1000) {
  ElNotification({
    message,
    type,
    duration
  })
}

// 封装模态弹框组件
export function showModal(content = '提示内容', type = 'warning', title = '') {
  return ElMessageBox.confirm(content, title, {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type
  })
}

// 全局显示进度条
export function showFullLoading() {
  nprogress.start()
}

// 全局隐藏进度条
export function hideFullLoading() {
  nprogress.done()
}

// 全局消息提示
export function msg(message = '消息提示', type = 'success', duration = 1000) {
  ElMessage({
    message,
    type,
    duration
  })
}
