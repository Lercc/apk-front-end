<template>
                <!-- LOADER -->
                <!-- <div class="bg-secondary d-flex justify-content-center py-8 apk-shadow rounded" v-if="dataClientProgramsLoading">
                    <pulse-loader :loading="dataClientProgramsLoading" :size="20" :margin="'15px'" :color="'#2B2D64'" />
                </div> -->
                <!-- END LOADER -->
   <b-container fluid >
        <b-card   class="apk-shadow">
            <b-card-title>
                Nuevo Voucher
            </b-card-title>
            <b-form >
                <b-form-group
                    label="Nombre o concepto del voucher:"
                > <b-form-input
                    v-model="form.name"
                    type="text"
                    placeholder="Ingrese el concepto del voucher"
                    :state="nameState"
                    ></b-form-input>
                    <span 
                        class="text-danger"
                        v-for="(error, index) in mostrarErroresInput('name')"
                        :key="`name-${index}`">{{ error }}
                    </span>
               </b-form-group>

                <b-form-group label="Imagen del voucher:" >
                    <b-form-file
                        v-model="form.image"
                        placeholder="Subir una imagem..."
                        :state="imageState"
                    ></b-form-file>
                    <span 
                        class="text-danger"
                        v-for="(error, index) in mostrarErroresInput('image')"
                        :key="`name-${index}`">{{ error }}
                    </span>
                </b-form-group>

                <b-form-group
                    label="Código del voucher:"
                > <b-form-input
                        v-model="form.code"
                        type="number"
                        placeholder="Ingrese el código del voucher"
                        :state="codeState"
                    ></b-form-input>
                    <span 
                        class="text-danger"
                        v-for="(error, index) in mostrarErroresInput('code')"
                        :key="`name-${index}`">{{ error }}
                    </span>
                </b-form-group>
               
                <b-form-group
                    label="Comentarios adicionales:"
                ><b-form-textarea
                    v-model="form.description"
                    placeholder="Ingrese un comentario..."
                    rows="3"
                    max-rows="6"
                    ></b-form-textarea>
               </b-form-group>

               <b-btn 
                    variant="primary"
                    @click="enviar"
                    size="lg"
                >
                    REGISTRAR VOUCHER
               </b-btn>
            </b-form>
        </b-card>
         <!-- <b-card>
            <b-row>
                <b-col cols="12" md="8" class="d-flex justify-content-center border border-dark">
                    <b-form-group
                    description="Selecciona uno de la opciones."
                    :invalid-feedback="invalidFeedback"
                    :state="state"
                    >
                    <b-form-select v-model="selected" :options="apkProgramsData"></b-form-select>
                    </b-form-group>
                        <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
                </b-col>
            </b-row>
        </b-card> -->

    </b-container>
</template>
<script>
//   import store from '@/store';
  import { storeVoucherClientProgram } from '@/api/voucher';
//   import { getVouchersProgramData } from '@/api/clientPrograms';

  export default {
    data() {
        return {
            form: {
                client_program_id: null,
                name: '',
                code: '',
                state: null,
                image: null,
                description: '',
            },
            //
            nameState: null,
            imageState: null,
            codeState: null,

            erroresInputs: [],
            invalidFeedback: 'sestas mal ',
            state: false
      }
    },
    methods: {
        
        mostrarErroresInput(pCampo) { 
            let camposIncorrectos = Object.keys(this.erroresInputs);
            if (camposIncorrectos.includes(pCampo)) {
                switch (pCampo) {
                    case 'name':
                        this.nameState = false
                        break;
                    case 'image':
                        this.imageState = false
                        break;
                    case 'code':
                        this.codeState = false
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
            this.nameState = null
            this.nameState = null
            this.nameState = null


            let voucherForm = new FormData()
            voucherForm.append('client_program_id', this.$route.params.clientProgramId)
            voucherForm.append('name', this.form.name)
            voucherForm.append('code', this.form.code)
            voucherForm.append('state','pendiente')
            voucherForm.append('image', this.form.image)
            voucherForm.append('description', this.form.description)

            storeVoucherClientProgram(voucherForm)
                .then( res => {
                    console.log('ESTAUS',res.status)  // para elmiminar
                    console.log('data',res.data)  // para elmiminar
                    if(res.status == 201) {
                       this.$notify({
                            type: 'success',
                            title: `${res.status}: Creación correcta`
                        })
                         this.$router.push({
                            name : 'detalles-Cliente',
                            params: {
                                id : this.$route.params.clientId
                            }
                        })
                    }
                }).catch( err => {
                    if (err.response) {
                        console.log(err.response.data) // to delete
                        console.log(err.response.status) // to delete
                        this.erroresInputs = err.response.data.errors
                         this.$notify({
                            type: 'danger',
                            title: `${err.response.status}: Existen campos inválidos`
                        })
                    }
                })
        }
      
    }
  };
</script>
<style scoped>
    .apk-shadow {
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.16);
    }
    .apk-soft-shadow {
        box-shadow: 1px 1px 3px rgba(83, 83, 83, 0.12), 
                    1px -1px 3px rgba(133, 132, 132, 0.16),
                    -1px 1px 2px rgba(133, 132, 132, 0.16);
    }
    .apk-client-data {
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
        background-color: rgb(64,182,230);
        border:none;
    }
    .trainee {
        background-color: rgb(64,182,230);
        border:none;
    }
    .wat {
        background-color: rgb(104,91,199);
        border:none;
    }
    .aupair {
        background-color: rgb(255,173,0);
        border:none;
    }
    .apk-color-sec-1 {
        background-color: rgb(239,74,129);
        border:none;
    }
    .apk-color-sec-2 {
        background-color: rgb(100,204,201);
        border:none;
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
</style>
