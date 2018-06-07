import Vue from 'vue'
import MobileApp from './MobileApp.vue'
import Router from 'vue-router'
import Vui from '../../src/index.js'
import isMobile from './is_mobile.js'
import registerRoute from './router.config.js'
import navConfig from './nav.config.json'

import '../../packages/vui_css/src/index.css'

const isProduction = process.env.NODE_ENV === 'production';

Vue.use(Vui);
Vue.use(Router);

const routesConfig = registerRoute(navConfig, isMobile);
console.log(routesConfig);

const router = new Router(routesConfig)
router.beforeEach((to, from, next) => {
  if(to.path !== '/') {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
  const pathname = isProduction ? '/vui/' : '/';
  if (!isMobile) {
    window.location.replace(pathname)
    return
  }
  document.title = to.meta.title || document.title;
  next();
})

new Vue({
  el: '#app-container',
  router,
  components: { MobileApp },
  template: '<MobileApp/>'
})