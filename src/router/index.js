import Vue from 'vue'
import Router from 'vue-router'
import tablePage from '@/pages/tablePage'
import indexPage from '@/pages/indexPage'
import orderPage from '@/pages/orderPage'
import historyPage from '@/pages/historyPage'
import userPage from '@/pages/userPage'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'HelloWorld',
      component: orderPage,
    },
    {
      path: '/table:id',
      name: 'tablePage',
      component: tablePage,
    },
    {
      path: '/table:id/index',
      name: 'indexPage',
      redirect: '/table:id/index/order',
      component: indexPage,
      children: [
        {
          path: 'order',
          name: 'order',
          component: orderPage,
        },
        {
          path: 'history',
          name: 'history',
          component: historyPage,
        },
        {
          path: 'user',
          name: 'user',
          component: userPage,
        },
      ]
    }
  ]
})
