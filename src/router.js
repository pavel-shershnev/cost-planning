import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: { layout: 'empty' },
      component: () => import('./views/login.vue')
    },
    {
      path: '/register',
      name: 'Register',
      meta: { layout: 'empty' },
      component: () => import('./views/register.vue')
    },
    {
      path: '/categories',
      name: 'Categories',
      meta: { layout: 'main', auth: true },
      component: () => import('./views/categories.vue')
    },
    {
      path: '/detail/:id',
      name: 'Detail-record',
      meta: { layout: 'main', auth: true },
      component: () => import('./views/detail-record.vue')
    },
    {
      path: '/history',
      name: 'History',
      meta: { layout: 'main', auth: true },
      component: () => import('./views/history.vue')
    },
    {
      path: '/',
      name: 'Home',
      meta: { layout: 'main', auth: true },
      component: () => import('./views/home.vue')
    },
    {
      path: '/planning',
      name: 'Planning',
      meta: { layout: 'main', auth: true },
      component: () => import('./views/planning.vue')
    },
    {
      path: '/profile',
      name: 'Profile',
      meta: { layout: 'main', auth: true },
      component: () => import('./views/profile.vue')
    },
    {
      path: '/record',
      name: 'Record',
      meta: { layout: 'main', auth: true },
      component: () => import('./views/record.vue')
    }
  ]
})

router.beforeEach((to, _from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)
  if (requireAuth && !currentUser) {
    next('/login?massage=login')
  } else {
    next()
  }
})

export default router
