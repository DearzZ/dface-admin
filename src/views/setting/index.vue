<template>

  <div class="wrapper">
    <el-form ref="form" label-width="120px">
      <el-form-item label="Logo-bar">
        <el-row>
          <el-col class="st-wrap">
            <label class="st-label" v-for="logoTheme in themeArr">
              <input type="radio" class="st-radio" v-model="logoColor" name="customLogoColor" :value="logoTheme">
              <span class="st-rlt">
                <span class="st-abt" :class="{'st-active':logoColor!=logoTheme}">
                  <i class="fa fa-check st-ok"></i>
                </span>
                <b class="st-b st-logo" :class="'st-'+logoTheme"></b>
              </span>
            </label>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="顶部导航">
        <el-row>
          <el-col class="st-wrap">
            <label class="st-label" v-for="headerTheme in themeArr">
              <input type="radio" class="st-radio" v-model="headerColor" name="customHeaderColor" :value="headerTheme">
              <span class="st-rlt">
                <span class="st-abt" :class="{'st-active':headerColor!=headerTheme}">
                  <i class="fa fa-check st-ok"></i>
                </span>
                <b class="st-b st-header" :class="'st-'+headerTheme"></b>
              </span>
            </label>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="侧边栏">
        <el-row>
          <el-col class="st-wrap">
            <label class="st-label" v-for="asideTheme in themeArr">
              <input type="radio" class="st-radio" v-model="asideColor" name="customAsideColor" :value="asideTheme">
              <span class="st-rlt">
                <span class="st-abt" :class="{'st-active':asideColor!=asideTheme}">
                  <i class="fa fa-check st-ok"></i>
                </span>
                <b class="st-b" :class="'st-'+asideTheme"></b>
              </span>
            </label>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="changeTheme">保存</el-button>
        <el-button @click="restoreDefaults">恢复默认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Cookies from 'js-cookie'

  export default {
    data() {
      return {
        logoColor: Cookies.getJSON('setTheme') ? Cookies.getJSON('setTheme').logoColor : '#3d93ff',
        asideColor: Cookies.getJSON('setTheme') ? Cookies.getJSON('setTheme').asideColor : '#1c2b36',
        headerColor: Cookies.getJSON('setTheme') ? Cookies.getJSON('setTheme').headerColor : '#FFFFFF',
        themeArr: ['danger', 'info', 'primary', 'warn', 'success', 'dark', 'white'],
        theme: {
          danger: {
            color: '#f2f2f2',
            bgColor: '#f21b1b',
            actColor: '#3d93ff'
          },
          info: {
            color: '#bfcbd9',
            bgColor: '#878D99',
            actColor: '#3d93ff'
          },
          primary: {
            color: '#f2f2f2',
            bgColor: '#3d93ff',
            actColor: '#878D99'
          },
          warn: {
            color: '#ffffff',
            bgColor: '#F7C573',
            actColor: '#ffffff'
          },
          success: {
            color: '#daf5e0',
            bgColor: '#27c24c',
            actColor: '#3d93ff'
          },
          dark: {
            color: '#bfcbd9',
            bgColor: '#1c2b36',
            actColor: '#3d93ff'
          },
          white: {
            color: '#363f44',
            bgColor: '#ffffff',
            actColor: '#3d93ff'
          }

        }
      }
    },
    methods: {
      changeTheme() {
        console.log(this.logoColor && this.theme[this.logoColor].bgColor)
        const config = {
          logoBgColor: this.logoColor && this.theme[this.logoColor].bgColor,
          logoTextColor: this.logoColor && this.theme[this.logoColor].color,
          navbarBgColor: this.headerColor && this.theme[this.headerColor].bgColor,
          navbarTextColor: this.headerColor && this.theme[this.headerColor].color,
          navbarAcTextColor: this.headerColor && this.theme[this.headerColor].actColor,
          sidebarBgColor: this.asideColor && this.theme[this.asideColor].bgColor,
          sidebarTextColor: this.asideColor && this.theme[this.asideColor].color,
          sidebarAcTextColor: this.asideColor && this.theme[this.asideColor].actColor
        }
        const setTheme = {
          logoColor: this.logoColor,
          headerColor: this.headerColor,
          asideColor: this.asideColor
        }
        this.$store.dispatch('SetCustomColor', config)
        Cookies.set('setTheme', setTheme, {expires: 365})
      },
      restoreDefaults() {
        Cookies.remove('setTheme')
        Cookies.remove('customColor')
        let customColor = {
          logoBgColor: '#3B93FF',
          logoTextColor: '#FFFFFF',
          navbarBgColor: '#FFFFFF',
          navbarTextColor: '#BFCBD9',
          navbarAcTextColor: '#3B93FF',
          sidebarBgColor: '#1C2B36',
          sidebarTextColor: '#BFCBD9',
          sidebarAcTextColor: '#3B93FF'
        }
        this.$store.dispatch('SetCustomColor', customColor)
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  .wrapper {
    padding-top: 20px;
  }

  .st-active {
    display: none !important;
  }

  .st-logo {
    height: 30px !important;
    width: 100% !important;
  }

  .st-wrap {
    background-color: #F5F7FA;
    padding: 10px 15px;
  }

  .st-label {
    margin-bottom: 15px;
    margin-left: 10px;
    margin-right: 10px;
    width: 80px;
    display: inline-block;
    padding-left: 20px;
    cursor: pointer;
    font-weight: normal;
    height: 30px;
    background-color: #cccccc;
  }

  .st-radio {
    position: absolute;
    margin-left: -20px;
    opacity: 0;
    line-height: normal;
    padding: 0;
  }

  .st-rlt {
    display: block;
    position: relative;
    background-color: #edf1f2;
    margin-left: -20px;
  }

  .st-abt {
    height: 100%;
    width: 100%;
    display: inherit;
    position: absolute;
    background-color: rgba(32, 43, 54, 0.5);
    text-align: center;
  }

  .st-ok {
    color: #fff;
    margin-top: 5px;
  }

  .st-b {
    display: inline-block;
    float: left;
    width: 50%;
    height: 30px;
  }

  .st-header {
    height: 10px;
    width: 100%;
  }

  .st-dark {
    background-color: #1c2b36;
  }

  .st-primary {
    background-color: #3d93ff;
  }

  .st-info {
    background-color: #878D99;
  }

  .st-warn {
    background-color: #F7C573;
  }

  .st-danger {
    background-color: #f21b1b;
  }

  .st-success {
    background-color: #27c24c;
  }

  .st-white {
    background-color: #fff;
  }

</style>
