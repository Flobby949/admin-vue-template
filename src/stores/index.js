export const useAdminStore = defineStore('admin', {
  state: () => ({
    adminInfo: {},
    menus: [],
    authorities: [],
    sideWidth: '220px'
  }),
  actions: {
    // 登录
    storeLogin(username, password) {
      return new Promise((resolve, reject) => {
        login(username, password)
          .then(res => {
            setToken(res.accessToken)
            resolve(res)
          })
          .catch(err => reject(err))
      })
    },
    // 手机号登录
    storeMobileLogin(form) {
      return new Promise((resolve, reject) => {
        mobileLogin(form)
          .then(res => {
            setToken(res.accessToken)
            resolve(res)
          })
          .catch(err => reject(err))
      })
    },
    // 获取当前登录者信息
    getStoreInfo() {
      return new Promise((resolve, reject) => {
        getInfo()
          .then(res => {
            this.adminInfo = res.user
            this.menus = res.nav
            this.authorities = res.authority
            resolve(res)
          })
          .catch(err => reject(err))
      })
    },
    // 退出登录
    storeLogout() {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            removeToken()
            removeTabList()
            this.adminInfo = {}
            resolve()
          })
          .catch(err => reject(err))
      })
    },
    // 伸缩
    handleSideWidth() {
      this.sideWidth = this.sideWidth === '220px' ? '64px' : '220px'
    }
  }
})
