import Vue from 'vue'
import Router from 'vue-router'
import TOdo from '@/components/todo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/todo',
      name: 'todo',
      component: TOdo
    }
  ]
})
