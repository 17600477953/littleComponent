import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/refresh',
      component: () => import('@/views/home')
    },
    {
      path: '/',
      component: () => import('@/views/news')
    },
    {
      path: '/spring',
      component: () => import('@/views/spring')
    },
    {
      path: '/linkage',
      component: () => import('@/views/linkage/index')
    }
  ]
})
