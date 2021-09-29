import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/views/HomePage'
import ErrorPage from '@/views/ErrorPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage,
      meta: {
        title: 'Taro'
      }
    },
    {
      path: '/presale666/',
      name: 'Premint',
      component: HomePage,
      meta: {
        title: 'Premint'
      }
    },
    {
      path: '/*',
      name: '404',
      component: ErrorPage,
      meta: {
        title: '404'
      }
    }
  ],
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    }
  }
})
