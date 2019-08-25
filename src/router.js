import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/list',
      name: 'list-tsukutta-',
      component: () => import('./views/ListTsukutta/App'),
      children: [
        {
          path: '',
          name: 'index',
          component: () => import('./views/ListTsukutta/Index')
        },
        {
          path: 'list',
          name: 'list',
          component: () => import('./views/ListTsukutta/ListList')
        },
        {
          path: 'setting/:id',
          name: 'setting',
          component: () => import('./views/ListTsukutta/ListSetting')
        },
        {
          path: 'member/:id',
          name: 'edit',
          component: () => import('./views/ListTsukutta/EditMember')
        }
      ]
    },
  ]
})
