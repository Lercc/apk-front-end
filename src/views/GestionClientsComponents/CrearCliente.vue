<template>
               
   <b-container class="col-12 col-md-10 col-lg-8" >

       <b-card class="mb-5 apk-shadow col-12 col-xl-8">
        <b-form-row>
            <b-col>
                <b-form-group label="Buscar lead registrado">
                    <b-form-input type="number" v-model="dniLead"></b-form-input>
                </b-form-group>
            </b-col>
            <b-col >
                <b-form-group label=".">
                   <b-button class="col-12" variant="primary" @click="buscarLead">BUSCAR</b-button>
                </b-form-group>
            </b-col>
        </b-form-row>
       </b-card>

        <b-card   class="apk-shadow" header="CREAR NUEVO APLICANTE" header-text-variant="center">
            
            <b-form >
                <b-form-group
                    label="* Nombre:"
                > 
                    <div class="" v-if="createClientLoading">
                        <pulse-loader :loading="createClientLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                    </div>

                    <b-form-input
                        v-show="!createClientLoading"
                        v-model="form.name"
                        type="text"
                        placeholder="Ingrese el nombre del aplicante"
                        :state="nameState"
                    ></b-form-input>
                    <span 
                        class="text-danger"
                        v-for="(error, index) in mostrarErroresInput('name')"
                        :key="`name-${index}`">{{ error }}
                    </span>
               </b-form-group>

                <b-form-group
                    label="* Apellidos:"
                > 
                    <div class="" v-if="createClientLoading">
                        <pulse-loader :loading="createClientLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                    </div>

                    <b-form-input
                        v-show="!createClientLoading"
                        v-model="form.surnames"
                        type="text"
                        placeholder="Ingrese los apellidos del aplicante"
                        :state="surnamesState"
                    ></b-form-input>
                    <span 
                        class="text-danger"
                        v-for="(error, index) in mostrarErroresInput('surnames')"
                        :key="`name-${index}`">{{ error }}
                    </span>
               </b-form-group>

                <b-form-group
                    label="* DNI:"
                > 
                    <div class="" v-if="createClientLoading">
                        <pulse-loader :loading="createClientLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                    </div>

                    <b-form-input
                        v-show="!createClientLoading"
                        v-model="form.dni"
                        type="number"
                        placeholder="Ingrese el dni del aplicante"
                        :state="dniState"
                    ></b-form-input>
                    <span 
                        class="text-danger"
                        v-for="(error, index) in mostrarErroresInput('dni')"
                        :key="`name-${index}`">{{ error }}
                    </span>
                </b-form-group>
                
                <b-form-group
                    label="* Celular:"
                > 
                    <div class="" v-if="createClientLoading">
                        <pulse-loader :loading="createClientLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                    </div>

                    <b-form-input
                        v-show="!createClientLoading"
                        v-model="form.mobile"
                        type="number"
                        placeholder="Ingrese el dni del aplicante"
                        :state="mobileState"
                    ></b-form-input>
                    <span 
                        class="text-danger"
                        v-for="(error, index) in mostrarErroresInput('mobile')"
                        :key="`name-${index}`">{{ error }}
                    </span>
                </b-form-group>
               
                <b-form-group
                    label="* Email:"
                > 
                    <div class="" v-if="createClientLoading">
                        <pulse-loader :loading="createClientLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                    </div>

                    <b-form-input
                        v-show="!createClientLoading"
                        v-model="form.email"
                        type="email"
                        placeholder="Ingrese el correo del aplicante"
                        :state="emailState"
                    ></b-form-input>
                    <span 
                        class="text-danger"
                        v-for="(error, index) in mostrarErroresInput('email')"
                        :key="`name-${index}`">{{ error }}
                    </span>
                </b-form-group>
               
               
                <b-form-group
                    label="Perfil:"
                >   
                    <div class="" v-if="createClientLoading">
                        <pulse-loader :loading="createClientLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                    </div>

                    <b-form-textarea
                        v-show="!createClientLoading"
                        v-model="form.profile"
                        placeholder="Ingrese el perfil del aplicante..."
                        rows="1"
                        max-rows="6"
                        :state="profileState"
                    ></b-form-textarea>

                    <span 
                        class="text-danger"
                        v-for="(error, index) in mostrarErroresInput('profile')"
                        :key="`name-${index}`">{{ error }}
                    </span>
               </b-form-group>

                <b-form-group
                    label="Comentarios adicionales:"
                >   
                    <div class="" v-if="createClientLoading">
                        <pulse-loader :loading="createClientLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                    </div>

                    <b-form-textarea
                        v-show="!createClientLoading"
                        v-model="form.commentary"
                        placeholder="Ingrese un comentario..."
                        rows="3"
                        max-rows="6"
                        :state="commentaryState"
                    ></b-form-textarea>

                    <span 
                        class="text-danger"
                        v-for="(error, index) in mostrarErroresInput('commentary')"
                        :key="`name-${index}`">{{ error }}
                    </span>
               </b-form-group>
           
               <b-btn
                    variant="primary"
                    @click="enviar"
                    size="lg"
                >
                    CREAR APLICANTE
               </b-btn>
            </b-form>
        </b-card>
    </b-container>
