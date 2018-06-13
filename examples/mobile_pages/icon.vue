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

<style scoped>
  
  .icon_box {
    display: flex;
    text-align: center;
    align-content: flex-end;
  }

  .icon_item {
    flex: 1;
    height: 50px;
    position: relative;
  }

  .label {
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>