<template>
  <div class="mt--6">
    <b-card class="mb-4">
      <b-form-row>
        <b-col cols="10">
          <b-form-group class="m-0">
            <b-input type="text" placeholder="Ingrese el nombre o dni" v-model="aplicante"></b-input>
          </b-form-group>
        </b-col>
        <b-col cols="2">
            <b-button variant="primary" size="sm" class="h-100 w-100" @click="buscarAplicante">
              <b-icon icon="search" class="m-0 p-0"/>
            </b-button>
        </b-col>
      </b-form-row>
    </b-card>

    <div class="card apk-shadow"
      :class="type === 'dark' ? 'bg-default': ''"
      >
      <div class="card-header border-0"
          :class="type === 'dark' ? 'bg-transparent': ''">
        <div class="row align-items-center">
          <div class="col">
            <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''" c>
              Tabla de Aplicantes
            </h3>
          </div>
          <div class="col d-flex justify-content-end" >
              <b-button variant="success" size="sm" @click="crearNuevoCliente">
                <b-icon icon="person-plus-fill" ></b-icon>
                <span>NUEVO</span>
              </b-button>

              <b-button :variant="searchState ? 'danger' : 'success'" size="sm" @click="recargarDatos">
                <b-icon :icon="searchState ? 'x-circle-fill' : 'arrow-counterclockwise'" ></b-icon>
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
            <th>vouchers</th>
            <th>cliente</th>
            <th
              style="background:rgba(94,114,228,0.09)"
            >
              <b-row
                style="width:500px"
              >
                <b-col cols="3">programa</b-col>
                <b-col>season</b-col>
                <b-col class="text-center">Ing.</b-col>
                <b-col>C.P.</b-col>
                <b-col class="text-center">abonado</b-col>
                <b-col class="text-right">saldo</b-col>
              </b-row>
            </th>
            <th>dni</th>
            <th>celular</th>
            <th>correo</th>
            <th>Comentario</th>
          </template>


          <template slot-scope="{row}">
            <th scope="row">{{row.id}}</th>
            <th scope="row">
              <b-button variant="outline-primary" size="sm" @click="clientDetails(row)">
                <b-icon icon="list-task" ></b-icon>
                <span> 
                  <badge class="badge-dot ml-2"  :type="row.status == 'pendiente' ? 'danger' : row.status == 'verificado' ? 'success' : 'none'">
                    <i :class="`bg-${row.status == 'pendiente' ? 'danger' : row.status == 'verificado' ? 'success' : 'none'}`"></i>
                  </badge>
                </span>
              </b-button>
            </th>
            <th scope="row">{{row.name}} {{row.surnames}}</th>
            <!-- voucher -->
            <th>
              <b-row
                style="width:500px"
                v-for="(clientProgram, i) in row.clientPrograms" :key="`${i}-cl-pr`"
              >
                <b-col cols="3">{{ clientProgram.program_name }}</b-col>

                <b-col>{{ clientProgram.season }}</b-col>

                <b-col class="text-center">{{ clientProgram.vouchers.english_amount_payed }}</b-col>

                <b-col>
                    <div class="apk-amound">{{ clientProgram.cost + 35 }}</div>
                    <div class="apk-info">
                        {{ clientProgram.cost }} + 35
                    </div>
                </b-col>

                <b-col class="text-center">
                    <div class="apk-amound">{{ clientProgram.vouchers.program_amount_payed + clientProgram.vouchers.sevis_amount_payed }}</div>
                    <div class="apk-info">
                        PROGRAMA: {{ clientProgram.vouchers.program_amount_payed }} <br>
                        SEVIS: {{ clientProgram.vouchers.sevis_amount_payed}}
                    </div>
                </b-col>

                <b-col class="text-right">
                    <span class="text-red">{{ (clientProgram.cost + 35) - (clientProgram.vouchers.program_amount_payed + clientProgram.vouchers.sevis_amount_payed) }}</span> 
                </b-col>
              </b-row>
            </th>
            <!--  -->
            <th scope="row">{{row.dni}}</th>
            <th scope="row">{{row.mobile}}</th>
            <th scope="row">{{row.email}}</th>
            <th scope="row">{{ row.commentary ? row.commentary.substring(0, 50)+'...' : ''}}</th>
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
  </div>
  
</template>
<script>
  import { getClients, getFilterClient } from '@/api/clients'
  import { mapMutations } from 'vuex';

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
        meta: [] ,
        //
        tableData: [],
        //
        dataTableLoading: false,
        //
        aplicante: '',
        searchState: false,
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
              this.data = res.data.data
              this.meta = res.data.meta

              this.tableData = res.data.data.map( m => m.attributes )
              
              this.$notify({
                type: 'success',
                title: `Datos recuperados!!`
              })
            }
          }).catch( err => {
            if(err.response){
              this.$notify({
                    type: 'danger',
                    title: `Algo salio mal: ${err.response.status}`
              })
            } else {
              this.$notify({
                type: 'danger',
                title: err.message
              })
            }
          }).finally( () => {
            this.dataTableLoading = false
          })
        
      },

      clientDetails(row) {
        this.setClientStoreData(row)
        this.$router.push({
          name: 'detalles-aplicante',
          params: {
            clientId: row.id
          }
        })
      },

      crearNuevoCliente() {
        this.$router.push({
          name: 'crear-aplicante',
        })
      },

      recargarDatos() {
        this.searchState = false
        this.cargardatos()
      },

      buscarAplicante() {
        this.searchState = true
        this.dataTableLoading = true
        getFilterClient(this.aplicante)
          .then( res => {
            if (res.status == 200) {
              this.data = res.data.data
              this.meta = res.data.meta

              this.tableData = res.data.data.map( m => m.attributes )
              
              this.$notify({
                type: 'success',
                title: `Datos recuperados!!`
              })
            }
          }).catch( err => {
            if(err.response){
              this.$notify({
                    type: 'danger',
                    title: `Algo salio mal: ${err.response.status}`
              })
            } else {
              this.$notify({
                type: 'danger',
                title: err.message
              })
            }
          }).finally( () => {
            this.dataTableLoading = false
          })
      }
    }
  }
</script>
<style scoped>
.apk-shadow {
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.16);
}
.apk-amound {
    cursor: pointer;
}
.apk-info {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform-origin: center bottom;
    transform: translateX(-50%) scale(0);
    padding: 5px 12px;
    color: white;
    background-color: rgb(55, 45, 70);
    border-radius: 8px;
    opacity: .6;
    transition: .450s ease-in-out;
}
.apk-amound:hover ~ .apk-info {
    transform:translateX(-50%) scale(1);
}
</style>
