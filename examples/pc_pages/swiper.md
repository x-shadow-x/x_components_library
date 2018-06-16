## Swiper
**Swiper 组件**
### 基本用法
```html
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
```
### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| list  | 轮播列表    | Array   | — | — |
| isLoop  | 是否循环轮播    | Boolean   | — | — |
| showPagination  | 是否显示页面指示点    | Boolean   | — | — |
### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| slideEnd  | 滚动动作结束后回调    |  当前swiper item索引 |