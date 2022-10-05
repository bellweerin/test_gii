import Vue from 'vue'
import Router from 'vue-router'

import Test from '../views/Test'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/test',
      name: 'Test',
      component: Test,
      // template: '<router-view/>',
    },

  ]
})
