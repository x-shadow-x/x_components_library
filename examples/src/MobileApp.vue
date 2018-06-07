<template>
  <div class="mobile_app">
    <h1 class="vui_title"></h1>
    <h2 class="vui_desc">VUI 移动组件库</h2>
    <div class="mobile_navs">
      <div v-for="(item, index) in data" :key="index">
        <div class="mobile_nav_item" v-if="item.showInMobile">
          <mobile-nav v-for="(group, s) in item.groups" :group="group" :base="base" :key="s" v-on:show-component="onShowComponent"></mobile-nav>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="mobile_page_content" v-if="show">
        <!-- <span class="back_arrow_btn" @click="back">
          <img src="../assets/imgs/arrow.png" alt="" class="back_arrow">
        </span> -->
        <router-view/>
      </div>
    </transition>
  </div>
</template>

<script>
import navConfig from './nav.config.json';
import MobileNav from './components/mobile_nav.vue';

export default {
  data() {
    return {
      data: navConfig['zh-CN'],
      base: '/component',
      show: false
    };
  },

  methods: {
    back: function() {
      this.$router.back(-1)
      this.show = false;
    },

    onShowComponent: function() {
      this.show = true;
    }
  },

  watch: {
    '$route.path': function(val) {
      if(val === '/' || val === '/mobile.html') {
        this.show = false;
      }
    }
  },

  components: {
    MobileNav
  }
};
</script>

<style lang="postcss"> 
.mobile_app {
  width: 100%;
  box-sizing: border-box;
  padding: 10% 15px 20px 15px;
  position: relative;
  z-index: 1;

  .vui_title,
  .vui_desc {
    text-align: center;
    font-weight: normal;
    user-select: none;
  }

  .vui_title {
    padding-top: 40px;
    height: 0;
    overflow: hidden;
    background: url(https://raw.githubusercontent.com/xuqiang521/vui/master/src/assets/logo.png) center center no-repeat;
    background-size: 40px 40px;
    margin-bottom: 10px;
  }

  .vui_desc {
    font-size: 14px;
    color: #666;
    margin-bottom: 50px;
  }
}

.mobile_page_content {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: #fcfcfc;
  z-index: 10;
  padding: 20px 15px;
  box-sizing: border-box;
}

/* .back_arrow_btn {
  display: inline-block;
  padding: 14px;
}

.back_arrow {
  width: 11px;
} */

.fade-enter,
.fade-leave-to {
  opacity: 0;
  left: -100%;
}

.fade-enter-to,
.fade-leave {
  opacity: 1;
  left: 0;
}

.fade-enter-active {
  transition: left .24s, opacity .32s .1s;
}

.fade-leave-active {
  transition: left .32s .1s, opacity .32s;
}
</style>