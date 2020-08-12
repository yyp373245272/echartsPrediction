import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import echarts from 'echarts'
import './assets/css/global.less'
Vue.prototype.$echarts = echarts

// 引入全局样式

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  template: '<App/>'
}).$mount('#app')
