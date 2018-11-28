
import Vue from 'vue'
import ElementUI from 'element-ui'
import './assets/css/theme/index.css'


import App from './App'
import router from './router'
import store from './store'
import * as filters from './filters' // 全局filter
import './icons'
import './permission'
import './mock'
import axios from 'axios'
import './assets/css/font-awesome.css'


Vue.use(ElementUI);

Vue.config.productionTip = false;

Vue.prototype.$http = axios;
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
console.log(process.env.NODE_ENV)
console.log(process.env.CookDomain)
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
});

