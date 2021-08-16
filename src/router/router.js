import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/login.vue'
import Home from '../pages/Home.vue'
import addUser from '../pages/addUser.vue'

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
  if(to.fullPath == '/' || to.fullPath == '/profile'){
    next(); // allow to enter route
  }
  else{
    next('/')
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
   next('/'); // go to '/';
  }
}

const routes = [
    { 'path': '/', name: Home, beforeEnter : guardMyroute, component: Home },
    { 'path': '/login', name: Login, beforeEnter:isLoggedInOrNot, component: Login},
    { 'path': "/adduser", name:addUser, beforeEnter : guardMyroute, component: addUser}
]

export const router = new VueRouter({
  mode: 'history',
  routes 
})