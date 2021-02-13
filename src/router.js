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
          path: '/gestion-clientes',
          redirect:'/gestion-clientes/lista-clientes',
          name: 'gestion-de-clientes',
          component: () => import(/* webpackChunkName: "gestion-de-clientes" */ '@/views/ApkAdmin/components/GestionClientes.vue'),
          children: [
            {
              path: '/gestion-clientes/lista-clientes',
              name: 'lista-Clientes',
              component: () => import(/* webpackChunkName: "lista-Clientes" */ '@/views/GestionVoucherComponents/ClientsTable.vue')
            },
            {
              path: '/gestion-clientes/detalles-cliente/:clientId',
              name: 'detalles-Cliente',
              component: () => import(/* webpackChunkName: "detalles-Cliente" */ '@/views/GestionVoucherComponents/ClientDetails.vue')
            },
            {
              path: '/gestion-clientes/crear-voucher/:clientProgramId/:clientId',
              name: 'crear-voucher',
              component: () => import(/* webpackChunkName: "crear-voucher" */ '@/views/GestionVoucherComponents/CrearVoucher.vue')
            },
            {
              path: '/gestion-clientes/editar-voucher/:voucherId/:clientId',
              name: 'editar-voucher',
              component: () => import(/* webpackChunkName: "editar-voucher" */ '@/views/GestionVoucherComponents/EditarVoucher.vue')
            },
            {
              path: '/gestion-clientes/crear-cliente',
              name: 'crear-cliente',
              component: () => import(/* webpackChunkName: "crear-cliente" */ '@/views/GestionVoucherComponents/CrearCliente.vue')
            },
            {
              path: '/gestion-clientes/editar-cliente/:clientId',
              name: 'editar-cliente',
              component: () => import(/* webpackChunkName: "editar-cliente" */ '@/views/GestionVoucherComponents/EditarCliente.vue')
            },
          ]
        },
        {
          path: '/gestion-leads',
          redirect:'/gestion-leads/lista-leads-calificados',
          name: 'gestion-de-leads',
          component: () => import(/* webpackChunkName: "gestion-de-leads" */ '@/views/ApkAdmin/components/GestionLeads.vue'),
          children: [
            {
              path: '/gestion-leads/lista-leads-calificados',
              name: 'lista-leads-calificados',
              component: () => import(/* webpackChunkName: "lista-leads" */ '@/views/GestionLeadComponents/LeadsCalificadosTable.vue')
            },
            {
              path: '/gestion-leads/lista-leads-perfiles-aceptados-todos/:mostrarDatos',
              name: 'lista-leads-perfiles-aceptados',
              component: () => import(/* webpackChunkName: "lista-leads" */ '@/views/GestionLeadComponents/LeadsPerfilesAceptadosTable.vue')
            },
            {
              path: '/gestion-leads/lista-leads-perfiles-aceptados-enviados/:mostrarDatos',
              name: 'lista-leads-perfiles-aceptados-enviados',
              component: () => import(/* webpackChunkName: "lista-leads" */ '@/views/GestionLeadComponents/LeadsPerfilesAceptadosEnviadosTable.vue')
            },
            {
              path: '/gestion-leads/lista-leads-perfiles-aceptados-no-enviados/:mostrarDatos',
              name: 'lista-leads-perfiles-aceptados-no-enviados',
              component: () => import(/* webpackChunkName: "lista-leads" */ '@/views/GestionLeadComponents/LeadsPerfilesAceptadosNoEnviadosTable.vue')
            },

            {
              path: '/gestion-leads/lista-leads-edad',
              name: 'lista-leads-edad',
              component: () => import(/* webpackChunkName: "lista-leads" */ '@/views/GestionLeadComponents/LeadsEdadTable.vue')
            },

            {
              path: '/gestion-leads/lista-leads-ingles',
              name: 'lista-leads-ingles',
              component: () => import(/* webpackChunkName: "lista-leads" */ '@/views/GestionLeadComponents/LeadsInglesTable.vue')
            },






            {
              path: '/gestion-leads/editar-lead/:leadId',
              name: 'editar-lead',
              component: () => import (/* webpackChunkName: "editar-lead" */ '@/views/GestionLeadComponents/EditarLead.vue')
            },
            {
              path: '/gestion-leads/crear-lead',
              name: 'crear-lead',
              component: () => import (/* webpackChunkName: "editar-lead" */ '@/views/GestionLeadComponents/CrearLead.vue')
            }
          ]
        },
        {
          path: '/carreras',
          name: 'carreras',
          component: () => import(/* webpackChunkName: "careers" */ '@/views/ApkAdmin/components/Careers.vue'),
          children: [
            {
              path: '/gestion-leads/lista-carreras',
              name: 'lista-carreras',
              component: () => import(/* webpackChunkName: "lista-leads" */ '@/views/CareersComponents/CareersTable.vue')
            },
            // {
            //   path: '/gestion-leads/editar-lead',
            //   name: 'editar-carrera',
            //   component: () => import(/* webpackChunkName: "editar-lead" */ '@/views/C')
            // }
          ]
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
