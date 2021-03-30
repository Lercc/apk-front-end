<template>
  <div class="card apk-shadow"
    :class="type === 'dark' ? 'bg-default': ''"
  >
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0 text-muted" :class="type === 'dark' ? 'text-white': ''">
            Tabla de Asistentes
          </h3>
        </div>
        <div class="col d-flex justify-content-end" >
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
          <th>N°</th>
          <th>Nombres</th>
          <th>Correo</th>
          <th>Celular</th>
        </template>


        <template slot-scope="{row}">
          <td class="text-left">
            <b-dropdown size="sm" text="•••" variant="primary">
              <b-dropdown-item class="" @click="eliminar(row.id)"><span class="text-danger">Eliminar</span></b-dropdown-item>
            </b-dropdown>
          </td>
          <td >{{row.id}}</td>
          <td >{{row.full_name}}</td>
          <td >{{row.email}}</td>
          <td >{{row.mobile}}</td>
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
  import * as assistant from '@/api/assistant'
  import swal from 'sweetalert'

  export default {
    name: 'AssistantsTable',
    props: {
      type: {
        type: String
      },
      title: String
    }, 
    data() {
      return {
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
        assistant.getAssistants (pPage)
          .then( res => {
            if (res.status == 200) {
              this.meta = res.data.meta
              this.tableData = res.data.data.map( m => m.attributes )
              this.$notify({
                type: 'success',
                title: 'Datos recuperados!!'
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
      
      recargarDatos() {
        this.cargardatos()
      },
      
      eliminar(pAssistantId) {
         swal('¿Estás seguro de eliminar este registro?', {
                    icon: 'warning',
                    dangerMode: true,
                    buttons: true,
                }
            ).then( resp => {
                if(resp) {
                    assistant.destroyAssistant(pAssistantId)
                        .then( res => {
                            if(res.status == 204) {
                                this.recargarDatos()
                                this.$notify({
                                    type: 'info',
                                    title: 'Eliminado correctamente!!'
                                })
                            }
                        }).catch( err => {
                            if(err.response){
                              this.$notify({
                                    type: 'danger',
                                    title: 'Error al eliminar'
                              })
                            }
                        })
                }
            })
      }
      // editar (pProgramId) {
      //   this.$router.push({
      //     name: 'editar-programa',
      //     params: {
      //       programId: pProgramId
      //     }
      //   })
      // },

      // crearNuevoPrograma () {
      //   this.$router.push({
      //     name: 'crear-programa',
      //   })
      // },


    }
  }
</script>
<style scoped>
.apk-shadow {
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.16);
}
</style>
