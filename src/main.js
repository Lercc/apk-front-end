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

import './registerServiceWorker'
import ArgonDashboard from './plugins/argon-dashboard'

Vue.config.productionTip = false

Vue.use(ArgonDashboard)
Vue.use(VueSpinners)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
