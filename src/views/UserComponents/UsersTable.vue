<template>
  <div class="card apk-shadow"
    :class="type === 'dark' ? 'bg-default': ''"
  >
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0 text-muted" :class="type === 'dark' ? 'text-white': ''">
            Tabla de usuarios
          </h3>
        </div>
        <div class="col d-flex justify-content-end" >
            <b-button variant="success" size="sm" @click="crearNuevoUsuario">
              <b-icon icon="plus" variant="secondary"></b-icon>
              <span>NUEVO</span>
            </b-button>

            <b-button variant="success" size="sm" @click="recargarDatos">
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

    <div class="table-responsive" style="min-height: 350px" v-show="!dataTableLoading">
      <base-table class="table align-items-center table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                  tbody-classes="list"
                  :data="tableData">
        <template slot="columns">
          <th>&nbsp;</th>
          <th>id</th>
          <th>nombre</th>
          <th>correo</th>
          <th>rol</th>
        </template>


        <template slot-scope="{row}">
          <td class="text-left">
            <b-dropdown size="sm" text="•••" variant="primary" v-if="row.email == 'apk@admin.com' || row.email == 'apk.aplication@admin.com' ? false : true">
              <b-dropdown-item class="" @click="editar(row.id)"><span class="text-primary">Editar</span></b-dropdown-item>
              <b-dropdown-item class="" @click="eliminar(row.id)"><span class="text-danger">Eliminar</span></b-dropdown-item>
            </b-dropdown>
          </td>
          <td >{{row.id}}</td>
          <td >{{row.name}}</td>
          <td >{{row.email}}</td>
          <td >{{row.role[0].name}}</td>
          <!-- <td >
            <badge class="badge-dot mr-4"  :type="row.state == 'desactivado' ? 'danger' : 'success'">
              <i :class="`bg-${row.state == 'desactivado' ? 'danger' : 'success'}`"></i>
              <span class="status">{{row.state}}</span>
            </badge>            
          </td> -->
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

  import * as usuario from '@/api/usuario';

  export default {
    name: 'UsersTable',
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
      }
    },
    beforeMount() {
      this.cargardatos()
    },
    methods: {
      cargardatos (pPage) {
        this.dataTableLoading = true
        usuario.getUsers (pPage)
          .then( res => {
            if (res.status == 200) {
              this.data = res.data.data
              this.meta = res.data.meta

              this.tableData = res.data.data.map( m => m.attributes )
              this.$notify({
                type: 'success',
                title: 'Usuarios recuperados!!'
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
     
      editar (pUsuarioId) {
        this.$router.push({
          name: 'editar-usuario',
          params: {
            usuarioId: pUsuarioId
          }
        })
      },

      eliminar(pUsuarioId){
        usuario.destroyUser(pUsuarioId)
        .then( res => {
            if (res.status == 204) {
              this.$notify({
                type: 'success',
                title: 'Registro eliminado!'
              })
              this.eliminarDeArray(pUsuarioId)

            } else if (res.status == 203) {
              this.$notify({
                type: 'warning',
                title: res.data.message
              })
            }
          }).catch( err => {
            if (err.response) {
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
          })
      },

      eliminarDeArray(pUsuarioId) {
        this.tableData.map((m, index) => {
          if( m.id == pUsuarioId) {
            this.tableData.splice(index,1)
          }
        })
      },

      crearNuevoUsuario () {
        this.$router.push({
          name: 'crear-usuario',
        })
      },

      recargarDatos() {
        this.cargardatos()
      }

    }
  }
</script>
<style scoped>
.apk-shadow {
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.16);
}
</style>