</template>
<script>
  import { storeClient, buscarLeadDni } from '@/api/clients';

  export default {
    data() {
        return {
            form: {
                name: '',
                surnames: '',
                dni: '',
                email: '',
                mobile: '',
                profile: '',
                commentary: '',
            },
            //
            nameState: null,
            surnamesState: null,
            dniState: null,
            emailState: null,
            mobileState: null,
            profileState: null,
            commentaryState: null,
            //
            erroresInputs: [],
            //
            createClientLoading: false,
            //
            dniLead: ''
      }
    },
    
    methods: {
        setTrue(){
            this.clear()

            this.nameState = true
            this.surnamesState = true
            this.dniState = true
            this.emailState = true
            this.mobileState = true
            this.profileState = true
            this.commentaryState = true
        },

         clear(){
            this.erroresInputs = []
            this.nameState =  null
            this.surnamesState =  null
            this.dniState =  null
            this.emailState =  null
            this.mobileState =  null
            this.profileState =  null
            this.commentaryState =  null
        },

        mostrarErroresInput(pCampo) { 
            let camposIncorrectos = Object.keys(this.erroresInputs);
            if (camposIncorrectos.includes(pCampo)) {
                switch (pCampo) {
                    case 'name':
                        this.nameState = false
                        break;
                    case 'surnames':
                        this.surnamesState = false
                        break;
                    case 'dni':
                        this.dniState = false
                        break;
                    case 'email':
                        this.emailState = false
                        break;
                    case 'mobile':
                        this.mobileState = false
                        break;
                    case 'profile':
                        this.profileState = false
                        break;
                    case 'commentary':
                        this.commentaryState = false
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
            this.createClientLoading = true

            this.setTrue()

            let clientForm = new FormData()
            clientForm.append('name', this.form.name)
            clientForm.append('surnames', this.form.surnames)
            clientForm.append('dni', this.form.dni)
            clientForm.append('email',this.form.email)
            clientForm.append('mobile', this.form.mobile)
            clientForm.append('profile', this.form.profile)
            clientForm.append('commentary', this.form.commentary)

            storeClient(clientForm)
                .then( res => {
                    if(res.status == 201) {
                       this.$notify({
                            type: 'success',
                            title: 'Creación correcta!!'
                        })
                        this.$router.push({
                            name : 'lista-aplicantes'
                        })
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
                    this.createClientLoading = false
                })
        },

        buscarLead () {
            this.createClientLoading=true
            buscarLeadDni(this.dniLead)
                .then(res => {
                    if(res.status == 200) {
                        this.form.name = res.data.data.attributes.name
                        this.form.surnames = res.data.data.attributes.surnames
                        this.form.dni = res.data.data.attributes.dni
                        this.form.email = res.data.data.attributes.email
                        this.form.mobile = res.data.data.attributes.mobile
                        this.form.profile = res.data.data.attributes.profile
                        this.form.commentary = res.data.data.attributes.commentary

                        this.$notify({
                            type: 'success',
                            title: 'Lead recuperado!'
                        })

                    } else if( res.status == 203) {
                            this.$notify({
                            type: 'danger',
                            title: res.data.message 
                        })
                    }
                }).catch( err => {
                    console.log(err)
                }).finally(() => {
                    this.createClientLoading=false
                } )
        }
      
    }
  };
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@600;700;800&display=swap');
    
    .apk-shadow {
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.16);
    }
    .apk-soft-shadow {
        box-shadow: 1px 1px 3px rgba(83, 83, 83, 0.12), 
                    1px -1px 3px rgba(133, 132, 132, 0.16),
                    -1px 1px 2px rgba(133, 132, 132, 0.16);
    }
    .apk-client-data {
        font-size: 14px;
        padding: 5px 10px;
        border-radius: 10px;
        background-color: rgba(210, 205, 218, 0.25);
    }
    .apk-client-programs-data {
        padding: 5px 15px;
        border-radius: 8px;
        background-color: rgba(0, 0, 0, 0.158);
    }
    .internship {
        background-color: #40b6e6;
        border:none;
    }
    .trainee {
        background-color: rgb(64,182,230);
        border:none;
    }
    .wat {
        background-color: #685bc7;
        border:none;
    }
    .aupair {
        background-color: rgb(255,173,0);
        border:none;
    }
    .apk-color-sec-1 {
        background-color: #ef4a81;
        border:none;
    }
    .apk-color-sec-2 {
        background-color: rgb(100,204,201);
        border:none;
    }
    .apk-color-gray-only {
        background-color: rgba(138, 138, 138, 0.0);
        border: 2px solid  rgba(138, 138, 138, 0.301);
        box-shadow: none;
    }
    .apk-color-gray {
        background-color: rgba(138, 138, 138, 0.0);
        border: 2px solid  rgba(138, 138, 138, 0.301);
        box-shadow: none;
    }
    .apk-color-gray:hover {
        background-color: rgba(138, 138, 138, 0.301);
        border: 2px solid  rgba(138, 138, 138, 0.301);   
        box-shadow: none;
    }
    .apk-card-title {
        font-size: 30px;
        letter-spacing: 5px;
        font-weight: bolder;
        color: rgb(26, 26, 26);
    }
    .apk-card-subtitle {
        font-size: 18px;
        letter-spacing: 1px;
        text-transform: uppercase;
        font-weight: bolder;
        color: rgb(95, 93, 93);
    }
    .apk-card-text {
        font-size: 16px;
        font-weight: bolder;
        text-align: justify;
        color: rgb(145, 145, 145);
    }
    
    .apk-select {
        appearance: none;
        border: none;
        text-align: center;
        font-family: 'Open Sans', sans-serif;
        padding: 5px 15px;
        border-radius: 8px;
        background-color: rgba(204, 192, 214, 0.363);
        color: rgb(0, 0, 0);
    }
    .bg-gray {
        background-color: rgba(129, 128, 128, 0.527);

    }
    .apk-border-dash {
        border-style: dashed;
    }
    .apk-select-option {
        padding: 5px 15px;
        border-radius: 8px;
        color: #000f;
        background-color: rgb(255, 255, 255,0.158);
    }
    .apk-glass {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.1);
    }
    .apk-bottom {
        position: absolute;
        bottom: 25px;
    }
</style>
