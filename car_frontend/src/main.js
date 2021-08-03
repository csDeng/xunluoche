import Vue from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'
import router from '~/router'
import less from 'less'
import '~/lazy.js'
import axios from 'axios'
import * as echarts from 'echarts'

require('../public/static/js/china')
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(less)
Vue.prototype.$axios = axios

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
