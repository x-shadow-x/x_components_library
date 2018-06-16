## Icon
**Icon 组件**
### 基本用法
```html
<template>
  <div class="icon_box">
    <div class="icon_item">
      <v-icon type="default"></v-icon>
      <span class="label">default</span>
    </div>
    <div class="icon_item">
      <v-icon type="commenting"></v-icon>
      <span class="label">commenting</span>
    </div>
    <div class="icon_item">
      <v-icon type="info" size='10' fontUnit="%"></v-icon>
      <span class="label">info</span>
    </div>
    <div class="icon_item">
      <v-icon type="info-warm" size='30'></v-icon>
      <span class="label">info-warm</span>
    </div>
  </div>
</template>
```
### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type  | icon类型    | string   | emmm意思意思了几个(default, commenting, info, info-warm) | default |
| size  | icon大小    | string | number   | — | 14 |
| fontUnit  | icon尺寸单位    | string   | 'px', 'rem', 'em', '%' | 'px' |