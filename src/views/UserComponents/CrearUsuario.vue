<template>
  <b-container class="col-12 col-xl-8">
      <b-row>
          <b-col>
              <b-card header="CREAR USUARIO" class="shadow-lg apk-shadow" header-text-variant="center">
                  <b-form-row>
                    <b-col cols="12">
                        <b-form-group label="* Usuario">
                            <div class="" v-show="leadLoading">
                                <pulse-loader :loading="leadLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                            </div>

                            <b-form-input v-model="form.name" :state="nameState" v-show="!leadLoading" placeholder="Ingrese el nombre del usuario"></b-form-input>

                             <span 
                                class="text-danger"
                                v-for="(error, index) in mostrarErroresInput('name')"
                                :key="`program-name-create-${index}`">{{ error }}
                            </span>
                        </b-form-group>
                    </b-col>
                  </b-form-row>
                
                  <b-form-row>
                    <b-col>
                        <b-form-group label="* rol">
                            <div class="" v-show="leadLoading">
                                <pulse-loader :loading="leadLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                            </div>

                            <b-form-select v-model="form.role" :state="roleState" v-show="!leadLoading" >
                                <b-form-select-option value="admin">administrador</b-form-select-option>
                                <b-form-select-option value="employee">empleado</b-form-select-option>
                            </b-form-select>

                             <span 
                                class="text-danger"
                                v-for="(error, index) in mostrarErroresInput('role')"
                                :key="`program-role-create-${index}`">{{ error }}
                            </span>
                        </b-form-group>
                    </b-col>
                  </b-form-row>
             
                  <b-form-row>
                    <b-col cols="12">
                        <b-form-group label="* Correo">
                            <div class="" v-show="leadLoading">
                                <pulse-loader :loading="leadLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                            </div>

                            <b-form-input v-model="form.email" :state="emailState" v-show="!leadLoading" type="email" placeholder="Ingrese el correo del usuario"></b-form-input>

                             <span 
                                class="text-danger"
                                v-for="(error, index) in mostrarErroresInput('email')"
                                :key="`program-email-create-${index}`">{{ error }}
                            </span>
                        </b-form-group>
                    </b-col>
                  </b-form-row>

                  <b-form-row>
                    <b-col>
                        <b-form-group label="* Contraseña">
                              <div class="" v-show="leadLoading">
                                <pulse-loader :loading="leadLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                            </div>

                            <b-form-input v-model="form.password" :state="passwordState" v-show="!leadLoading" type="password" placeholder="Ingrese la contraseña"></b-form-input>

                             <span 
                                class="text-danger"
                                v-for="(error, index) in mostrarErroresInput('password')"
                                :key="`program-password-create-${index}`">{{ error }}
                            </span>
                        </b-form-group>
                    </b-col>
                  </b-form-row>
                
                  <b-form-row>
                    <b-col>
                      <b-form-group label="* Confirme la contraseña">
                                <div class="" v-show="leadLoading">
                                  <pulse-loader :loading="leadLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                              </div>

                              <b-form-input v-model="form.repassword" :state="repasswordState" v-show="!leadLoading" type="password" placeholder="Confirme la contraseña"></b-form-input>

                              <span 
                                  class="text-danger"
                                  v-for="(error, index) in mostrarErroresInput('repassword')"
                                  :key="`program-repassword-create-${index}`">{{ error }}
                              </span>
                          </b-form-group>
                    </b-col>
                  </b-form-row>

                  <b-form-row>
                      <b-col>
                          <b-button variant="primary" @click="enviar">CREAR USUARIO</b-button>
                      </b-col>
                  </b-form-row>
              </b-card>
          </b-col>
      </b-row>
  </b-container>
</template>

<script>
import { storeUser } from '@/api/usuario' 

export default {
    name : 'CrearUsuario',
    data () {
        return {
            form : {
                name: '',
                email: '',
                role: 'employee',
                password: '',
                repassword: '',
            },
            //
            leadLoading: false,
            //
            nameState: null,
            emailState: null,
            roleState: null,
            passwordState: null,
            repasswordState: null,
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
                    case 'email': 
                        this.emailState = false;
                        break;
                    case 'role': 
                        this.roleState = false;
                        break;
                    case 'password':
                        this.passwordState = false;
                        break;
                    case 'repassword':
                        this.repasswordState = false;
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
            this.emailState =  true
            this.roleState =  true
            this.passwordState =  true
            this.repasswordState =  true
        },

        clear(){
            this.inputErrors = []
            this.nameState =  null
            this.emailState =  null
            this.roleState =  null
            this.passwordState =  null
            this.repasswordState =  null
        },

        enviar() {
            this.leadLoading = true

            this.setTrue()

            let userForm = new FormData()
            userForm.append('name', this.form.name)
            userForm.append('email', this.form.email)
            userForm.append('role', this.form.role)
            userForm.append('password', this.form.password)
            userForm.append('repassword', this.form.repassword)

            storeUser (userForm)
                .then( res => {
                    if(res.status == 201) {
                       this.$notify({
                            type: 'success',
                            title: 'Usuario creado!!'
                        })
                        this.$router.push({
                            name : 'lista-usuarios'
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