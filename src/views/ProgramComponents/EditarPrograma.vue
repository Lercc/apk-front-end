<template>
  <b-container class="col-12 col-xl-8">
      <b-row>
          <b-col>
              <b-card header="EDITAR PROGRAMA" class="shadow-lg apk-shadow" header-text-variant="center">
                  <b-form-row>
                    <b-col cols="12">
                        <b-form-group label="* Programa">
                            <div class="" v-show="leadLoading">
                                <pulse-loader :loading="leadLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                            </div>

                            <b-form-input v-model="form.name" :state="nameState" v-show="!leadLoading" placeholder="Ingrese el nombre del programa"></b-form-input>

                             <span 
                                class="text-danger"
                                v-for="(error, index) in mostrarErroresInput('name')"
                                :key="`program-name-edit-${index}`">{{ error }}
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
                                :key="`program-state-edit-${index}`">{{ error }}
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

                            <b-form-textarea v-model="form.description" :state="descriptionState" v-show="!leadLoading"  placeholder="Ingrese una descripción"></b-form-textarea>

                            <span 
                                class="text-danger"
                                v-for="(error, index) in mostrarErroresInput('description')"
                                :key="`program-description-edit-${index}`">{{ error }}
                            </span>
                        </b-form-group>
                    </b-col>
                  </b-form-row>

                  <b-form-row>
                      <b-col>
                          <b-button variant="primary" @click="enviar">ACTUALIZAR PROGRAMA</b-button>
                      </b-col>
                  </b-form-row>
              </b-card>
          </b-col>
      </b-row>
  </b-container>
</template>

<script>
import { getProgram, updateProgram } from '@/api/apkPrograms' 

export default {
    name : 'EditarInstitucion',
    data () {
        return {
            form : {
                name: '',
                state: '',
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

    beforeMount () {
        this.getData()
    },

    methods : {
        getData () {
            this.leadLoading = true
            getProgram(this.$route.params.programId)
                .then( res => {
                    if (res.status == 200) {
                        [this.form] = [res.data.data.attributes]
                        this.$notify({
                            type: 'success',
                            title: 'Datos recuperados!!'
                        })
                    }
                }).catch( err => {
                    if( err.response){
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
                    this.leadLoading = false
                })
        },

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
            CarrerForm.append('.method', 'put')
            CarrerForm.append('name', this.form.name)
            CarrerForm.append('state', this.form.state)
            CarrerForm.append('description', this.form.description)

            updateProgram (this.$route.params.programId, CarrerForm)
                .then( res => {
                    if(res.status == 200) {
                       this.$notify({
                            type: 'success',
                            title: 'Actualización correcta!!'
                        })
                        // this.$router.push({
                        //     name : 'lista-aplicantes'
                        // })
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