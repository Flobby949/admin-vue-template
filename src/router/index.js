import { createRouter, createWebHistory } from 'vue-router'

import Index from '@/views/index.vue'
import Login from '@/views/login/index.vue'
import NotFound from '@/views/404.vue'
import AdminLayout from '@/layout/admin.vue'

// import Menu from '@/views/menu/index.vue'
// import Role from '@/views/role/index.vue'
import User from '@/views/user/index.vue'
// import Goods from '@/views/goods/index.vue'
// import Order from '@/views/order/index.vue'
import Notice from '@/views/notice/index.vue'
// import Docs from '@/views/docs/index.vue'
import Logs from '@/views/log/index.vue'

const routes = [
  {
    path: '/',
    name: 'admin',
    component: AdminLayout,
    children: [
      {
        path: '/',
        name: 'index',
        component: Index,
        meta: {
          title: '仪表盘'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '登录页'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: '页面不存在'
    }
  }
]

const asyncRoutes = [
  {
    path: '/',
    name: 'index',
    component: Index,
    meta: {
      title: '仪表盘'
    }
  },
  {
    path: '/sys/menu/index',
    name: 'menu',
    // component: Menu,
    meta: {
      title: '菜单管理'
    }
  },
  {
    path: '/sys/role/index',
    name: 'role',
    // component: Role,
    meta: {
      title: '角色管理'
    }
  },
  {
    path: '/sys/user/index',
    name: 'user',
    component: User,
    meta: {
      title: '用户管理'
    }
  },
  {
    path: '/goods/index',
    name: 'goods',
    // component: Goods,
    meta: {
      title: '商品管理'
    }
  },
  {
    path: '/order/index',
    name: 'order',
    // component: Order,
    meta: {
      title: '订单管理'
    }
  },
  {
    path: '/notice/index',
    name: 'notice',
    component: Notice,
    meta: {
      title: '通知管理'
    }
  },
  {
    path: '/docs/index',
    name: 'docs',
    // component: Docs,
    meta: {
      title: '接口文档'
    }
  },
  {
    path: '/sys/log/index',
    name: 'logs',
    component: Logs,
    meta: {
      title: '登录日志'
    }
  }
]

export const router = createRouter({
  routes,
  history: createWebHistory()
})

// 动态添加路由的方法
export function addRoutes(menus) {
  // 是否有新的路由
  let hasNewRoutes = false
  const findAndAddRoutesByMenus = arr => {
    arr.forEach(e => {
      if (e.children && e.children.length > 0) {
        findAndAddRoutesByMenus(e.children)
      }
      let item = asyncRoutes.find(o => o.path == e.url)
      if (item && !router.hasRoute(item.path)) {
        router.addRoute('admin', item)
        hasNewRoutes = true
      }
    })
  }
  findAndAddRoutesByMenus(menus)
  return hasNewRoutes
}

// 全局前置守卫
let hasGetInfo = false
router.beforeEach(async (to, from, next) => {
  // 显示进度条
  showFullLoading()

  const token = getToken()
  // 没有登录，强制跳转回登录页
  if (!token && to.path != '/login') {
    toast('请先登录', 'error')
    return next({ path: '/login' })
  }

  // 防止重复登录
  if (token && to.path == '/login') {
    toast('请勿重复登录', 'error')
    return next({ path: from.path ? from.path : '/' })
  }

  if (to.path == '/login') {
    hasGetInfo = false
  }

  const { getStoreInfo } = useAdminStore()
  // 如果用户登录了，则获取用户信息、菜单信息并存储在 pinia 中
  let hasNewRoutes = false
  if (token && !hasGetInfo) {
    let res = await getStoreInfo()
    hasGetInfo = true
    hasNewRoutes = addRoutes(res.nav)
  }

  // 设置页面标题
  let title = `后台系统 - ${to.meta.title || ''}`
  document.title = title

  hasNewRoutes ? next(to.fullPath) : next()
})

// 设置后置守卫
router.afterEach(() => hideFullLoading())
