import Vue from 'vue'
import Router from 'vue-router'
import TheNotes from './views/TheNotes'
import TheNote from "./views/TheNote";

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'TheNotes',
      component: TheNotes
    },
    {
      path: '/note',
      name: 'TheNote',
      component: TheNote
    },
    {
      path: '/note/:id',
      name: 'TheNote',
      component: TheNote
    }
  ]
})
