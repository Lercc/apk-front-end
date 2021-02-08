<template>
  <div class="card apk-shadow"
    :class="type === 'dark' ? 'bg-default': ''"
  >
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''" c>
            Tabla de Clientes
          </h3>
        </div>
        <div class="col d-flex justify-content-end" >
          <!-- <base-button type="success" size="sm" class="d-flex">
            <span class="align-self-center">NUEVO</span>
            <b-icon icon="person-plus-fill" font-scale="1" />
          </base-button>
          <base-button type="success" size="sm" class="d-flex">
            <b-icon icon="arrow-counterclockwise" font-scale="1.5" />
          </base-button> -->
            <b-button variant="success" size="sm">
              <b-icon icon="person-plus-fill" ></b-icon>
              <span>NUEVO</span>
            </b-button>

            <b-button variant="success" size="sm">
              <b-icon icon="arrow-counterclockwise" ></b-icon>
            </b-button>
        </div>
      </div>

    </div>

    <!-- LOADER -->
    <div class="bg-secondary d-flex justify-content-center  py-8" v-if="dataTableLoading">
      <pulse-loader :loading="dataTableLoading" :size="20" :margin="'15px'" :color="'#2B2D64'" />
    </div>
    <!-- END LOADER -->

    <div class="table-responsive" v-show="!dataTableLoading">
      <base-table class="table align-items-center table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                  tbody-classes="list"
                  :data="tableData">
        <template slot="columns">
          <th>id</th>
          <th>dni</th>
          <th>cliente</th>
          <th>celular</th>
          <th>correo</th>
          <th>&nbsp;</th>
        </template>


        <template slot-scope="{row}">
          <th scope="row">{{row.id}}</th>
          <th scope="row">{{row.dni}}</th>
          <th scope="row">{{row.name}} {{row.surnames}}</th>
          <th scope="row">{{row.mobile}}</th>
          <th scope="row">{{row.email}}</th>
          <th scope="row">
            <b-button variant="outline-primary" size="sm" @click="clientDetails(row)">
              <b-icon icon="list-task" ></b-icon>
              <span>VER DETALLES</span>
            </b-button>
          </th>
        </template>

      </base-table>
    </div>

    <div 
      class="card-footer d-flex justify-content-end"
      :class="type === 'dark' ? 'bg-transparent': ''"
      v-if="!dataTableLoading"
    >
      <base-pagination 
        :pageCount="meta.last_page" 
        :perPage="meta.per_page"
        :value="meta.current_page"
        @input="cargardatos"
      >
      </base-pagination>
    </div>

  </div>
</template>
<script>
  // import axios from 'axios';
  import { getClients } from '@/api/clients'
  // import swal from 'sweetalert';
  import { mapMutations } from 'vuex';
  // import store from '@/store';

  export default {
    name: 'client-table',
    props: {
      type: {
        type: String
      },
      title: String
    }, 
    data() {
      return {
        data: [] ,
        links: [] ,
        meta: [] ,
        status:'',
        //
        tableData: [],
        //
        dataTableLoading: false,
      }
    },
    beforeMount() {
      this.cargardatos()

    },
    methods: {
      ...mapMutations('client',['setClientStoreData']),

      cargardatos (pPage) {
        this.dataTableLoading = true
        getClients(pPage)
          .then( res => {
            if (res.status == 200) {
              this.status = 200
              this.data = res.data.data
              this.links = res.data.links
              this.meta = res.data.meta

              this.tableData = res.data.data.map( m => m.attributes )
            }
          }).catch( err => {
            if(err.response){
              this.status = err.response.status
            } else {
              this.$notify({
                type: 'danger',
                title: err.message
              })
            }
          }).finally( () => {
            this.dataTableLoading = false
            if(this.status == 200) {
              this.$notify({
                type: 'success',
                title: `${this.status}: Datos recuperados`
              })
            } else {
              this.$notify({
                type: 'danger',
                title: `${this.status}: Algo salio mal`
              })
            }
          })
        
      },

      clientDetails(row) {
        this.setClientStoreData(row)
        this.$router.push({
          name: 'detalles-Cliente',
          params: {
            id: row.id
          }
        })
      }
    }
  }
</script>
<style scoped>
.apk-shadow {
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.16);
}
</style>
