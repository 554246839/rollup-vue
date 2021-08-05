/**
 * 路由配置文件
 */
import * as VueRouter from 'vue-router'

const baseRoutes: VueRouter.RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Homep',
    component: () => import('./views/Home.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('./views/Home.vue')
  }
]

const router: VueRouter.Router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  
  routes: [
    ...baseRoutes
  ]
})

export default router