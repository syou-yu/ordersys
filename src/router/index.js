import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import tablePage from '@/pages/tablePage'
import indexPage from '@/pages/indexPage'
import orderPage from '@/pages/orderPage'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'HelloWorld',
            component: orderPage
        },
        {
            path: '/table:id',
            name: 'tablePage',
            component: tablePage,
        },
        {
            path: '/table:id/index',
            name: 'indexPage',
            component: indexPage,
            children: [{
                path: 'order',
                component: orderPage
            }]
        }
    ]
})