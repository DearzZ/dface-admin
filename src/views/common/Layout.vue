<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened,isMobile:sidebar.isMobile}">
    <!--<logo class="logo-container"></logo>-->

    <sidebar class="sidebar-container"></sidebar>
    <navbar class="navbar-container"></navbar>
    <div class="main-container">
      <app-main>{{sidebar.opened}}
        {{sidebar.isMobile}}</app-main>
    </div>
  </div>
</template>

<script>
  import {Logo, Navbar, Sidebar, AppMain} from '@/views/common'

  export default {
    name: 'layout',
    components: {
      Navbar,
      Sidebar,
      AppMain,
      Logo
    },
    getPrimssion() {
      this.store.dispatch('GenerateRoutes', {})
    },

    computed: {
      sidebar() {
        return this.$store.state.app.sidebar
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  @import "src/styles/mixin.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.hideSidebar.isMobile {
      .sidebar-container {
        width: 0;
        overflow: inherit;

      }
      .main-container {
        margin-left: 0;
      }
      .logo-container{
        width: 0;
      }
    }
    &.hideSidebar {

      .sidebar-container {
        width: 60px;
        overflow: inherit;

        .svg-icon {
          margin-right: 0;
          margin-left:10px;
        }

      }
      .main-container {
        margin-left: 60px;
      }
      .logo-container{
        width: 60px;
      }
    }

    .navbar-container{
      position: fixed;
      width:100%;
      left:0;
      top:0;
      z-index: 999;
      box-sizing: border-box;
    }
    .sidebar-container {
      transition: width 0.08s ease-out;
      width: 180px;
      height: 100%;
      position: fixed;
      top: 60px;
      bottom: 0;
      left: 0;
      z-index: 1001;
      overflow-y: auto;
      &::-webkit-scrollbar {
        display: none
      }

    }
    .main-container {
      min-height: 100%;
      transition: margin-left 0.28s ease-out;
      padding-top:60px;
      margin-left: 180px;
    }

  }
</style>
