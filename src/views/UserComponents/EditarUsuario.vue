<template>
  <b-container class="col-12 col-xl-8">
      <b-row>
          <b-col>
              <b-card header="EDITAR USUARIO" class="shadow-lg apk-shadow" header-text-variant="center">
                  <b-form-row>
                    <b-col cols="12">
                        <b-form-group label="* Nombre">
                            <div class="" v-show="leadLoading">
                                <pulse-loader :loading="leadLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                            </div>

                            <b-form-input v-model="form.name" :state="nameState" v-show="!leadLoading" placeholder="Ingrese el nombre del usuario"></b-form-input>

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
                                :key="`program-role-edit-${index}`">{{ error }}
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
                                :key="`program-email-edit-${index}`">{{ error }}
                            </span>
                        </b-form-group>
                    </b-col>
                  </b-form-row>

                  <b-form-row>
                      <b-col>
                          <b-button variant="primary" @click="enviar">EDITAR USUARIO</b-button>
                      </b-col>
                  </b-form-row>
              </b-card>
          </b-col>
      </b-row>
  </b-container>
</template>

<script>
import { getUser, updateUser } from '@/api/usuario' 

export default {
    name : 'EditarUsuario',
    data () {
        return {
            form : {
                name: '',
                email: '',
                role:'',
            },
            //
            leadLoading: false,
            //
            nameState: null,
            emailState: null,
            roleState: null,
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
            getUser(this.$route.params.usuarioId)
                .then( res => {
                    if (res.status == 200) {
                        [this.form] = [res.data.data.attributes]
                        this.form.role = res.data.data.attributes.role[0].name
                        this.$notify({
                            type: 'success',
                            title: 'Usuario recuperado!!'
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
                    case 'email': 
                        this.emailState = false;
                        break;
                    case 'role': 
                        this.roleState = false;
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
        },

        clear(){
            this.inputErrors = []
            this.nameState = null
            this.emailState =  null
            this.roleState =  null
        },

        enviar() {
            this.leadLoading = true

            this.setTrue()

            let userForm = new FormData()
            userForm.append('.method', 'put')
            userForm.append('name', this.form.name)
            userForm.append('email', this.form.email)
            userForm.append('role', this.form.role)

            updateUser (this.$route.params.usuarioId, userForm)
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