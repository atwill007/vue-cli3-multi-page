import axios from './http'
const install: any = (Vue: any) => {
  if (install.installed) return
  install.installed = true

  Vue.prototype.$axios = axios
}

export default install
