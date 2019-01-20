import Vue from 'vue'
import '@/common/global-setting'

export default (App) => {

  let vm = new Vue({
    render: h => h(App)
  })
  vm.$mount('#app')
}
