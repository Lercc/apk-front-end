import Vue from 'vue'
import Router from 'vue-router'
// import DashboardLayout from '@/layout/DashboardLayout'
import ApkAdmin from '@/views/ApkAdmin/ApkAdmin'
import AuthLayout from '@/layout/AuthLayout'

// import GestionVouchers from '@/views/ApkAdmin/components/GestionVouchers.vue'


Vue.use(Router)

export default new Router({
  // mode: 'history',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: 'inicio',
      component: ApkAdmin,
      children: [
        {
          path: '/inicio',
          name: 'inicio',
          component: () => import(/* webpackChunkName: "dashboard-admin" */ '@/views/ApkAdmin/components/Inicio.vue')
        },
        {
          path: '/gestion-vouchers',
          redirect:'/gestion-vouchers/listaClientes',
          name: 'gestion-de-vouchers',
          component: () => import(/* webpackChunkName: "vouchers" */ '@/views/ApkAdmin/components/GestionVouchers.vue'),
          children: [
            {
              path: '/gestion-vouchers/listaClientes',
              name: 'lista-Clientes',
              component: () => import(/* webpackChunkName: "dashboard-admin" */ '@/views/GestionVoucherComponents/ClientsTable.vue')
            },
            {
              path: '/gestion-vouchers/detalles-cliente/:clientId',
              name: 'detalles-Cliente',
              component: () => import(/* webpackChunkName: "dashboard-admin" */ '@/views/GestionVoucherComponents/ClientDetails.vue')
            },
            {
              path: '/gestion-vouchers/crear-voucher/:clientProgramId/:clientId',
              name: 'crear-voucher',
              component: () => import(/* webpackChunkName: "dashboard-admin" */ '@/views/GestionVoucherComponents/CrearVoucher.vue')
            },
            {
              path: '/gestion-vouchers/editar-voucher/:voucherId/:clientId',
              name: 'editar-voucher',
              component: () => import(/* webpackChunkName: "dashboard-admin" */ '@/views/GestionVoucherComponents/EditarVoucher.vue')
            },
            {
              path: '/gestion-vouchers/crear-cliente',
              name: 'crear-cliente',
              component: () => import(/* webpackChunkName: "dashboard-admin" */ '@/views/GestionVoucherComponents/CrearCliente.vue')
            },
            {
              path: '/gestion-vouchers/editar-cliente/:clientId',
              name: 'editar-cliente',
              component: () => import(/* webpackChunkName: "dashboard-admin" */ '@/views/GestionVoucherComponents/EditarCliente.vue')
            },
          ]
        },
        {
          path: '/leads',
          name: 'leads',
          component: () => import(/* webpackChunkName: "leads" */ '@/views/GestionVoucherComponents/ClientsTable.vue')
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
