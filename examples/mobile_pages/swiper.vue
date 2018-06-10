<template>
  <div class="swiper_page">
    <v-swiper :list="list"></v-swiper>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        'slide1',
        'slide2'
      ]
    }
  },
  methods: {
  }
};
</script>
