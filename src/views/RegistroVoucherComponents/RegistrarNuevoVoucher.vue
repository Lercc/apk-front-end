<template>
               
   <b-container class="col-lg" >
        <b-card   class="apk-shadow">
            <template #header >
                <span class="text-center text-muted">
                    CREAR NUEVO VOUCHER
                </span>
            </template>
            <b-form >
                <b-form-group
                    label="* Concepto del voucher:"
                > 
                    <div class="" v-if="updateVoucherLoading">
                        <pulse-loader :loading="updateVoucherLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                    </div>

                    
                    <b-form-select v-model="form.name" :options="conceptosDePago" :state="nameState" v-show="!updateVoucherLoading">
                        <template #first>
                            <b-form-select-option value="" disabled>-- Selecione el concepto del voucher --</b-form-select-option>
                        </template>
                    </b-form-select>

                    <span 
                        class="text-danger"
                        v-for="(error, index) in mostrarErroresInput('name')"
                        :key="`name-${index}`">{{ error }}
                    </span>
               </b-form-group>

                <b-form-group label="* Imagen del voucher:" >
                    <div class="" v-if="updateVoucherLoading">
                        <pulse-loader :loading="updateVoucherLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                    </div>
                    
                    <b-form-file
                        v-show="!updateVoucherLoading"
                        v-model="form.image"
                        placeholder="Subir una imagem..."
                        :state="imageState"
                        style="overflow:hidden"
                    ></b-form-file>
                    <span 
                        class="text-danger"
                        v-for="(error, index) in mostrarErroresInput('image')"
                        :key="`name-${index}`">{{ error }}
                    </span>
                </b-form-group>

                <b-form-group
                    label="* Código de operación del voucher:"
                > 
                    <div class="" v-if="updateVoucherLoading">
                        <pulse-loader :loading="updateVoucherLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                    </div>

                    <b-form-input
                        v-show="!updateVoucherLoading"
                        v-model="form.code"
                        type="number"
                        placeholder="Ingrese el código de operación del voucher"
                        :state="codeState"
                    ></b-form-input>
                    <span 
                        class="text-danger"
                        v-for="(error, index) in mostrarErroresInput('code')"
                        :key="`name-${index}`">{{ error }}
                    </span>
                </b-form-group>
                
                <b-form-group
                    label="* Monto:"
                > 
                    <div class="" v-if="updateVoucherLoading">
                        <pulse-loader :loading="updateVoucherLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                    </div>

                    <b-form-input
                        v-show="!updateVoucherLoading"
                        v-model="form.amount"
                        type="number"
                        placeholder="Ingrese el monto del voucher"
                        :state="amountState"
                    ></b-form-input>
                    <span 
                        class="text-danger"
                        v-for="(error, index) in mostrarErroresInput('amount')"
                        :key="`amount-${index}`">{{ error }}
                    </span>
                </b-form-group>
               
                <b-form-row class="d-flex justify-content-center"> 
                    <b-btn
                            variant="primary"
                            class="col-6 col-md-6 col-lg-3"
                            @click="enviar"
                            size="lg"
                        >
                            CREAR VOUCHER
                    </b-btn>
                </b-form-row>
            </b-form>
        </b-card>
    </b-container>
</template>
<script>
  import { storeVoucherClientProgram } from '@/api/clientAplication';

  export default {
    data() {
        return {
            form: {
                client_program_id: null,
                name: '',
                code: '',
                amount: '',
                state: null,
                image: null,
            },
            //
            conceptosDePago: [
                { value: 'Entrevista de inglés', text: 'Entrevista de inglés' },
                { value: 'Primer pago', text: 'Primer pago' },
                { value: 'Segundo pago', text: 'Segundo pago' },
                { value: 'Tercer pago', text: 'Tercer pago' },
            ],
            //
            nameState: null,
            imageState: null,
            codeState: null,
            amountState: null,
            //
            erroresInputs: [],
            //
            updateVoucherLoading: false,
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
                    case 'amount':
                        this.amountState = false
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
            this.updateVoucherLoading = true

            this.nameState = true
            this.imageState = true
            this.codeState = true
            this.amountState = true

            let voucherForm = new FormData()
            voucherForm.append('client_program_id', this.$route.params.clientProgramId)
            voucherForm.append('name', this.form.name)
            voucherForm.append('code', this.form.code)
            voucherForm.append('amount', this.form.amount)
            voucherForm.append('state','pendiente')
            voucherForm.append('image', this.form.image)

            storeVoucherClientProgram(voucherForm)
                .then( res => {
                    if(res.status == 201) {
                       this.$notify({
                            type: 'success',
                            title: 'Creación correcta!!'
                        })
                        this.$router.push({ name : 'registro-voucher'})
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
                    this.updateVoucherLoading = false
                })
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
