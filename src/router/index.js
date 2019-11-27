import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../views/login/index'
import Layout from '../components/Layout'
import Home from '../views/Home'
import Manage from '../views/Manage'
import Article from '../views/Article'
import User from '../views/User'

Vue.use(VueRouter)

const routes = [
  {
      path: '/login',
      name: 'login',
      // component: Login
  },
  {
      path: '/',
      name: 'layout',
      component: Layout,
      redirect: '/home',
      children: [
          {
              path: '/home',
              component: Home,
              meta: {
                  title: '后台首页',
                  requiresAuth: true
              }
          },
          {
              path: '/manage',
              component: Manage,
              meta: {
                  title: '前台管理',
                  requiresAuth: true
              }
          },
          {
              path: '/article',
              component: Article,
              mate: {
                  title: '文章列表',
                  requireAuth: true
              }
          },
          {
              path: '/user',
              component: User,
              meta: {
                  title: '用户信息',
                  requiresAuth: true
              }
          }
      ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
