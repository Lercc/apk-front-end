<template>
  <b-container class="col-12 col-xl-8">
      <b-row>
          <b-col>
              <b-card header="CREAR CARRERA" class="shadow-lg apk-shadow" header-text-variant="center">
                  <b-form-row>
                    <b-col cols="12">
                        <b-form-group label="* Carrera">
                            <div class="" v-show="leadLoading">
                                <pulse-loader :loading="leadLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                            </div>

                            <b-form-input v-model="form.name" :state="nameState" v-show="!leadLoading" placeholder="Ingrese el nombre de la carrera"></b-form-input>

                             <span 
                                class="text-danger"
                                v-for="(error, index) in mostrarErroresInput('name')"
                                :key="`career-name-create-${index}`">{{ error }}
                            </span>
                        </b-form-group>
                    </b-col>
                  </b-form-row>

                  <b-form-row>
                    <b-col>
                        <b-form-group label="* Estado">
                            <div class="" v-show="leadLoading">
                                <pulse-loader :loading="leadLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                            </div>

                            <b-form-select v-model="form.state" :state="stateState" v-show="!leadLoading" >
                                <b-form-select-option value="activado">activado</b-form-select-option>
                                <b-form-select-option value="desactivado">desactivado</b-form-select-option>
                            </b-form-select>

                             <span 
                                class="text-danger"
                                v-for="(error, index) in mostrarErroresInput('state')"
                                :key="`career-state-create-${index}`">{{ error }}
                            </span>
                        </b-form-group>
                    </b-col>
                  </b-form-row>

                  <b-form-row>
                    <b-col>
                        <b-form-group label="Descripción">
                            <div class="" v-show="leadLoading">
                                <pulse-loader :loading="leadLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                            </div>

                            <b-form-textarea v-model="form.description" :state="descriptionState" v-show="!leadLoading"  placeholder="Ingrese una descripción" ></b-form-textarea>

                            <span 
                                class="text-danger"
                                v-for="(error, index) in mostrarErroresInput('description')"
                                :key="`career-description-create-${index}`">{{ error }}
                            </span>
                        </b-form-group>
                    </b-col>
                  </b-form-row>

                  <b-form-row>
                      <b-col>
                          <b-button variant="primary" @click="enviar">CREAR CARRERA</b-button>
                      </b-col>
                  </b-form-row>
              </b-card>
          </b-col>
      </b-row>
  </b-container>
</template>

<script>
import { storeCareer } from '@/api/career' 

export default {
    name : 'EditarCarrera',
    data () {
        return {
            form : {
                name: '',
                state: 'activado',
                description: ''
            },
            //
            leadLoading: false,
            //
            nameState: null,
            stateState: null,
            descriptionState: null,
            //
            inputErrors: []
        }
    },

    methods : {

        mostrarErroresInput(pCampo) {
            const camposIncorrectos = Object.keys(this.inputErrors);

            if (camposIncorrectos.includes(pCampo)) {
                switch (pCampo) {
                    case 'name' :
                        this.nameState = false;
                        break;
                    case 'state': 
                        this.stateState = false;
                        break;
                    case 'description':
                        this.descriptionState = false;
                        break;
                    default:
                        break
                }
                return this.inputErrors[pCampo]
            } else {
                return []
            }
        },

        setTrue() {
           this.clear()
            this.nameState =  true
            this.stateState =  true
            this.descriptionState =  true
        },

        clear(){
            this.inputErrors = []
            this.nameState = null
            this.stateState =  null
            this.descriptionState =  null
        },

        enviar() {
            this.leadLoading = true

            this.setTrue()

            let CarrerForm = new FormData()
            CarrerForm.append('name', this.form.name)
            CarrerForm.append('state', this.form.state)
            CarrerForm.append('description', this.form.description)

            storeCareer ( CarrerForm)
                .then( res => {
                    if(res.status == 201) {
                       this.$notify({
                            type: 'success',
                            title: 'Creación correcta!!'
                        })
                        this.$router.push({
                            name : 'lista-carreras'
                        })
                    }
                }).catch( err => {
                    if (err.response) {
                        this.inputErrors = err.response.data.errors
                        this.$notify({
                            type: 'danger',
                            title:  'Existen campos inválidos'
                        })
                    } else {
                        this.notify({
                            type: 'danger',
                            title: err.message
                        })
                    }
                }).finally( () => {
                    this.leadLoading = false
                })
        },
    }

}
</script>

<style>

</style>