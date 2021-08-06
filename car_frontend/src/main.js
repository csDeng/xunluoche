"use strict";
import Vue from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'
import router from '~/router'
import less from 'less'
import '~/lazy.js'
import axios from './http'
import * as echarts from 'echarts'
require('../public/static/js/china')

Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(less)


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
