import Vue from 'vue'
import VueRouter from 'vue-router'
import FastClick from 'fastclick'

import routes from './router/router'
import { routerMode } from './config/env'
import LGH from './plugins/lgh'
import App from './App'
import store from './store'
import './style/common'
import './config/rem'

// DOMContentLoaded事件 HTML文档被加载和解析完成时触发(不包含图片、视频等资源的加载)
// load事件 页面上所有的资源（图片，音频，视频等）被加载以后才会触发load事件
// DOMContentLoaded事件早于load事件
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', () => {
    FastClick.attach(document.body);
  }, false);
}

// 设置为false以阻止vue在启动时生成生产提示
Vue.config.productionTip = false

// Vue.use(plugin) 安装Vue.js插件
// 如果插件是一个对象，必须提供install方法
// 如果插件是一个函数，它会被作为install方法
Vue.use(VueRouter);
// 安装自定义的插件
Vue.use(LGH);

// scrollBehavior 切换页面时的滚动行为
// 注意：该功能只在HTML5 History模式下可用
// return 期望滚动到页面的哪个位置
// 第三个参数savedPosition仅当popstate导航(通过浏览器的前进/后退 按钮触发)时才可用。
const router = new VueRouter({
  mode: routerMode,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      //shop店铺详情页面返回msite商铺列表页面时，点击浏览器回退按钮，保持msite页面之前浏览的位置。
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return { x: 0, y: to.meta.savedPosition || 0 };
    }
  }
})
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },//???
})
