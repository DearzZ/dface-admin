<template>
  <el-menu mode="vertical" unique-opened v-if="!sidebar.isMobile||sidebar.opened"
           :default-active="$route.path" :collapse="isCollapse" :background-color="customColor.sidebarBgColor"
           :text-color='customColor.sidebarTextColor' :active-text-color="customColor.sidebarAcTextColor">
    <sidebar-item :routes='permission_routers'></sidebar-item>
  </el-menu>
</template>


<script>
  import {mapGetters} from 'vuex'
  import SidebarItem from './SidebarItem'

  export default {
    components: {SidebarItem},
    computed: {
      ...mapGetters([
        'permission_routers',
        'sidebar',
        'customColor'
      ]),
      isCollapse() {
        return !this.sidebar.opened
      }
    }
  }
</script>
