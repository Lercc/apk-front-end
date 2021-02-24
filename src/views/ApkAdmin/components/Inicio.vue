<template>
    <div>
        <base-header type="gradient-primary" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row d-flex justify-content-center">
                <div class="col-xl-4  col-lg-10">
                    <stats-card 
                                sub-title="APLICANTES"
                                type="gradient-red"
                                icon="ni ni-chart-pie-35"
                                class="mb-4 mb-xl-0"
                    >
                        <template slot="footer">
                            <b-form-row>
                              <b-col>
                                <b-form-group label="Descargar desde la fecha:">
                                  <!-- <b-form-input type="date"  v-model="fechaAplicantes" required></b-form-input>Ç -->
                                  <b-form-select v-model="fechaAplicantes">
                                    <b-form-select-option
                                      v-for="(season, index) in seasons"
                                      :key="`${index}-${season}`"
                                      :value="season"
                                    >{{season}}

                                    </b-form-select-option>
                                  </b-form-select>
                                </b-form-group>
                              </b-col>
                            </b-form-row>
                            <b-form-row>
                              <b-col>
                                  <b-button class="col-12" @click="descargarAplicantes">DESCARGAR</b-button>
                              </b-col>
                            </b-form-row>
                        </template>
                    </stats-card>
                </div>

                <div class="col-xl-4 col-lg-10">
                    <stats-card 
                                sub-title="LEADS - TABLA CALIFICADOS"
                                type="gradient-red"
                                icon="ni ni-chart-pie-35"
                                class="mb-4 mb-xl-0"
                    >
                        <template slot="footer">
                            <b-form-row>
                              <b-col>
                                <b-form-group label="Descargar desde la fecha:">
                                  <b-form-input type="date"  v-model="fechaCalificados" required></b-form-input>
                                </b-form-group>
                              </b-col>
                            </b-form-row>
                            <b-form-row>
                              <b-col>
                                  <b-button class="col-12" @click="descargarLeadsCalificados">DESCARGAR</b-button>
                              </b-col>
                            </b-form-row>
                        </template>
                    </stats-card>
                </div>
                
                <div class="col-xl-4 col-lg-10">
                    <stats-card 
                                sub-title="LEADS - TABLA EDAD"
                                type="gradient-red"
                                icon="ni ni-chart-pie-35"
                                class="mb-4 mb-xl-0"
                    >
                        <template slot="footer">
                            <b-form-row>
                              <b-col>
                                <b-form-group label="Descargar desde la fecha:">
                                  <b-form-input type="date"  v-model="fechaEdad" required></b-form-input>
                                </b-form-group>
                              </b-col>
                            </b-form-row>
                            <b-form-row>
                              <b-col>
                                  <b-button class="col-12" @click="descargarLeadsEdad">DESCARGAR</b-button>
                              </b-col>
                            </b-form-row>
                        </template>
                    </stats-card>
                </div>

                <div class="col-xl-4 col-lg-10 mt-lg-3">
                    <stats-card 
                                sub-title="LEADS - TABLA INGLÉS"
                                type="gradient-red"
                                icon="ni ni-chart-pie-35"
                                class="mb-4 mb-xl-0"
                    >
                        <template slot="footer">
                            <b-form-row>
                              <b-col>
                                <b-form-group label="Descargar desde la fecha:">
                                  <b-form-input type="date"  v-model="fechaIngles" required></b-form-input>
                                </b-form-group>
                              </b-col>
                            </b-form-row>
                            <b-form-row>
                              <b-col>
                                  <b-button class="col-12" @click="descargarLeadsIngles">DESCARGAR</b-button>
                              </b-col>
                            </b-form-row>
                        </template>
                    </stats-card>
                </div>

                <div class="col-xl-6 col-lg-10 mt-lg-3">
                    <stats-card 
                                sub-title="LEADS - TABLA PERFILES ACEPTADOS"
                                type="gradient-red"
                                icon="ni ni-chart-pie-35"
                                class="mb-4 mb-xl-0"
                    >
                        <template slot="footer">
                            <b-form-row>
                                <b-form-group class="col-6" label="Descargar desde la fecha:">
                                  <b-form-input type="date"  v-model="fechaAceptados" required></b-form-input>
                                </b-form-group>
                                <b-form-group class="col-6" label="Datos">
                                  <b-form-select v-model="pipeline">
                                  <b-form-select-option value="todos">todos</b-form-select-option>
                                  <b-form-select-option value="si">enviados</b-form-select-option>
                                  <b-form-select-option value="no">no enviados</b-form-select-option>
                                </b-form-select>
                                </b-form-group>
                            </b-form-row>
                            <b-form-row>
                              <b-col>
                                  <b-button class="col-12" @click="descargarLeadsAceptados">DESCARGAR</b-button>
                              </b-col>
                            </b-form-row>
                        </template>
                    </stats-card>
                </div>
            </div>
        </base-header>
    </div>
