import Vue from 'vue'
import App from './App.vue'
import isMobile from './is_mobile.js'
import Vui from '../../src/index.js'
import Router from 'vue-router'
import registerRoute from './router.config'
import navConfig from './nav.config'

import '../../packages/vui_css/src/index.css'
import '../assets/styles/docs.css'

Vue.config.productionTip = false;
const isProduction = process.env.NODE_ENV === 'production';

Vue.use(Vui);
Vue.use(Router);

const routesConfig = registerRoute(navConfig)
const router = new Router(routesConfig)

router.beforeEach((to, from, next) => {
  if (to.path !== '/') {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
  // 获取不同环境下，移动端Demo对应的地址
  const pathname = isProduction ? '/vui/mobile' : '/mobile.html';
  // 如果设备环境为移动端，则直接加载移动端Demo的地址
  if (isMobile) {
    window.location.replace(pathname)
    return
  }
  document.title = to.meta.title || document.title
  next()
})


/* eslint-disable no-new */
new Vue({
  el: '#app-container',
  router,
  components: { App },
  template: '<App/>'
})