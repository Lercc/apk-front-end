<template>
    <b-container class="col-12 col-md-12 col-xl-8">
        <b-row>
            <b-col >
                <b-card header="REGISTRO WEBINAR" class="shadow-lg apk-shadow" header-text-variant="center">
             
                    <b-form-row >
                        <b-col cols="12"   >
                            <b-form-group label="* Nombres y Apellidos" >
                                <div class="" v-show="loadLoading">
                                    <pulse-loader :loading="loadLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                                </div>

                                <b-form-input v-model="form.full_name" type="text" :state="full_nameState" placeholder="Ingrese sus nombres y apellidos" v-show="!loadLoading"></b-form-input>

                                <span 
                                    class="text-danger"
                                    v-for="(error, index) in mostrarErroresInput('full_name')"
                                    :key="`full_name-assist-create-${index}`">{{ error }}
                                </span>
                            </b-form-group>
                        </b-col>
                    </b-form-row>

                    <b-form-row>
                        <b-col cols="12">
                            <b-form-group label="Correo" >
                                <div class="" v-show="loadLoading">
                                    <pulse-loader :loading="loadLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                                </div>

                                <b-form-input v-model="form.email" type="email" :state="emailState" placeholder="Ingrese su correo de contacto" v-show="!loadLoading"></b-form-input>
                            
                                <span 
                                    class="text-danger"
                                    v-for="(error, index) in mostrarErroresInput('email')"
                                    :key="`email-assist-create-${index}`">{{ error }}
                                </span>
                            </b-form-group>
                        </b-col>
                    </b-form-row>

                    <b-form-row>
                        <b-col cols="12">
                            <b-form-group label="* Celular" >
                                <div class="" v-show="loadLoading">
                                    <pulse-loader :loading="loadLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                                </div>

                                <b-form-input v-model="form.mobile" type="number" :state="mobileState" placeholder="Ingrese su número de celular" v-show="!loadLoading"></b-form-input>
                            
                                <span 
                                    class="text-danger"
                                    v-for="(error, index) in mostrarErroresInput('mobile')"
                                    :key="`mobile-assist-create-${index}`">{{ error }}
                                </span>
                            </b-form-group>
                        </b-col>
                    </b-form-row>

                    <b-form-row class="text-center">
                        <b-col cols="12" >
                            <b-button variant="primary" size="lg" class="col-12 col-sm-6  col-md-12  col-lg-4" @click="enviar">
                                REGISTRAR
                            </b-button>
                        </b-col>
                    </b-form-row>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { storeAssistant } from '@/api/assistant';
import swal from 'sweetalert';


export default {
    name : 'RegistroWebinar',
    data () {
        return {
            form : {
                full_name : '',
                email : '',
                mobile : '',
            },
            //
            full_nameState : null,
            emailState : null,
            mobileState : null,
            //
            loadLoading : false,
            //
            erroresInputs: []
      }
    },

    methods: {
        setTrue() {
           this.clear()

            this.full_nameState =  true
            this.emailState =  true
            this.mobileState =  true
        },

        clear(){
            this.erroresInputs = []
            this.full_nameState =  null
            this.emailState =  null
            this.mobileState =  null
        },

        mostrarErroresInput(pCampo) { 
            let camposIncorrectos = Object.keys(this.erroresInputs);

            if (camposIncorrectos.includes(pCampo)) {
                switch (pCampo) {
                    case 'full_name':
                        this.full_nameState = false
                        break;
                    case 'email':
                        this.emailState = false
                        break;
                    case 'mobile':
                        this.mobileState = false
                        break;
                    default:
                        break;
                }
                return this.erroresInputs[pCampo]
            } else {
                return []
            }
        },

        enviar() {
            this.loadLoading = true

            this.setTrue()

            let assistantForm = new FormData()
            assistantForm.append('full_name', this.form.full_name)
            assistantForm.append('email',this.form.email)
            assistantForm.append('mobile', this.form.mobile)

            storeAssistant(assistantForm)
                .then( res => {
                    if(res.status == 201) {
                       this.$notify({
                            type: 'success',
                            title: 'Creación correcta!!'
                        })
                        swal('Registro creado!!',{icon:'success'})

                        this.clear()
                        this.form = {}
                    }
                }).catch( err => {
                    if (err.response) {
                        this.erroresInputs = err.response.data.errors
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
                    this.loadLoading = false
                })
        },
    }
}
</script>