</template>
<script>
import axios from 'axios';
import { mapState } from 'vuex';
import FileSaver from 'file-saver';


export default {
    data() {
      return {
        fechaAplicantes:'',
        fechaCalificados:'',
        fechaEdad:'',
        fechaIngles:'',
        fechaAceptados:'',
        pipeline:'todos',
        //
        seasons: []
      };
    },

    computed: {
      ...mapState('api', ['url']),
      ...mapState('token', ['token'])
    },

    beforeMount() {
      this.getYears()
    },

    methods: {
      getYears () {
        let date =  new Date();
        let currentYear = date.getFullYear();

        this.fechaAplicantes = currentYear;

        for(let i = currentYear-3; i <= currentYear+3; i++ ) {
          this.seasons.push(i)
        }

      },

      descargarAplicantes() {
        axios({
          method: 'get',
          url: `${this.url}/api/download/aplicantes/${this.fechaAplicantes}`,
          responseType: 'blob',
          headers: {
            'Cache-Control': 'no-store, no-cache',
            'Authorization' : `Bearer ${this.token}`
          }
        }). then( res => {
          FileSaver.saveAs(res.data, `aplicantes-${this.fechaAplicantes}.xlsx`);
          // const url = window.URL.createObjectURL(new  Blob([res.data]));
          // const link = document.createElement("a");
          // link.href = url;
          // link.setAttribute("download", `aplicantes-${this.fechaAplicantes}.xlsx`);
          // document.body.appendChild(link);
          // link.click();
          // link.remove();
          // window.URL.revokeObjectURL(url)
        })
      },

      descargarLeadsCalificados() {
        axios({
          method: 'get',
          url: `${this.url}/api/download/leads/${this.fechaCalificados}/calificados`,
          responseType: 'blob',
          headers: {
            'Cache-Control': 'no-store, no-cache',
            'Authorization' : `Bearer ${this.token}`
          }
        }). then( res => {
          FileSaver.saveAs(res.data, `leads-calificados-${this.fechaCalificados}.xlsx`);
        })
      },
     
     descargarLeadsEdad() {
        axios({
          method: 'get',
          url: `${this.url}/api/download/leads/${this.fechaEdad}/edad`,
          responseType: 'blob',
          headers: {
            'Cache-Control': 'no-store, no-cache',
            'Authorization' : `Bearer ${this.token}`
          }
        }). then( res => {
          FileSaver.saveAs(res.data, `leads-edad-${this.fechaEdad}.xlsx`);
        })
      },

     descargarLeadsIngles() {
        axios({
          method: 'get',
          url: `${this.url}/api/download/leads/${this.fechaIngles}/ingles`,
          responseType: 'blob',
          headers: {
            'Cache-Control': 'no-store, no-cache',
            'Authorization' : `Bearer ${this.token}`
          }
        }). then( res => {
          FileSaver.saveAs(res.data, `leads-ingles-${this.fechaIngles}.xlsx`);
        })
      },

      descargarLeadsAceptados() {
        axios({
          method: 'get',
          url: `${this.url}/api/download/leads/${this.fechaAceptados}/aceptados/${this.pipeline}`,
          responseType: 'blob',
          headers: {
            'Cache-Control': 'no-store, no-cache',
            'Authorization' : `Bearer ${this.token}`
          }
        }). then( res => {
          FileSaver.saveAs(res.data, `leads-aceptados-${this.pipeline}-${this.fechaAceptados}.xlsx`);
        })
      },
    }
  }
</script>
<style></style>
