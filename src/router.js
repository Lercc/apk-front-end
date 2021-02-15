import Vue from 'vue'
import Router from 'vue-router'
import ApkAdmin from '@/views/ApkAdmin/ApkAdmin'
// import ApkAuth from '@/layout/AuthLayout'
import ApkAuth from '@/views/ApkAuth/ApkAuth'

// import GestionVouchers from '@/views/ApkAdmin/components/GestionVouchers.vue'


Vue.use(Router)

export default new Router({
  // mode: 'history',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: 'login',
      component: ApkAuth,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "login" */ '@/views/ApkAuth/components/Login.vue')
        },
        {
          path: '/registro',
          name: 'registro',
          component: () => import(/* webpackChunkName: "registro" */ '@/views/ApkAuth/components/Registro.vue')
        }
      ]
    },
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
              component: () => import(/* webpackChunkName: "lista-Clientes" */ '@/views/GestionClientsComponents/ClientsTable.vue')
            },
            {
              path: '/gestion-clientes/detalles-cliente/:clientId',
              name: 'detalles-Cliente',
              component: () => import(/* webpackChunkName: "detalles-Cliente" */ '@/views/GestionClientsComponents/ClientDetails.vue')
            },
            {
              path: '/gestion-clientes/crear-voucher/:clientProgramId/:clientId',
              name: 'crear-voucher',
              component: () => import(/* webpackChunkName: "crear-voucher" */ '@/views/GestionClientsComponents/CrearVoucher.vue')
            },
            {
              path: '/gestion-clientes/editar-voucher/:voucherId/:clientId',
              name: 'editar-voucher',
              component: () => import(/* webpackChunkName: "editar-voucher" */ '@/views/GestionClientsComponents/EditarVoucher.vue')
            },
            {
              path: '/gestion-clientes/crear-cliente',
              name: 'crear-cliente',
              component: () => import(/* webpackChunkName: "crear-cliente" */ '@/views/GestionClientsComponents/CrearCliente.vue')
            },
            {
              path: '/gestion-clientes/editar-cliente/:clientId',
              name: 'editar-cliente',
              component: () => import(/* webpackChunkName: "editar-cliente" */ '@/views/GestionClientsComponents/EditarCliente.vue')
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
          redirect: '/carreras/lista-carreras',
          name: 'carreras',
          component: () => import(/* webpackChunkName: "careers" */ '@/views/ApkAdmin/components/Careers.vue'),
          children: [
            {
              path: '/carreras/lista-carreras',
              name: 'lista-carreras',
              component: () => import(/* webpackChunkName: "lista-carreras" */ '@/views/CareersComponents/CareersTable.vue')
            },
            {
              path: '/carreras/editar-carrera/:careerId',
              name: 'editar-carrera',
              component: () => import(/* webpackChunkName: "editar-carrera" */ '@/views/CareersComponents/EditarCarrera.vue')
            },
            {
              path: '/carreras/crear-carrera',
              name: 'crear-carrera',
              component: () => import(/* webpackChunkName: "crear-carrera" */ '@/views/CareersComponents/CrearCarrera.vue')
            }
          ]
        },
        {
          path: '/instituciones',
          redirect:'/instituciones/lista-instituciones',
          name: 'instituciones',
          component: () => import(/* webpackChunkName: "instituciones" */ '@/views/ApkAdmin/components/Institutions.vue'),
          children: [
            {
              path: '/instituciones/lista-instituciones',
              name: 'lista-instituciones',
              component: () => import(/* webpackChunkName: "lista-instituciones" */ '@/views/InstitutionsComponents/InstitutionsTable.vue')
            },
            {
              path: '/instituciones/editar-institucion/:institucionId',
              name: 'editar-institucion',
              component: () => import(/* webpackChunkName: "editar-instituciones" */ '@/views/InstitutionsComponents/EditarInstitucion.vue')
            },
            {
              path: '/instituciones/crear-institucion',
              name: 'crear-institucion',
              component: () => import(/* webpackChunkName: "crear-instituciones" */ '@/views/InstitutionsComponents/CrearInstitucion.vue')
            }
          ]
        },
        {
          path: '/programs',
          redirect: '/programs/lista-programas',
          name: 'programs',
          component: () => import(/* webpackChunkName: "institutions" */ '@/views/ApkAdmin/components/Programs.vue'),
          children: [
            {
              path: '/programs/lista-programas',
              name: 'lista-programas',
              component: () => import(/* webpackChunkName: "institutions" */ '@/views/ProgramComponents/ProgramsTable.vue'),
            },
            {
              path: '/programs/editar-programa/:programId',
              name: 'editar-programa',
              component: () => import(/* webpackChunkName: "institutions" */ '@/views/ProgramComponents/EditarPrograma.vue'),
            },
            {
              path: '/programs/crear-programa',
              name: 'crear-programa',
              component: () => import(/* webpackChunkName: "institutions" */ '@/views/ProgramComponents/CrearPrograma.vue'),
            }
          ]
        },
        {
          path: '/users',
          redirect: '/users/lista-usuarios',
          name: 'users',
          component: () => import(/* webpackChunkName: "institutions" */ '@/views/ApkAdmin/components/Users.vue'),
          children: [
            {
              path: '/users/lista-usuarios',
              name: 'lista-usuarios',
              component: () => import(/* webpackChunkName: "institutions" */ '@/views/UserComponents/UsersTable.vue'),
            },
            {
              path: '/users/editar-usuarios/:usuarioId',
              name: 'editar-usuario',
              component: () => import(/* webpackChunkName: "institutions" */ '@/views/UserComponents/EditarUsuario.vue'),
            },
            {
              path: '/users/crear-usuarios',
              name: 'crear-usuario',
              component: () => import(/* webpackChunkName: "institutions" */ '@/views/UserComponents/CrearUsuario.vue'),
            }
          ]
        }
      ]
    }
  ]
})
