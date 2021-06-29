import Vue from 'vue'
import Router from 'vue-router'
import TheNotes from './views/TheNotes.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'notes',
      component: TheNotes
    },
    {
      path: '/note/:id',
      name: 'note'
    }
  ]
})
