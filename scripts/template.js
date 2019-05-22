const entryTemplate = name => `import Vue from 'vue'
import App from './main.vue'

import VueMeta from 'vue-meta'
Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
})

// import axios from '@/plugins/axios'
// Vue.use(axios)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
`

const vueTemplate = name => `<template>
<div class="wrapper ${name}-wrapper">${name}</div>
</template>
<script>
export default {
  name: '${name}',
  metaInfo: {
    title: '${name}'
  }
}
</script>
<style lang="scss" scoped>
.${name}-wrapper {

}
</style>
`

const controllerTemplate = name => ``

module.exports = {
  entryTemplate,
  vueTemplate,
  controllerTemplate
}
