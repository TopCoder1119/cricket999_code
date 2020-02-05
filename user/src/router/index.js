import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import FeedOdds from '@/components/FeedOdds'
import Container from '@/container/container'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/home',
      component: Container,
      children:[
        {
          path: 'home',
          name: 'Dashboard',
          component: Dashboard
        }
      ]
    },
    {
      path: '/feed-odds',
      name: 'FeedOdds',
      component: FeedOdds,
    },
    {
      path: '/help',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/welcome',
      name: 'Welcome',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
