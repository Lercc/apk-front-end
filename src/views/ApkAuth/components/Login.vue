<template>
      <b-container class="col-12 col-md-8 col-lg-6 col-xl-5">
          <b-row>
              <b-col>
                <b-card header="LOGIN" header-text-variant="center">
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
                                    :key="`user-email-login-${index}`">{{ error }}
                                </span>
                            </b-form-group>
                        </b-col>
                    </b-form-row>

                    <b-form-row>
                        <b-col cols="12">
                            <b-form-group label="Contraseña">
                                <div class="" v-show="leadLoading">
                                    <pulse-loader :loading="leadLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                                 </div>

                                <b-form-input type="password" v-model="form.password" :state="passwordState" placeholder="Ingrese su contraseña"></b-form-input>
                            
                                <span 
                                    class="text-danger"
                                    v-for="(error, index) in mostrarErroresInput('password')"
                                    :key="`user-password-login-${index}`">{{ error }}
                                </span>
                            </b-form-group>
                        </b-col>
                    </b-form-row>

                    <b-form-row >
                        <b-col cols="8" class="mx-auto">
                            <b-button variant="primary" size="lg" class="col-12" @click="enviar">
                                    LOGIN
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
  import { login } from '@/api/usuario';

  export default {
    name: 'login',
    data() {
      return {
        form: {
        //   email: 'apk@admin.com',
        //   password: 'APK2021ADMIN'
            email: '',
            password: '',
        },
        //
        emailState: null,
        passwordState: null,
        //
        leadLoading: false,
        //
        inputErrors: [],
      }
    },
    methods: {
        ...mapMutations('user',['setUserStoreData']),
        ...mapMutations('token',['setTokenStoreData']),

        mostrarErroresInput(pCampo) {
            const camposIncorrectos = Object.keys(this.inputErrors);

            if (camposIncorrectos.includes(pCampo)) {
                switch (pCampo) {
                    case 'email': 
                        this.emailState = false;
                        break;
                    case 'password':
                        this.passwordState = false;
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
            this.passwordState =  true
        },

        clear(){
            this.inputErrors = []
            this.emailState =  null
            this.passwordState =  null
        },

        enviar() {
            this.leadLoading = true

            this.setTrue()

            let userForm = new FormData()
            userForm.append('email', this.form.email)
            userForm.append('password', this.form.password)

            login (userForm)
                .then( res => {
                    if(res.status == 200) {

                        //guardar en storage con vuex
                        let respuesta = {
                            'id' : res.data.attributes.id,
                            'name' : res.data.attributes.name,
                            'email' : res.data.attributes.email,
                            'rol' : res.data.attributes.role,
                        }
                        this.setUserStoreData(respuesta)
                        this.setTokenStoreData(res.data.attributes.token)

                        //notificar
                        this.$notify({
                            type: 'success',
                            title: 'Usuario logeado!!'
                        })

                        //redireccionar
                        if(res.data.attributes.role == 'employee') this.$router.push({ name : 'gestion-de-aplicantes' })
                        else if(res.data.attributes.role == 'admin') this.$router.push({ name : 'inicio' })
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
