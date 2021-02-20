<template>
  <div class="card apk-shadow"
    :class="type === 'dark' ? 'bg-default': ''"
  >
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0 text-uppercase text-muted" :class="type === 'dark' ? 'text-white': ''" c>
            Tabla de Leads - Inglés
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

    <div class="table-responsive" style="min-height: 450px" v-show="!dataTableLoading">
      <base-table class="table align-items-center table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                  tbody-classes="list"
                  :data="tableData">
                  
        <template slot="columns">
          <th>&nbsp;</th>
          <th>id</th>
          <th>dni</th>
          <th>nombres</th>
          <th>celular</th>
          <th>correo</th>
          <th>carrera</th>
          <th>semestre</th>
          <th>institucion</th>
          <th>inglés</th>
          <th>programa</th>
          <th>medio com.</th>
          <th>Horario</th>
          <th>perfil</th>
          <th>Comentario</th>
          <th>&nbsp;</th>
        </template>


        <template slot-scope="{row}">

          <td class="text-left">
            <b-dropdown size="sm" text="•••" variant="primary">
              <b-dropdown-item class="" @click="enviarCafilidados(row.id)">Enviar a <b>CALIFICADOS</b></b-dropdown-item>
              <b-dropdown-item class="" @click="enviarAceptados(row.id)">Enviar a <b>PERFILES ACEPTADOS</b></b-dropdown-item>
              <!-- <b-dropdown-item class="" @click="enviarEdad(row.id)">Enviar a <b>EDAD</b></b-dropdown-item> -->
              <b-dropdown-item class="" @click="enviarIngles(row.id)">Enviar a <b>INGLÉS</b></b-dropdown-item>

              <b-dropdown-divider></b-dropdown-divider>

              <b-dropdown-item class="" @click="editar(row.id)"><span class="text-primary">Editar</span></b-dropdown-item>
              <b-dropdown-item class="text-danger" @click="eliminar(row.id)"><span class="text-danger">Eliminar</span></b-dropdown-item>
            </b-dropdown>
          </td>
          <td >{{row.id}}</td>
          <td >{{row.dni}}</td>
          <td >{{row.name}} {{row.surnames}}</td>
          <td >{{row.mobile}}</td>
          <td >{{row.email}}</td>
          <td >{{row.career_name}}</td>
          <td >{{row.semester}}</td>
          <td >{{row.institution_name}}</td>
          <td >{{row.english_level}}</td>
          <td >{{row.program_name}}</td>
          <td >{{row.communication_channel}}</td>
          <td >{{row.schedule_duration}}</td>
          <td >{{row.profile}}</td>
          <td >{{ row.commentary}}</td>
          <td class="text-left">
            <b-dropdown size="sm" text="•••" variant="primary">
              <b-dropdown-item class="" @click="enviarCafilidados(row.id)">Enviar a <b>CALIFICADOS</b></b-dropdown-item>
              <b-dropdown-item class="" @click="enviarAceptados(row.id)">Enviar a <b>PERFILES ACEPTADOS</b></b-dropdown-item>
              <!-- <b-dropdown-item class="" @click="enviarEdad(row.id)">Enviar a <b>EDAD</b></b-dropdown-item> -->
              <b-dropdown-item class="" @click="enviarIngles(row.id)">Enviar a <b>INGLÉS</b></b-dropdown-item>

              <b-dropdown-divider></b-dropdown-divider>

              <b-dropdown-item class="" @click="editar(row.id)"><span class="text-primary">Editar</span></b-dropdown-item>
              <b-dropdown-item class="text-danger" @click="eliminar(row.id)"><span class="text-danger">Eliminar</span></b-dropdown-item>
            </b-dropdown>
          </td>
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
  import * as lead from '@/api/lead'

  export default {
    name: 'LeadsEdadTable',
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
        lead.getLeadsEdad(pPage)
          .then( res => {
            if (res.status == 200) {
              this.status = 200
              this.data = res.data.data
              this.meta = res.data.meta

              this.tableData = res.data.data.map( m => m.attributes )
              this.$notify({
                    type: 'success',
                    title: 'Datos recuperados!!'
              })
            }
          }).catch( err => {
            if(err.response){
              console.log(err.response.data)
              console.log(err.message)
              console.log(err.config)
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

      eliminarDeArray(pLeadId) {
        this.tableData.map((m, index) => {
          if( m.id == pLeadId) {
            this.tableData.splice(index,1)
          }
        })
      },

      enviarCafilidados (pLeadId) {
        let leadFormdata = new FormData()
        leadFormdata.append('.method','put')

        lead.updateQualifiedTable(pLeadId,leadFormdata)
          .then( res => {
            if (res.status == 200) {
              this.$notify({
                type: 'success',
                title: 'Enviado a Calificados'
              })

              this.eliminarDeArray(pLeadId)

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
      enviarAceptados (pLeadId) {
        let leadFormdata = new FormData()
        leadFormdata.append('.method','put')

        lead.updateAceptedTable(pLeadId, leadFormdata)
          .then( res => {
            if (res.status == 200) {
              this.$notify({
                type: 'success',
                title: 'Enviado a Calificados'
              })

              this.eliminarDeArray(pLeadId)

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
      enviarEdad (pLeadId) {
        let leadFormdata = new FormData()

        leadFormdata.append('.method','put')
        lead.updateAgeTable(pLeadId, leadFormdata)
          .then( res => {
            if (res.status == 200) {
              this.$notify({
                type: 'success',
                title: 'Enviado a Calificados'
              })

              this.eliminarDeArray(pLeadId)

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
      enviarIngles (pLeadId) {
        let leadFormdata = new FormData()
        leadFormdata.append('.method','put')

        lead.updateEnglishTable(pLeadId, leadFormdata)
          .then( res => {
            if (res.status == 200) {
              this.$notify({
                type: 'success',
                title: 'Enviado a Calificados'
              })

              this.eliminarDeArray(pLeadId)

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
      
      eliminar (pLeadId) {
        lead.destroyLead(pLeadId)
        .then( res => {
            if (res.status == 204) {
              this.$notify({
                type: 'success',
                title: 'Registro eliminado!'
              })

              this.eliminarDeArray(pLeadId)

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

      editar (pLeadId) {
        this.$router.push({
          name: 'editar-lead',
          params: {
            leadId: pLeadId
          }
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
