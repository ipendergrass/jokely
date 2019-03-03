import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/components/Login'
import Dashboard from '@/components/Main/Dashboard'
import Editor from '@/components/Main/Editor'
import Ideas from '@/components/Main/Ideas'
import Jokes from '@/components/Main/Jokes'
import Sets from '@/components/Main/Sets'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children: [
        {
          path: 'jokes',
          name: 'Jokes',
          component: Jokes
        },
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'editor',
          name: 'Editor',
          component: Editor
        },
        {
          path: 'ideas',
          name: 'Ideas',
          component: Ideas
        },
        {
          path: 'sets',
          name: 'Sets',
          component: Sets
        }
      ]
    }
  ]
})
