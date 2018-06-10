<template>
  <div class="v_swiper" id="vSwiper">
    <div
      class="v_swiper__wrapper"
      :class="{'v_swiper__wrapper--transition': isTransition}"
      :style="{transform: 'translate3d(' + slideX + 'px,' + slideY + 'px,' + slideZ + 'px)'}"
      @transitionend ="handleSlideEnd">
      <div
        class="v_swiper__slide"
        v-for="item in list"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd">
        {{item}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'v-swiper',
    props: {
      list: Array
    },
    data() {
      return {
        isTransition: false, // 是否给滑动元素启用过渡效果~只有当手指离开屏幕的时候才启用
        containerWidth: 0, // swiper盒子宽度
        currentX: 0,
        startX: 0,
        endX: 0,
        distance: 0,
        slideX: 0,
        slideY: 0,
        slideZ: 0,
      }
    },

    mounted() {
      this.containerWidth = document.getElementById('vSwiper').offsetWidth;
    },
    methods: {
      handleTouchStart(e) {
        this.startX = e.touches[0].pageX;
      },

      handleTouchMove(e) {
        this.distance = e.changedTouches[0].pageX - this.startX;
        this.slideX = this.currentX + this.distance;
      },

      handleTouchEnd(e) {
        this.isTransition = true;
        if(this.distance < -50) {
          this.handleSlideMove('next');
        } else if(this.distance > 50) {
          this.handleSlideMove('pre');
        } else {
          this.handleSlideMove('current');
        }
      },

      handleSlideMove(status) {
        switch(status)
        {
        case 'next':
          // 滑动到下一块
          // 注意手指往左滑动的时候distance实际是负的~所以用加法
          this.slideX = this.slideX - (this.containerWidth + this.distance);
          break;
        case 'pre':
          // 滑动到上一块
          // 注意手指往左滑动的时候distance实际是正的~所以用减法
          this.slideX = this.slideX + (this.containerWidth - this.distance);
          break;
        default:
          // 当前块
          this.slideX = this.currentX;
        }
      },

      handleSlideEnd() {
        this.isTransition = false;
        this.currentX = this.slideX;
        console.log('滑动结束');
      }
    }
  }
</script>

<style lang=""></style>
