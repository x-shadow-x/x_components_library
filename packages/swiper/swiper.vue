<template>
  <div class="v_swiper" id="vSwiper">
    <div
      class="v_swiper__wrapper"
      :class="{'v_swiper__wrapper--transition': isTransition}"
      :style="{transform: 'translate3d(' + slideX + 'px,' + slideY + 'px,' + slideZ + 'px)'}"
      @transitionend ="handleSlideEnd">
      <div
        class="v_swiper__slide"
        v-for="(index, item) in selfList"
        :key="index"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd">
        {{item}}
      </div>
    </div>
    <div class="v_swiper__pagination" v-if="showPagination">
      <span
        :class="{'v_swiper__bullet--active': bulletIndex == index}"
        class="v_swiper__bullet"
        v-for="(item, index) in list"
        :key="index"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'v-swiper',
    props: {
      list: Array,
      isLoop: Boolean,
      showPagination: Boolean
    },
    data() {
      return {
        swiperIndex: 0, // swiper_slide
        bulletIndex: 0, // 指示点索引
        selfList: [], // 组件内部的swiper列表，mounted的时候从父组件传进来的prop处拷贝过来
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
      this.selfList = this.list.slice(0);
      if(this.isLoop) {
        this.selfList.unshift(this.list[this.list.length - 1])
        this.selfList.push(this.list[0])
        this.swiperIndex = 1;
        this.currentX = this.slideX = this.slideX - this.containerWidth;
      }
      
    },
    methods: {
      handleTouchStart(e) {
        this.isTransition = false;
        this.startX = e.touches[0].pageX;
      },

      handleTouchMove(e) {
        this.distance = e.changedTouches[0].pageX - this.startX;
        this.slideX = this.currentX + this.distance;
      },

      handleTouchEnd(e) {
        const length = this.isLoop ? this.selfList.length - 2 : this.selfList.length; // swiper-slide的实际数量
        this.isTransition = true;
        if(this.distance < -50) {
          if(this.swiperIndex + 1 < length || this.swiperIndex <= length && this.isLoop) {
            // 判断是否已经滑动到最后一个swiper—slide
            this.handleSwiperIndex('next');
            this.handleBulletIndex('next');
            this.handleSlideMove('next');
          } else {
            this.handleSwiperIndex('current');
            this.handleBulletIndex('current');
            this.handleSlideMove('current');
          }
        } else if(this.distance > 50) {
          if(this.swiperIndex - 1 >= 0 || this.swiperIndex <= 0 && this.isLoop) {
            // 判断是否已经滑动到第一个swiper—slide
            this.handleSwiperIndex('pre');
            this.handleBulletIndex('pre');
            this.handleSlideMove('pre');
          } else {
            this.handleSwiperIndex('current');
            this.handleBulletIndex('current');
            this.handleSlideMove('current');
          }
        } else {
          this.handleSwiperIndex('current');
          this.handleBulletIndex('current');
          this.handleSlideMove('current');
        }
      },

      handleSlideMove(status) {
        const length = this.isLoop ? this.selfList.length - 2 : this.selfList.length; // swiper-slide的实际数量
        switch(status)
        {
        case 'next':
          // 滑动到下一块
          // 注意手指往左滑动的时候distance实际是负的~所以用加法
          if(this.swiperIndex === length + 1) {
            this.swiperIndex = 1;
            this.slideX = this.distance;
          }
          this.slideX = this.slideX - (this.containerWidth + this.distance);
          break;
        case 'pre':
          // 滑动到上一块
          // 注意手指往右滑动的时候distance实际是正的~所以用减法
          if(this.swiperIndex === 0) {
            this.swiperIndex = length;
            this.slideX = -this.containerWidth * (length + 1) + this.distance
          }
          this.slideX = this.slideX + (this.containerWidth - this.distance);
          break;
        default:
          // 当前块
          this.slideX = this.currentX;
        }
        this.currentX = this.slideX;
      },

      handleBulletIndex(status) {

        const length = this.list.length; // swiper-slide的实际数量
        switch(status)
        {
        case 'next':
          // 滑动到下一块
          if(this.isLoop) {
            // 循环轮播
            this.bulletIndex = (this.bulletIndex + 1) % length;
          } else {
            this.bulletIndex = (this.bulletIndex + 1) < length ? this.bulletIndex + 1 : this.bulletIndex;
          }
          
          break;
        case 'pre':
          // 滑动到上一块
          if(this.isLoop) {
            this.bulletIndex = this.bulletIndex - 1 >= 0 ? (this.bulletIndex - 1) % length : length - 1;
          } else {
            this.bulletIndex = this.bulletIndex - 1 >= 0 ? this.bulletIndex - 1 : 0;
          }
          break;
        default:
          // 当前块
        }
      },

      handleSwiperIndex(status) {
        const length = this.isLoop ? this.selfList.length - 2 : this.selfList.length; // swiper-slide的实际数量
        switch(status)
        {
        case 'next':
          // 滑动到下一块
          if(this.isLoop) {
            // 循环轮播
            this.swiperIndex = (this.swiperIndex + 1);
          } else {
            this.swiperIndex = (this.swiperIndex + 1) < length ? this.swiperIndex + 1 : this.swiperIndex;
          }
          
          break;
        case 'pre':
          // 滑动到上一块
          if(this.isLoop) {
            this.swiperIndex = this.swiperIndex - 1 >= 0 ? this.swiperIndex - 1 : length - 1;
          } else {
            this.swiperIndex = this.swiperIndex - 1 >= 0 ? this.swiperIndex - 1 : 0;
          }
          break;
        default:
          // 当前块
        }
      },

      handleSlideEnd() {
        this.isTransition = false;
        this.distance = 0;
        if(this.isLoop) {
          this.handleLoop();
        }
        this.$emit('slideend', {index: this.bulletIndex})
      },

      handleLoop() {
        const length = this.isLoop ? this.selfList.length - 2 : this.selfList.length; // swiper-slide的实际数量
        if(this.swiperIndex === 0) {
          this.swiperIndex = length;
          this.currentX = this.slideX = -this.containerWidth * length;
        } else if(this.swiperIndex === length + 1) {
          this.swiperIndex = 1;
          this.currentX = this.slideX = -this.containerWidth;
        }
      },
    }
  }
</script>

<style lang=""></style>
