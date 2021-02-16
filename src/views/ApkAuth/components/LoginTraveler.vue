<template>
      <b-container class="col-12 col-md-8 col-lg-6 col-xl-5">
          <b-row>
              <b-col>
                <b-card header="LOGIN TRAVELER" header-text-variant="center">
                    <b-form-row>
                        <b-col cols="12">
                            <b-form-group label="Correo">
                                <div class="" v-show="leadLoading">
                                    <pulse-loader :loading="leadLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                                 </div>

                                <b-form-input type="email" v-model="form.email" :state="emailState" placeholder="Ingrese su correo"></b-form-input>
                            
                                <span 
                                    class="text-danger"
                                    v-for="(error, index) in mostrarErroresInput('email')"
                                    :key="`client-email-login-${index}`">{{ error }}
                                </span>
                            </b-form-group>
                        </b-col>
                    </b-form-row>

                    <b-form-row>
                        <b-col cols="12">
                            <b-form-group label="DNI">
                                <div class="" v-show="leadLoading">
                                    <pulse-loader :loading="leadLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                                 </div>

                                <b-form-input type="number" v-model="form.dni" :state="dniState" placeholder="Ingrese su número de dni"></b-form-input>
                            
                                <span 
                                    class="text-danger"
                                    v-for="(error, index) in mostrarErroresInput('dni')"
                                    :key="`client-dni-login-${index}`">{{ error }}
                                </span>
                            </b-form-group>
                        </b-col>
                    </b-form-row>

                    <b-form-row >
                        <b-col cols="8" class="mx-auto">
                            <b-button variant="primary" size="lg" class="col-12" @click="enviar">
                                    ENTRAR
                            </b-button>
                        </b-col>
                    </b-form-row>
                </b-card> 
              </b-col>
          </b-row>
      </b-container>
</template>
<script>
  import { mapMutations } from 'vuex';
  import { clientLogin } from '@/api/usuario';

  export default {
    name: 'login',
    data() {
      return {
        form: {
            email: '',
            dni: '',
        },
        //
        emailState: null,
        dniState: null,
        //
        leadLoading: false,
        //
        inputErrors: [],
      }
    },
    methods: {
        ...mapMutations('clientAplication',['setTokenCliAppStoreData']),

        mostrarErroresInput(pCampo) {
            const camposIncorrectos = Object.keys(this.inputErrors);

            if (camposIncorrectos.includes(pCampo)) {
                switch (pCampo) {
                    case 'email': 
                        this.emailState = false;
                        break;
                    case 'dni':
                        this.dniState = false;
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
            this.emailState =  true
            this.dniState =  true
        },

        clear(){
            this.inputErrors = []
            this.emailState =  null
            this.dniState =  null
        },

        enviar() {
            this.leadLoading = true

            this.setTrue()

            let userForm = new FormData()
            userForm.append('email', this.form.email)
            userForm.append('dni', this.form.dni)

            clientLogin (userForm)
                .then( res => {
                    if(res.status == 200) {

                        //guardar en storage con vuex
                        let respuesta = {
                            'id' : res.data.attributes.id,
                            'role' : res.data.attributes.role,
                            'cliAppToken' : res.data.attributes.token,
                        }
                        this.setTokenCliAppStoreData(respuesta)

                        //notificar
                        this.$notify({
                            type: 'success',
                            title: 'Login correcto!'
                        })

                        //redireccionar
                        this.$router.push({ name : 'registro-voucher', params: { clientId:res.data.attributes.id} })
                    }
                }).catch( err => {
                    if (err.response) {
                        if ( err.response.status == 401) {
                            this.$notify({
                                type: 'warning',
                                title:  err.response.data.message
                            })
                        } else {
                            this.inputErrors = err.response.data.errors
                            this.$notify({
                                type: 'danger',
                                title:  'Existen campos inválidos'
                            })
                        }
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
    }
  }
</script>
<style>
</style>
