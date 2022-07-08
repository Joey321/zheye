import { createRouter, createWebHistory } from 'vue-router'
import store from './store'

const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "Home" */'./views/Home.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "Login" */'./views/Login.vue'),
      // 已经登录要到首页
      meta: { requiredAlreadyLogin: true }
    },
    {
      path: '/column/:id',
      name: 'column',
      component: () => import(/* webpackChunkName: "ColumnDetail" */'./views/ColumnDetail.vue')
    },
    {
      path: '/create',
      name: 'create',
      component: () => import(/* webpackChunkName: "ColumnDetail" */'./views/CreatePost.vue'),
      // 创建文章需要登录
      meta: { requiredLogin: true }
    }
  ]
})
router.beforeEach((to, from, next) => {
  // 需要登录且未登录则跳转登录
  if (!store.state.user.isLogin && to.meta.requiredLogin) {
    const login = { name: 'login' }
    next(login)
    // 已经登录访问登录页则跳转首页
  } else if (store.state.user.isLogin && to.meta.requiredAlreadyLogin) {
    const home = { name: 'home' }
    next(home)
  } else {
    next()
  }
})

export default router
