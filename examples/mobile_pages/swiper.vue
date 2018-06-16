<template>
  <div class="swiper_page">
    <v-swiper :list="list" :is-loop="isLoop" :show-pagination="showPagination" @slideend="handleSlideEnd"></v-swiper>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLoop: true,
      showPagination: true,
      list: [
        'slide1',
        'slide2',
        'slide3',
        'slide4'
      ]
    }
  },
  methods: {
    handleSlideEnd(res) {
      console.log('本次滚动已结束', res);
    }
  }
}
</script>

<style>
 .v_swiper {
  background: purple;
  color: #fff;
 }
</style>
