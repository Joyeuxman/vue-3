import Vue from 'vue'
import VueRouter from 'vue-router'
import LGH from './plugins/lgh'
import App from './App'
import routes from './router/router'
import store from './store'
import {routerMode} from './config/env'
import './style/common'
import './config/rem'

// 设置为false以阻止vue在启动时生成生产提示
Vue.config.productionTip = false

// Vue.use(plugin) 安装Vue.js插件
// 如果插件是一个对象，必须提供install方法
// 如果插件是一个函数，它会被作为install方法
Vue.use(VueRouter);
// 安装自定义的插件
Vue.use(LGH);

const router = new VueRouter({
  mode:routerMode,
  routes
})
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },//???
})
