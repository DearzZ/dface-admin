
import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)
// 仅在发布环境使用 路由懒加载

Vue.use(Router)

/* layout */
import Layout from '../views/common/Layout'

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will no redirct in the levelbar
 * noDropdown : if `noDropdown:true` will has no submenu
 * meta : { role: ['admin'] }  will control the page role
 **/
export const constantRouterMap = [
  {path: '/login', component: _import('login/index'), hidden: true},
  // {path: '/authredirect', component: _import('login/authredirect'), hidden: true},
  // {path: '/404', component: _import('errorPage/404'), hidden: true},
  // {path: '/401', component: _import('errorPage/401'), hidden: true},
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    name: '首页',
    hidden: true,
    children: [{path: 'home', component: _import('home/index')}]
  },
  {
    path: '/setting',
    component: Layout,
    redirect: '/setting/index',
    name: '个性化设置',
    hidden: true,
    children: [{
      path: 'index',component: _import('setting/index')
    }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

export const asyncRouterMap = [

  {
    path: '/component',
    component: Layout,
    redirect: 'noredirect',
    icon: 'star',
    name: '组件',
    // noDropdown: true,
    children: [
      {path: 'editor', name: '富文本编辑器', component: _import('component/editor')},
      {path: 'imageCrop', name: '图片裁剪', component: _import('component/uploadImg')},
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
