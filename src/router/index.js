import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/views/HomePage'
import ErrorPage from '@/views/ErrorPage'
import PremintPage from '@/views/PremintPage'

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
      path: '/premint/',
      name: 'Premint',
      component: PremintPage,
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
