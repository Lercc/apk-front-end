<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="apk"
      title="apk"
    >
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'Inicio',
            icon: 'ni ni-tv-2 text-primary',
            path: '/inicio'
          }"
          v-if="data.rol==='admin' ? true : false" 
        />

        <sidebar-item :link="{name: 'Registro de Vouchers', icon: 'ni ni-folder-17 text-blue', path: '/registro-voucher'}" 
          v-if="role==='clientAplication' ? true : false" />

        <sidebar-item :link="{name: 'Gestión de Aplicantes', icon: 'ni ni-folder-17 text-blue', path: '/gestion-aplicantes'}" 
          v-if="data.rol==='employee' ? true : false" />

        <sidebar-item :link="{name: 'Gestión de Leads', icon: 'ni ni-single-02 text-orange', path: '/gestion-leads'}" 
          v-if="data.rol==='employee' ? true : false" />

        <sidebar-item :link="{name: 'Carreras', icon: 'ni ni-ruler-pencil text-yellow', path: '/carreras'}" 
          v-if="data.rol==='employee' ? true : false" />

        <sidebar-item :link="{name: 'Instituciones', icon: 'ni ni-align-left-2 text-red', path: '/instituciones'}" 
          v-if="data.rol==='employee' ? true : false" />

        <sidebar-item :link="{name: 'Programas', icon: 'ni ni-tag text-green', path: '/programs'}" 
          v-if="data.rol==='employee' ? true : false" />

        <sidebar-item :link="{name: 'Webinar', icon: 'ni ni ni-tablet-button text-red', path: '/webinar'}" 
          v-if="data.rol==='employee' ? true : false" />

        <sidebar-item :link="{name: 'Usuarios', icon: 'ni ni-single-02 text-green', path: '/users'}" 
          v-if="data.rol==='admin' ? true : false" />
     
        
      </template>
    </side-bar>
    
    <div class="main-content" :data="sidebarBackground">
      <admin-navbar></admin-navbar>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
      
    </div>
  </div>
</template>
<script>
  import AdminNavbar from '@/views/ApkAdmin/AdminNavbar.vue';
  import ContentFooter from '@/layout/ContentFooter.vue';
  import { FadeTransition } from 'vue2-transitions';

  import { mapState } from 'vuex'

  export default {

    components: {
      AdminNavbar,
      ContentFooter,
      FadeTransition
    },
    data() {
      return {
        sidebarBackground: 'vue' //vue|blue|orange|green|red|primary
      };
    },

    computed: {
      ...mapState('user',['data']),
      ...mapState('clientAplication',['role'])
    } ,

    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      }
    }
  };
</script>
<style lang="scss">
</style>
