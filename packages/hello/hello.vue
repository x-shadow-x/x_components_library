<template>
  <div class="v_hello" @click="handleClick">
    <p class="v_hello__message">hello {{ message }}</p>
  </div>
</template>

<script>
  export default {
    name: 'v-hello',
    props: {
      message: String
    },
    methods: {
      handleClick() {
        return new Promise((resolve) => {
          resolve()
        }).then(() => {
          this.$emit('click', 'this is click emit')
        });
      }
    }
  }
</script>