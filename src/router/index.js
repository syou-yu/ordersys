import Vue from 'vue'
import Router from 'vue-router'
import tablePage from '@/pages/custom/tablePage'
import indexPage from '@/pages/custom/indexPage'
import orderPage from '@/pages/custom/orderPage'
import historyPage from '@/pages/custom/historyPage'
import userPage from '@/pages/custom/userPage'
import kitchenPage from '@/pages/kitchen/indexPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: kitchenPage,
    },
    // 用户端
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
    },
    // 厨房端
    {
      path: '/kitchen',
      name: 'kitchenPage',
      component: kitchenPage,
    },
  ]
})
