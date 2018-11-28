<template>

  <el-menu class="navbar" mode="horizontal" :text-color='customColor.navbarTextColor'
           :background-color="customColor.navbarBgColor" :active-text-color="customColor.navbarAcTextColor">
    <logo class="logo-container"></logo>
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <levelbar v-if="!sidebar.opened || !sidebar.isMobile"></levelbar>
    <div class="userinfo">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link userinfo-inner"><img :src="avatar"/><span v-text=""></span></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link to="/setting/index">
              个性化设置
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item divided><span @click="logout" style="display:block;">退出登录</span></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

  </el-menu>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Levelbar from './Levelbar'
  import Logo from './Logo'
  import Hamburger from '@/components/Hamburger'

  export default {
    components: {
      Levelbar,
      Hamburger,
      Logo
    },
    data() {
      return {}
    },
    beforeMount() {
      const {body} = document
      const WIDTH = 768
      const RATIO = 3
      let isToggle = true
      const handler = () => {
        if (!document.hidden) {
          let rect = body.getBoundingClientRect()
          let isMobile = rect.width - RATIO < WIDTH

          this.$store.dispatch('ToggleIsMobile', isMobile)
          if(isMobile&&this.sidebar.opened) {
            isToggle = false
            this.$store.dispatch('ToggleSideBar')
          }
          if(!isMobile&&!this.sidebar.opened && !isToggle) this.$store.dispatch('ToggleSideBar')

        }
      };
      document.addEventListener('visibilitychange', handler)
      window.addEventListener('DOMContentLoaded', handler)
      window.addEventListener('resize', handler)
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'avatar',
        'customColor'
      ])
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('ToggleSideBar')
      },
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          location.reload()// 为了重新实例化vue-router对象 避免bug
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
  .navbar {
    height: 60px;
    line-height: 60px;
    border-radius: 0 !important;
  }

  .hamburger-container {
    line-height: 70px;
    height: 60px;
    float: left;
    padding: 0 10px 0 20px;
  }

  .logo-container {
    transition: width 0.08s ease-out;
    width: 180px;
    height: 60px;
    z-index: 1001;
    float: left;
    line-height: normal;
  }

  .errLog-container {
    display: inline-block;
    position: absolute;
    right: 150px;
  }

  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }

  .app-levelbar.el-breadcrumb {
    height: 60px;
    line-height: 60px !important;
  }

  .avatar-container {
    height: 60px;
    display: inline-block;
    position: absolute;
    right: 35px;
  }

  .avatar-wrapper {
    cursor: pointer;
    margin-top: 5px;
    position: relative;
  }

  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }

  .userinfo {
    text-align: right;
    padding-right: 35px;
    float: right;

    .userinfo-inner {
      cursor: pointer;
      color: #666;

      img {
        width: 40px;
        height: 40px;
        -webkit-border-radius: 20px;
        -moz-border-radius: 20px;
        border-radius: 20px;
        margin: 10px 0 10px 10px;
        float: right;
      }

    }
  }

  .el-icon-caret-bottom {
    position: absolute;
    right: -20px;
    top: 25px;
    font-size: 12px;
  }

</style>



