<template>
  <div id="app">
    <router-view></router-view>
  </div>

</template>

<script>

  export default {
    name: 'APP',
  }
</script>

<style lang="scss">
  /* 样式标准化 */
  @import "~normalize.css/normalize.css";
  /* 全局自定义 */
  @import "./styles/index.scss";
</style>
