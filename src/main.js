import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import routes from './router/router'
import store from './store'
// import ajax from './config'
// import fetch from './config/fetch'
import {routerMode} from './config/env'
import './style/common'
import './config/rem'


Vue.config.productionTip = false

Vue.use(VueRouter);
const router = new VueRouter({
  mode:routerMode,
  routes
})
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
