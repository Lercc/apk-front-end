/*
=========================================================
* Front end 
=========================================================
*/
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store';
import { VueSpinners } from '@saeris/vue-spinners'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import './registerServiceWorker'
import ArgonDashboard from './plugins/argon-dashboard'


Vue.config.productionTip = false

Vue.use(ArgonDashboard)
Vue.use(VueSpinners)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)// Optionally install the BootstrapVue

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
