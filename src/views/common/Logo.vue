<template>
  <div class="logo-bar" v-if="!sidebar.isMobile||sidebar.opened" :style="{backgroundColor:customColor.logoBgColor,color:customColor.logoTextColor}">
    <div class="logo-svg">
      <icon-svg  :icon-class="icon"></icon-svg>
    </div>
    <span v-if="sidebar.opened" class="logo-title">脸脸商户平台</span>
  </div>
</template>


<script>
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return{
        icon: 'logo'
      }
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'customColor'
      ])
    }
  }
</script>

<style lang="scss">
  .logo-bar{
    padding:10px 12px;
    background-color: #3b93ff;
  }
  .logo-svg{
    font-size:36px;
    display: inline-block;
  }
  .logo-title{
    font-size:18px;
    line-height:40px;
    vertical-align: top;
  }
</style>
