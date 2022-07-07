import { createRouter, createWebHistory } from 'vue-router'

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
      component: () => import(/* webpackChunkName: "Login" */'./views/Login.vue')
    },
    {
      path: '/column/:id',
      name: 'column',
      component: () => import(/* webpackChunkName: "ColumnDetail" */'./views/ColumnDetail.vue')
    },
    {
      path: '/create',
      name: 'create',
      component: () => import(/* webpackChunkName: "ColumnDetail" */'./views/CreatePost.vue')
    }
  ]
})

export default router
