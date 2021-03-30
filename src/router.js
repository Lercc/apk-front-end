import Vue from 'vue'
import Router from 'vue-router'
import ApkAdmin from '@/views/ApkAdmin/ApkAdmin'
import ApkAuth from '@/views/ApkAuth/ApkAuth'
import NotFound from '@/views/DefaultViews/NotFound'

 import store from '@/store'


Vue.use(Router)

export default new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: 'login',
      component: ApkAuth,
      beforeEnter(to, from, next) {
        if (store.state.user.data.rol) next({ name: 'gestion-de-aplicantes' })
        else next()
      },
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "login" */ '@/views/ApkAuth/components/Login.vue')
        },
        {
          path: '/login-traveler',
          name: 'login-traveler',
          component: () => import(/* webpackChunkName: "login" */ '@/views/ApkAuth/components/LoginTraveler.vue')
        },
        {
          path: '/registro',
          name: 'registro',
          component: () => import(/* webpackChunkName: "registro" */ '@/views/ApkAuth/components/Registro.vue')
        },
        {
          path: '/registro-webinar',
          name: 'registro-webinar',
          component: () => import(/* webpackChunkName: "registro" */ '@/views/ApkAuth/components/RegistroWebinar.vue')
        }
      ]
    },

    {
      path: '/',
      redirect: 'gestion-de-aplicantes',
      component: ApkAdmin,
      beforeEnter(to, from, next) {
        if (store.state.clientAplication.role)  next()
        else if (!store.state.user.data.rol) next({ name: 'login' }) 
        else next()
      },
      children: [
        {
          path: '/registro-voucher',
          name: 'registro-voucher',
          redirect: '/registro-voucher/detalles-voucher',
          component: () => import(/* webpackChunkName: "dashboard-admin" */ '@/views/ApkAdmin/components/RegistroVoucher.vue'),
          beforeEnter(to, from, next) {
            if (!store.state.clientAplication.role)  next({ name: 'login-traveler'})
            else next()
          },
          children: [
            {
              path: '/registro-voucher/detalles-voucher', //:clientId -> parámetro oculto
              name: 'detalles-voucher',
              component: () => import(/* webpackChunkName: "detalles-voucher" */ '@/views/RegistroVoucherComponents/DetallesVoucher.vue')
            },
            {
              path: '/registro-voucher/registrar-nuevo-voucher', //:clientProgramId -> parámetro oculto
              name: 'registrar-nuevo-voucher',
              component: () => import(/* webpackChunkName: "registrar-nuevo-voucher" */ '@/views/RegistroVoucherComponents/RegistrarNuevoVoucher.vue')
            },
          ]
        },

        {
          path: '/gestion-aplicantes',
          redirect:'/gestion-aplicantes/lista-aplicantes',
          name: 'gestion-de-aplicantes',
          component: () => import(/* webpackChunkName: "gestion-de-aplicantes" */ '@/views/ApkAdmin/components/GestionClientes.vue'),
          beforeEnter(to, from, next) {
            if (store.state.user.data.rol == 'admin')  next({ name: 'inicio' })
            else if (store.state.clientAplication.role) next({ name: 'registro-voucher' })
            else next()
          },
          children: [
            {
              path: '/gestion-aplicantes/lista-aplicantes',
              name: 'lista-aplicantes',
              component: () => import(/* webpackChunkName: "lista-aplicantes" */ '@/views/GestionClientsComponents/ClientsTable.vue')
            },
            {
              path: '/gestion-aplicantes/detalles-aplicante/:clientId',
              name: 'detalles-aplicante',
              component: () => import(/* webpackChunkName: "detalles-aplicante" */ '@/views/GestionClientsComponents/ClientDetails.vue')
            },
            {
              path: '/gestion-aplicantes/crear-voucher/:clientProgramId/:clientId',
              name: 'crear-voucher',
              component: () => import(/* webpackChunkName: "crear-voucher" */ '@/views/GestionClientsComponents/CrearVoucher.vue')
            },
            {
              path: '/gestion-aplicantes/editar-voucher/:voucherId/:clientId',
              name: 'editar-voucher',
              component: () => import(/* webpackChunkName: "editar-voucher" */ '@/views/GestionClientsComponents/EditarVoucher.vue')
            },
            {
              path: '/gestion-aplicantes/crear-aplicante',
              name: 'crear-aplicante',
              component: () => import(/* webpackChunkName: "crear-aplicante" */ '@/views/GestionClientsComponents/CrearCliente.vue')
            },
            {
              path: '/gestion-aplicantes/editar-aplicante/:clientId',
              name: 'editar-aplicante',
              component: () => import(/* webpackChunkName: "editar-aplicante" */ '@/views/GestionClientsComponents/EditarCliente.vue')
            },
          ]
        },

        {
          path: '/gestion-leads',
          redirect:'/gestion-leads/lista-leads-calificados',
          name: 'gestion-de-leads',
          component: () => import(/* webpackChunkName: "gestion-de-leads" */ '@/views/ApkAdmin/components/GestionLeads.vue'),
          beforeEnter(to, from, next) {
            if (store.state.user.data.rol == 'admin')  next({ name: 'inicio' })
            else if (store.state.clientAplication.role) next({ name: 'registro-voucher' })
            else next()
          },
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
          beforeEnter(to, from, next) {
            if (store.state.user.data.rol == 'admin')  next({ name: 'inicio' })
            else if (store.state.clientAplication.role) next({ name: 'registro-voucher' })
            else next()
          },
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
          beforeEnter(to, from, next) {
            if (store.state.user.data.rol == 'admin')  next({ name: 'inicio' })
            else if (store.state.clientAplication.role) next({ name: 'registro-voucher' })
            else next()
          },
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
          path: '/webinar',
          redirect: '/webinar/lista-asistentes',
          name: 'webinar',
          component: () => import(/* webpackChunkName: "webinar" */ '@/views/ApkAdmin/components/Webinar.vue'),
          beforeEnter(to, from, next) {
            if (store.state.user.data.rol == 'admin')  next({ name: 'inicio' })
            else if (store.state.clientAplication.role) next({ name: 'registro-voucher' })
            else next()
          },
          children: [
            {
              path: '/webinar/lista-asistentes',
              name: 'lista-asistentes',
              component: () => import(/* webpackChunkName: "listar-asistentes" */ '@/views/AssistantComponents/AssistantsTable.vue'),
            }
          ]
        },
        {
          path: '/programs',
          redirect: '/programs/lista-programas',
          name: 'programs',
          component: () => import(/* webpackChunkName: "programas" */ '@/views/ApkAdmin/components/Programs.vue'),
          beforeEnter(to, from, next) {
            if (store.state.user.data.rol == 'admin')  next({ name: 'inicio' })
            else if (store.state.clientAplication.role) next({ name: 'registro-voucher' })
            else next()
          },
          children: [
            {
              path: '/programs/lista-programas',
              name: 'lista-programas',
              component: () => import(/* webpackChunkName: "listar-programas" */ '@/views/ProgramComponents/ProgramsTable.vue'),
            },
            {
              path: '/programs/editar-programa/:programId',
              name: 'editar-programa',
              component: () => import(/* webpackChunkName: "editar-programas" */ '@/views/ProgramComponents/EditarPrograma.vue'),
            },
            {
              path: '/programs/crear-programa',
              name: 'crear-programa',
              component: () => import(/* webpackChunkName: "crear-programas" */ '@/views/ProgramComponents/CrearPrograma.vue'),
            }
          ]
        },

        {
          path: '/inicio',
          name: 'inicio',
          component: () => import(/* webpackChunkName: "dashboard-admin" */ '@/views/ApkAdmin/components/Inicio.vue'),
          beforeEnter(to, from, next) {
            if (store.state.user.data.rol == 'employee')  next({ name: 'gestion-de-aplicantes' })
            else if (store.state.clientAplication.role) next({ name: 'registro-voucher' })
            else next()
          },
        },

        {
          path: '/users',
          redirect: '/users/lista-usuarios',
          name: 'users',
          component: () => import(/* webpackChunkName: "users" */ '@/views/ApkAdmin/components/Users.vue'),
           beforeEnter(to, from, next) {
            if (store.state.user.data.rol == 'employee')  next({ name: 'gestion-de-aplicantes' })
            else if (store.state.clientAplication.role) next({ name: 'registro-voucher'})
            else next()
          },
          children: [
            {
              path: '/users/lista-usuarios',
              name: 'lista-usuarios',
              component: () => import(/* webpackChunkName: "listar-usuarios" */ '@/views/UserComponents/UsersTable.vue'),
            },
            {
              path: '/users/editar-usuarios/:usuarioId',
              name: 'editar-usuario',
              component: () => import(/* webpackChunkName: "editar-usuarios" */ '@/views/UserComponents/EditarUsuario.vue'),
            },
            {
              path: '/users/crear-usuarios',
              name: 'crear-usuario',
              component: () => import(/* webpackChunkName: "crear-usuarios" */ '@/views/UserComponents/CrearUsuario.vue'),
            }
          ]
        }
      ]
    },
    { path: '*', component: NotFound }
  ]
})
