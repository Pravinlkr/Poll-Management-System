import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/login.vue'
import Home from '../pages/Home.vue'
import addUser from '../pages/addUser.vue'
import Poll from '../pages/poll.vue'

Vue.use(VueRouter)


function guardMyroute(to, from, next)
{
 var isAuthenticated= false;
 if(localStorage.getItem('LoginCredentials'))
  isAuthenticated = true;
 else{
  isAuthenticated= false;
 }
  
if(isAuthenticated) {
  if(to.fullPath == '/login'){
    next('/'); // allow to enter route
  }
  else{
    next()
  }
 } else{
  next('/login'); // go to '/login';
 }
 
}


function isLoggedInOrNot(to, from, next){
  var isAuthenticated= false;
  if(localStorage.getItem('LoginCredentials'))
   isAuthenticated = true;
  else
   isAuthenticated= false;
 if(!isAuthenticated) {
   if(to.fullPath == '/login'){
    next(); // allow to enter login page
   }
   else{
     next('/login')
   }

  } else{
   if(to.fullPath == '/login'){
     next('/')
   }
   else{
     next()
   }
  }
}

const routes = [
    { 'path': '/', name: Home, beforeEnter : guardMyroute, component: Home },
    { 'path': '/login', name: Login, beforeEnter:isLoggedInOrNot, component: Login},
    { 'path': "/poll", name:Poll, beforeEnter : guardMyroute, component: Poll},
    { 'path': "/adduser", name:addUser, beforeEnter : guardMyroute, component: addUser}
]

export const router = new VueRouter({
  mode: 'history',
  routes 
})