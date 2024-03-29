import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    WindiCSS(),
    AutoImport({
      // 自动导入vue相关的Api
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        'pinia',
        // 自定义 ：https://github.com/antfu/unplugin-auto-import#configurations
        {
          // onBeforeRouteLeave 'vue-router’的这个Api未被自动导入，在这里补充
          'vue-router': ['onBeforeRouteLeave', 'onBeforeRouteUpdate'],
          '@/stores': ['useAdminStore'],
          '@/router': ['addRoutes'],
          '@/utils/tools': ['toast', 'showModal', 'showFullLoading', 'hideFullLoading', 'msg', 'queryParams'],
          '@/utils/storage': ['getToken', 'setToken', 'removeToken', 'getTabList', 'setTabList', 'removeTabList'],
          '@/api/auth': ['login', 'logout', 'getCaptcha', 'sendCode', 'mobileLogin'],
          '@/api/user': [
            'getInfo',
            'rePassword',
            'getLogs',
            'getUserPage',
            'getInfoById',
            'saveInfo',
            'updateInfo',
            'deleteUser',
            'exportUser',
            'changeStatus'
          ],
          '@/api/menu': [
            'getNav',
            'getAuthority',
            'getMenuList',
            'getMenuInfo',
            'createMenu',
            'updateMenu',
            'deleteMenu'
          ],
          '@/api/notice': ['getNoticePage', 'saveNotice', 'updateNotice', 'deleteNotice', 'deleteBatch'],
          '@/api/index': ['getStatistics1', 'getStatistics2', 'getStatistics3'],
          '@/api/role': [
            'getRoleList',
            'getRoleInfo',
            'createRole',
            'updateRole',
            'deleteRole',
            'setRoleMenus',
            'getAllRoleList'
          ],
          '@/hooks/useAuth': ['useAccountLogin', 'useLogout', 'useMobileLogin'],
          '@/hooks/useAdmin': ['usePassword'],
          '@/hooks/useBreadCrumbs': ['useBreadCrumbs'],
          '@/hooks/useCrud': ['useInitTable', 'useInitForm']
        }
      ],
      // 指定文件夹位置， 加 /** 可遍历子目录
      dirs: ['src/hooks'],
      // 生成 auto-import.d.ts 声明文件
      dts: 'src/auto-import.d.ts',
      // 解析 ElementPlus
      resolvers: [
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        ElementPlusResolver(),
        // 自动导入图标组件
        IconResolver({ prefix: 'Icon' })
      ]
    }),
    Components({
      // 指定组件所在文件夹的位置，默认是 src/components，可以自行扩充
      dirs: ['src/components', 'src/layout/components'],
      // 解析 ElementPlus
      resolvers: [
        ElementPlusResolver(),
        // 自动注册图标组件
        IconResolver({ enabledCollections: ['ep'] })
      ],
      // 组件的有效文件扩展名
      extensions: ['vue'],
      // 配置 type 文件生成位置，生成 components.d.ts; 可以设置为 false
      dts: 'src/components.d.ts',
      // 遍历子目录
      deep: true
    }),
    // 自动安装图标
    Icons({
      autoInstall: true
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3000, // 端口号
    open: true // 是否自动打开浏览器
  }
})
