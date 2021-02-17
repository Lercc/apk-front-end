<template>
    <nav class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white" id="sidenav-main">
        <div class="container-fluid">

            <!--Toggler-->
            <navbar-toggle-button @click.native="showSidebar">
                <span class="navbar-toggler-icon"></span>
            </navbar-toggle-button>
            <router-link class="navbar-brand" to="/">
                <img :src="logo" class="navbar-brand-img" alt="...">
            </router-link>

            <slot name="mobile-right">
                <ul class="nav align-items-center d-md-none">
                    <!-- NOTIFICACIONES -->
                    <!-- <base-dropdown class="nav-item" position="right">
                        <a slot="title" class="nav-link nav-link-icon" href="#" role="button" data-toggle="dropdown"
                           aria-haspopup="true" aria-expanded="false">
                            <i class="ni ni-bell-55"></i>
                        </a>

                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </base-dropdown> -->
                    <!-- END NOTIFICACIONES -->
                    
                    <base-dropdown class="nav-item" position="right">
                        <a slot="title" class="nav-link" href="#" role="button">
                            <div class="media align-items-center">
                              <span class="avatar avatar-sm rounded-circle apk-employee opacity-8">
                                <img class="apk-employee-img" alt="employeee" src="/img/icons/apk/logo_social-262x262.png">
                              </span>
                            </div>
                        </a>

                        <div class=" dropdown-header noti-title">
                            <h6 class="text-overflow m-0">opciones</h6>
                        </div>

                        <div class="dropdown-divider"></div>

                        <p class="dropdown-item mb-0" style="cursor:pointer" @click="salir(data.id)" v-if="role== 'clientAplication' ? false : true">
                          <i class="ni ni-user-run"></i>
                          <span>Logout</span>
                        </p>

                        <p class="dropdown-item mb-0" style="cursor:pointer" @click="logoutTraveler(id)" v-if="role== 'clientAplication' ? true : false">
                          <i class="ni ni-user-run"></i>
                          <span>Traveler Logout</span>
                        </p>
                    </base-dropdown>
                </ul>
            </slot>
            <slot></slot>
            <div v-show="$sidebar.showSidebar" class="navbar-collapse collapse show" id="sidenav-collapse-main">

                <div class="navbar-collapse-header d-md-none">
                    <div class="row">
                        <div class="col-6 collapse-brand">
                            <router-link to="/">
                                <img :src="logo">
                            </router-link>
                        </div>
                        <div class="col-6 collapse-close">
                            <navbar-toggle-button @click.native="closeSidebar"></navbar-toggle-button>
                        </div>
                    </div>
                </div>

                <ul class="navbar-nav">
                    <slot name="links">
                    </slot>
                </ul>
                <!--Divider-->
                <hr class="my-3">
            </div>
          </div>
    </nav>
</template>
<script>
  import NavbarToggleButton from '@/components/NavbarToggleButton'
  /** */
  import { mapState, mapMutations } from 'vuex';
  import axios from 'axios';
  /** */

  export default {
    name: 'sidebar',
    components: {
      NavbarToggleButton
    },
    props: {
      logo: {
        type: String,
        default: '/img/brand/imagotipo-w&t-524x170.png',
        description: 'Sidebar app logo'
      },
      autoClose: {
        type: Boolean,
        default: true,
        description: 'Whether sidebar should autoclose on mobile when clicking an item'
      }
    },

    /** */
    computed: {
      ...mapState ('user', ['data']),
      ...mapState ('api', ['url']),
      ...mapState ('token', ['token']),

      ...mapState ('clientAplication', ['id','role','cliAppToken']),
    },
    /** */

    provide() {
      return {
        autoClose: this.autoClose
      };
    },

    methods: {
      /** */
       ...mapMutations('user',['clearUserStoreData']),
      ...mapMutations('token',['clearTokenStoreData']),
      ...mapMutations('clientAplication',['clearTokenCliAppStoreData']),

      salir (pUserId) {
          axios({
              url : `${this.url}/api/logout/${pUserId}`,
              method:'post',
              headers: { 'Authorization' : `Bearer ${this.token}` }
            })
            .then(res => {
              if (res.status == 203) {

                this.clearUserStoreData({})
                this.clearTokenStoreData({})

                this.$notify({
                  type: 'success',
                  title: res.data.message 
                })

                this.$router.push({name:'login'})
              }
            })
            .catch ( err => {
              this.$notify({
                type: 'danger',
                title: err.message 
              })
            })
      },

      logoutTraveler (pClientId) {
          axios({
              url : `${this.url}/api/logout/client/${pClientId}`,
              method:'post',
              headers: { 'Authorization' : `Bearer ${this.cliAppToken}` }
            })
            .then(res => {
              if (res.status == 203) {

                this.clearTokenCliAppStoreData()

                this.$notify({
                  type: 'success',
                  title: res.data.message 
                })

                this.$router.push({name:'login-traveler'})
              }
            })
            .catch ( err => {
              this.$notify({
                type: 'danger',
                title: err.message 
              })
            })
      },
      /** */

      closeSidebar() {
        this.$sidebar.displaySidebar(false)
      },
      showSidebar() {
        this.$sidebar.displaySidebar(true)
      }
    },
    beforeDestroy() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.showSidebar = false;
      }
    }
  };
</script>
<style scoped>
  .apk-employee {
    background-color: rgba(0, 0, 0, .05);
  }
  .apk-employee-img{
    transform: scale(.95);
  }
</style>