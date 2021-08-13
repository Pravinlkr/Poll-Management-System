import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/login.vue'
import Home from '../pages/Home.vue'
import addUser from '../pages/addUser.vue'

Vue.use(VueRouter)


const routes = [
    { 'path': '/', name: Home, component: Home },
    { 'path': '/login', name: Login, component: Login},
    { 'path': "/adduser", name:addUser, component: addUser}
]

export const router = new VueRouter({
  mode: 'history',
  routes 
})