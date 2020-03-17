import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../views/login/index'
// import Layout from '../components/Layout'
// import Home from '../views/Home'
// import Manage from '../views/Manage'
// import Topic from '../views/Topic'
// import Tag from '../views/Tag'
// import Article from '../views/Article'
// import ArtClass from '../views/ArtClass'
// import ArtEdit from '../views/ArtEdit'
// import User from '../views/User'
const Layout = () => import('../components/Layout')
const Home = () => import('../views/Home')
const Manage = () => import('../views/Manage')
const Topic = () => import('../views/Topic')
const Tag = () => import('../views/Tag')
const Article = () => import('../views/Article')
const ArtClass = () => import('../views/ArtClass')
const ArtEdit = () => import('../views/ArtEdit')
const User = () => import('../views/User')

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
        },
        children: [
          {
            path: 'topic',
            component: Topic,
            meta: {
              title: '轮播图',
              requiresAuth: true
            }
          },
          {
            path: 'tag',
            component: Tag,
            meta: {
              title: '标签管理',
              requiresAuth: true
            }
          },
        ]
      },
      {
        path: '/article',
        component: Article,
        mate: {
          title: '文章管理',
          requireAuth: true
        },
        children: [
          {
            path: 'class',
            component: ArtClass,
            meta: {
              title: '文章分类',
              requiresAuth: true
            }
          },
          {
            path: 'edit/:id',
            component: ArtEdit,
            meta: {
              title: '文章编辑',
              requiresAuth: true
            }
          },
        ]
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
