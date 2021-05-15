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

router.beforeEach((to, from, next) => {
  if (to.name == 'detalles-voucher' || to.name == 'inicio') localStorage.removeItem('detalleClienteId')
  else if (to.name == 'detalles-aplicante') localStorage.setItem('detalleClienteId', to.params.clientId)
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
