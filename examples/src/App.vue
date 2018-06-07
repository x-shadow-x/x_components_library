<template>
  <div class="app">
    <page-header/>
    <div class="main_content">
      <div class="page_container clearfix">
        <side-nav :nav-list="navConfig['zh-CN']" base="/component" />
        <div class="page_content">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import 'highlight.js/styles/atom-one-dark.css'

import navConfig from './nav.config.json'

import PageHeader from './components/header.vue'
import SideNav from './components/side_nav.vue'

export default {
  name: 'App',
  data() {
    return {
      navConfig: navConfig
    }
  },
  components: {
    PageHeader,
    SideNav
  }
};
</script>