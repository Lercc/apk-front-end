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
                                  <b-form-input type="date"  v-model="fechaAplicante" required></b-form-input>
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
                                  <b-form-input type="date"  v-model="fechaAplicante" required></b-form-input>
                                </b-form-group>
                              </b-col>
                            </b-form-row>
                            <b-form-row>
                              <b-col>
                                  <b-button class="col-12" @click="descargarLeads('calificados')">DESCARGAR</b-button>
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
                                  <b-form-input type="date"  v-model="fechaAplicante" required></b-form-input>
                                </b-form-group>
                              </b-col>
                            </b-form-row>
                            <b-form-row>
                              <b-col>
                                  <b-button class="col-12" @click="descargarLeads('edad')">DESCARGAR</b-button>
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
                                  <b-form-input type="date"  v-model="fechaAplicante" required></b-form-input>
                                </b-form-group>
                              </b-col>
                            </b-form-row>
                            <b-form-row>
                              <b-col>
                                  <b-button class="col-12" @click="descargarLeads('ingles')">DESCARGAR</b-button>
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
                                  <b-form-input type="date"  v-model="fechaAplicante" required></b-form-input>
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

export default {
    data() {
      return {
        fechaAplicante:'',
        pipeline:'todos'
      };
    },

  computed: {
    ...mapState('api', ['url']),
  },

    methods: {
      descargarAplicantes() {
        axios({
          method: 'get',
          url: `${this.url}/api/download/aplicantes/${this.fechaAplicante}`,
          responseType: 'blob',
        }). then( res => {
          const url = window.URL.createObjectURL(new  Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `aplicantes-${this.fechaAplicante}.xlsx`);
          document.body.appendChild(link);
          link.click();
        })
      },

      descargarLeads(pTabla) {
        axios({
          method: 'get',
          url: `${this.url}/api/download/leads/${this.fechaAplicante}/${pTabla}`,
          responseType: 'blob',
        }). then( res => {
          const url = window.URL.createObjectURL(new  Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `lead-${pTabla}-${this.fechaAplicante}.xlsx`);
          document.body.appendChild(link);
          link.click();
        })
      },

      descargarLeadsAceptados() {
        axios({
          method: 'get',
          url: `${this.url}/api/download/leads/${this.fechaAplicante}/aceptados/${this.pipeline}`,
          responseType: 'blob',
        }). then( res => {
          const url = window.URL.createObjectURL(new  Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `lead-aceptados-${this.pipeline}-${this.fechaAplicante}.xlsx`);
          document.body.appendChild(link);
          link.click();
        })
      },
    }
  }
</script>
<style></style>
