import Vue from 'vue'
import Router from 'vue-router'
// import DashboardLayout from '@/layout/DashboardLayout'
import ApkAdmin from '@/views/ApkAdmin/ApkAdmin'
import AuthLayout from '@/layout/AuthLayout'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: 'dashboard',
      component: ApkAdmin,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import(/* webpackChunkName: "dashboard-admin" */ '@/views/ApkAdmin/components/Dashboard.vue')
        },
        {
          path: '/gestion-vouchers',
          name: 'gestionDeVouchers',
          component: () => import(/* webpackChunkName: "vouchers" */ '@/views/ApkAdmin/components/GestionVouchers.vue'),
        },
        {
          path: '/leads',
          name: 'leads',
          component: () => import(/* webpackChunkName: "leads" */ '@/views/ApkAdmin/components/Leads.vue')
        },
        {
          path: '/careers',
          name: 'careers',
          component: () => import(/* webpackChunkName: "careers" */ '@/views/ApkAdmin/components/Careers.vue')
        },
        {
          path: '/institutions',
          name: 'institutions',
          component: () => import(/* webpackChunkName: "institutions" */ '@/views/ApkAdmin/components/Institutions.vue')
        },
        {
          path: '/programs',
          name: 'programs',
          component: () => import(/* webpackChunkName: "institutions" */ '@/views/ApkAdmin/components/Programs.vue')
        }
      ]
    },
    // {
    //   path: '/',
    //   redirect: 'dashboard',
    //   component: DashboardLayout,
    //   children: [
    //     {
    //       path: '/dashboard',
    //       name: 'dashboard',
    //       component: () => import(/* webpackChunkName: "demo" */ './views/Dashboard.vue')
    //     },
    //     {
    //       path: '/icons',
    //       name: 'icons',
    //       component: () => import(/* webpackChunkName: "demo" */ './views/Icons.vue')
    //     },
    //     {
    //       path: '/profile',
    //       name: 'profile',
    //       component: () => import(/* webpackChunkName: "demo" */ './views/UserProfile.vue')
    //     },
    //     {
    //       path: '/maps',
    //       name: 'maps',
    //       component: () => import(/* webpackChunkName: "demo" */ './views/Maps.vue')
    //     },
    //     {
    //       path: '/tables',
    //       name: 'tables',
    //       component: () => import(/* webpackChunkName: "demo" */ './views/Tables.vue')
    //     }
    //   ]
    // },
    {
      path: '/',
      redirect: 'login',
      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import(/* webpackChunkName: "demo" */ './views/Register.vue')
        }
      ]
    }
  ]
})
