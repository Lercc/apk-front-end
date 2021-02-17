<template>
    <admin-nav class="navbar-top navbar-dark"
              id="navbar-main"
              :show-toggle-button="false"
              expand>
              
        <ul class="navbar-nav align-items-center d-none d-md-flex">
            <li class="nav-item dropdown">
                <admin-dropdown class="nav-link pr-0">
                    <div class="media align-items-center" slot="title">
                        <div class="media-body ml-2 d-none d-lg-block mr-3">
                            <span class="mb-0 text-sm  font-weight-bold">{{data.name }}</span>
                        </div>
                        <span class="avatar avatar-sm rounded-circle rounded-circle apk-employee opacity-8">
                          <img class="apk-employee-img" alt="employee" src="/img/icons/apk/logo_social-262x262.png">
                        </span>
                    </div>

                    <p class="dropdown-item mb-0" style="cursor:pointer" @click="salir(data.id)" v-if="role== 'clientAplication' ? false : true">
                      <i class="ni ni-user-run"></i>
                      <span>Logout</span>
                    </p>

                    <p class="dropdown-item mb-0" style="cursor:pointer" @click="logoutTraveler(id)" v-if="role== 'clientAplication' ? true : false">
                        <i class="ni ni-user-run"></i>
                        <span>Traveler Logout</span>
                    </p>
                </admin-dropdown>
            </li>
        </ul>
    </admin-nav>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import axios from 'axios';

  export default {
    data() {
      return {
        activeNotifications: false,
        showMenu: false,
        searchQuery: ''
      };
    },

    computed: {
      ...mapState ('user', ['data']),
      ...mapState ('api', ['url']),
      ...mapState ('token', ['token']),
      ...mapState ('clientAplication', ['id','role','cliAppToken']),
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
      toggleSidebar() {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
      },
      hideSidebar() {
        this.$sidebar.displaySidebar(false);
      },
      toggleMenu() {
        this.showMenu = !this.showMenu;
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