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
        />

        <sidebar-item :link="{name: 'Gestión de Clientes', icon: 'ni ni-folder-17 text-blue', path: '/gestion-clientes'}"/>
        <sidebar-item :link="{name: 'Gestión de Leads', icon: 'ni ni-single-02 text-orange', path: '/gestion-leads'}"/>
        <sidebar-item :link="{name: 'Carreras', icon: 'ni ni-ruler-pencil text-yellow', path: '/carreras'}"/>
        <sidebar-item :link="{name: 'Instituciones', icon: 'ni ni-align-left-2 text-red', path: '/institutions'}"/>
        <sidebar-item :link="{name: 'Programas', icon: 'ni ni-tag text-green', path: '/programs'}"/>
        
      </template>
    </side-bar>
    
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

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
  import DashboardNavbar from '@/layout/DashboardNavbar.vue';
  import ContentFooter from '@/layout/ContentFooter.vue';
  import { FadeTransition } from 'vue2-transitions';

  export default {

    components: {
      DashboardNavbar,
      ContentFooter,
      FadeTransition
    },
    data() {
      return {
        sidebarBackground: 'vue' //vue|blue|orange|green|red|primary
      };
    },
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
