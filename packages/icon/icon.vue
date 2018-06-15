<template>
  <i class="v_icon" :class="'v_icon--' + type" :style="{fontSize: size + fontUnit}">
    <slot></slot>
  </i>
</template>

<script>
  export default {
    name: 'v-icon',
    props: {
      type: String,
      size: {
        type: [Number, String],
        default: '14'
      },
      fontUnit: {
        type: String,
        validator (val) {
          return ['px', 'rem', 'em', '%'].indexOf(val) > -1;
        },
        default: 'px'
      },
    }
  }
</script>