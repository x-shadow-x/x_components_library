import Hello from '../packages/hello/hello.vue'
import Swiper from '../packages/swiper/swiper.vue'

const install = function (Vue) {
  if (install.installed) {
    return
  }

  Vue.component(Hello.name, Hello)
  Vue.component(Swiper.name, Swiper)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  Hello
}
