<template>
  <div class="card apk-shadow"
    :class="type === 'dark' ? 'bg-default': ''"
  >
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0 text-muted" :class="type === 'dark' ? 'text-white': ''">
            Tabla de Instituciones
          </h3>
        </div>
        <div class="col d-flex justify-content-end" >
            <b-button variant="success" size="sm" @click="crearNuevaInstitucion ">
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
          <th>institucion</th>
          <th>estado</th>
          <th>tipo</th>
          <th>descripción</th>
        </template>


        <template slot-scope="{row}">
          <td class="text-left">
            <b-dropdown size="sm" text="•••" variant="primary">
              <b-dropdown-item class="" @click="editar(row.id)"><span class="text-primary">Editar</span></b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item 
                @click="cambiarEstado(row, 'activado')" 
                v-if="row.state=='desactivado'" ><span class="text-uppercase text-success" >activar</span>
              </b-dropdown-item>
              <b-dropdown-item 
                @click="cambiarEstado(row, 'desactivado')" 
                v-if="row.state=='activado'" ><span class="text-uppercase text-danger" >desactivar</span>
              </b-dropdown-item>
            </b-dropdown>
          </td>
          <td >{{row.id}}</td>
          <td >{{row.name}}</td>
          <td >
            <badge class="badge-dot mr-4"  :type="row.state == 'desactivado' ? 'danger' : 'success'">
              <i :class="`bg-${row.state == 'desactivado' ? 'danger' : 'success'}`"></i>
              <span class="status">{{row.state}}</span>
            </badge>            
          </td>
          <td >{{row.tipo}}</td>
          <td >{{row.description}}</td>
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
  import * as institution from '@/api/institution'

  export default {
    name: 'CarrersTable',
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
        institution.getInstitutions(pPage)
          .then( res => {
            if (res.status == 200) {
              this.data = res.data.data
              this.meta = res.data.meta

              this.tableData = res.data.data.map( m => m.attributes )
              this.$notify({
                type: 'success',
                title: 'Datos recuperados'
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
      
      cambiarEstado (pInstitucion, pState) {

        const institutionForm = new FormData()

        institutionForm.append('.method', 'put')
        institutionForm.append('name',pInstitucion.name)
        institutionForm.append('state',pState)
        institutionForm.append('tipo',pInstitucion.tipo)

        institution.updateInstitutionState(pInstitucion.id, institutionForm)
          .then( res => {
              if (res.status == 200) {
                this.$set(pInstitucion,'state', pState)
                this.$notify({
                  type: 'info',
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

      editar (pInstitucionId) {
        this.$router.push({
          name: 'editar-institucion',
          params: {
            institucionId: pInstitucionId
          }
        })
      },

      crearNuevaInstitucion () {
        this.$router.push({
          name: 'crear-institucion',
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
