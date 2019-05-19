import Vue from 'vue'
import App from './main.vue'
import axios from '@/plugins/axios'

Vue.use(axios)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
