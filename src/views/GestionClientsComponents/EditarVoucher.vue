<template>
               
   <b-container class="col-lg" >
        <b-card   class="apk-shadow">
            <b-card-title class="text-center text-muted">
               EDITAR VOUCHER
            </b-card-title>
            <b-form >
                <b-form-group
                    label="Nombre o concepto del voucher:"
                >
                    <div class="" v-if="updateVoucherLoading">
                        <pulse-loader :loading="updateVoucherLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                    </div>

                    <b-form-select 
                        v-model="form.name"
                        @change="voucherNameChange"
                        :options="conceptosDePago"
                        :state="nameState"
                        v-show="!updateVoucherLoading">
                    </b-form-select>

                    <!-- <b-form-input
                        v-show="!updateVoucherLoading"
                        v-model="form.name"
                        type="text"
                        placeholder="Ingrese el concepto del voucher"
                        :state="nameState"
                    ></b-form-input> -->
                    <span 
                        class="text-danger"
                        v-for="(error, index) in mostrarErroresInput('name')"
                        :key="`name-${index}`">{{ error }}
                    </span>
               </b-form-group>

                <b-form-group label="Imagen del voucher:" >
                    <div class="" v-if="updateVoucherLoading">
                        <pulse-loader :loading="updateVoucherLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                    </div>
                    
                    <b-form-file
                        v-show="!updateVoucherLoading"
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
                    label="¿Pago realizado por yape registrado?"
                >
                    <b-form-checkbox 
                        v-model="selected"
                        name="check-button"
                        switch
                        size="sm"
                        class="pt-2"
                        @change="switchChanged"
                    >
                        ({{selected ? 'si' : 'no' }})
                        <img 
                            alt="pago por yape"
                            src="/img/icons/yape/yape-app-logotipo.svg"
                            height="50px"
                            class="ml-1"
                            :class="selected ? 'opacity-10' : 'opacity-3'"
                            style="position:absolute; top:-15px"
                        >
                    </b-form-checkbox>
                </b-form-group>

                <b-form-group
                    label="Código de operación del voucher:"
                    v-show="selected ? false : true"
                > 
                    <div class="" v-if="updateVoucherLoading">
                        <pulse-loader :loading="updateVoucherLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                    </div>

                    <b-form-input
                        v-show="!updateVoucherLoading && !selected"
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
                
                <!-- switch date and time -->
                <b-form-group
                    label="Editar fecha y hora"
                >
                    <b-form-checkbox 
                        v-model="selectedDateAndTime"
                        name="check-button"
                        switch
                        size="sm"
                        class="pt-2"
                    >
                        ({{selectedDateAndTime ? 'si' : 'no' }})
                    </b-form-checkbox>
                </b-form-group>

                <b-form-row>
                    <b-col cols="6">
                        <b-form-group
                            label="* Fecha:"
                        >
                            <div v-if="updateVoucherLoading">
                                <pulse-loader :loading="updateVoucherLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                            </div>

                            <b-form-input
                                v-show="!updateVoucherLoading"
                                v-model="form.date"
                                type="date"
                                :state="dateState"
                                :disabled="!selectedDateAndTime"
                            ></b-form-input>
                            <span 
                                class="text-danger"
                                v-for="(error, index) in mostrarErroresInput('date')"
                                :key="`date-${index}`">{{ error }}
                            </span>
                        </b-form-group>
                    </b-col>
                    
                    <b-col cols="6">
                        <b-form-group
                            label="* Hora:"
                        >
                            <div v-if="updateVoucherLoading">
                                <pulse-loader :loading="updateVoucherLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                            </div>

                            <b-form-input
                                v-show="!updateVoucherLoading"
                                v-model="form.time"
                                type="time"
                                :state="timeState"
                                :disabled="!selectedDateAndTime"
                            ></b-form-input>
                            <span 
                                class="text-danger"
                                v-for="(error, index) in mostrarErroresInput('time')"
                                :key="`time-${index}`">{{ error }}
                            </span>
                        </b-form-group>
                    </b-col>
                </b-form-row>

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
                        :disabled="amountInputState"
                        :state="amountState"
                    ></b-form-input>
                    <span 
                        class="text-danger"
                        v-for="(error, index) in mostrarErroresInput('amount')"
                        :key="`amount-${index}`">{{ error }}
                    </span>
                </b-form-group>


                <b-form-group
                    label="Estado del voucher:"
                    v-if="data.email == 'saliaga@aupairkids.com.pe' ? true : false"
                > 
                    <div class="" v-if="updateVoucherLoading">
                        <pulse-loader :loading="updateVoucherLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                    </div>

                    <b-form-select v-model="form.state" :options="states"></b-form-select>
                    <span 
                        class="text-danger"
                        v-for="(error, index) in mostrarErroresInput('state')"
                        :key="`name-${index}`">{{ error }}
                    </span>
                </b-form-group>
               
                <b-form-group
                    label="Comentarios adicionales:"
                >   
                    <div class="" v-if="updateVoucherLoading">
                        <pulse-loader :loading="updateVoucherLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                    </div>

                    <b-form-textarea
                        v-show="!updateVoucherLoading"
                        v-model="form.description"
                        placeholder="Ingrese un comentario..."
                        rows="3"
                        max-rows="6"
                    ></b-form-textarea>
               </b-form-group>

                <b-form-row class="d-flex justify-content-center">
                    <div class="btn btn-primary col col-lg-4 text-center"  @click="enviar">
                        ACTUALIZAR VOUCHER
                    </div>
                </b-form-row>

            </b-form>
        </b-card>
    </b-container>
</template>
<script>
import {  getVoucher, updateVoucher } from '@/api/voucher';
import { mapState } from 'vuex'

export default {
    name:'EditarVoucher',
    data() {
        return {
            amountInputState: false,
            //
            form: {
                client_program_id: null,
                code: '',
                date: '',
                time: '',
                amount: '',
                description: '',
                id: '',
                image: null,
                state: null,
                name: '',
            },
            //
            nameState: null,
            imageState: null,
            codeState: null,
            dateState: null,
            timeState: null,
            amountState: null,
            // 
            erroresInputs: [],
            // 
            updateVoucherLoading: false,
            //
            conceptosDePago: [
                { value: 'Entrevista de inglés', text: 'Entrevista de inglés' },
                { value: 'SEVIS', text: 'SEVIS' },
                { value: 'Primer pago', text: 'Primer pago' },
                { value: 'Segundo pago', text: 'Segundo pago' },
                { value: 'Tercer pago', text: 'Tercer pago' },
            ],
            //
            states: [
                {value:'pendiente', text:'pendiente'}, 
                {value:'verificado', text:'verificado'}
            ],
            selected: '',
            selectedDateAndTime: ''
      }
    },
    beforeMount() {
        this.getVoucherData(this.$route.params.voucherId)
    },

    computed: {
        ...mapState('user', ['data']),
    },

    methods: {
        getVoucherData(pVoucherId) {
            getVoucher(pVoucherId)
                .then(res => {
                    if (res.status == 200) {
                        [this.form] = [res.data.data.attributes]
                        this.form.image = null
                        if(this.form.code == null) this.selected = true
                        else this.selected = false
                        this.$notify({
                            type: 'success',
                            title: 'Datos recuperados!!'
                        })
                    }
                }).catch( err => {
                    if(err.response){
                         this.$notify({
                            type: 'danger',
                            title: err.response.status
                        })  
                    } else {
                        this.$notify({
                            type: 'danger',
                            title: err.message
                        })
                    }
                })
        },
        
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
                    case 'date':
                        this.dateState = false
                        break;
                    case 'time':
                        this.timeState = false
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

            this.nameState = null
            this.imageState = null
            this.codeState = null
            this.dateState = null
            this.timeState = null
            this.amountState = null

            this.erroresInputs = {}

            let voucherForm = new FormData()
            voucherForm.append('.method', 'put')
            voucherForm.append('client_program_id', this.form.client_program_id)
            voucherForm.append('name', this.form.name)

            if(this.form.code === null) voucherForm.append('code', '')
            else voucherForm.append('code', this.form.code)

            voucherForm.append('date', this.form.date == null ? '' : this.form.date)
            voucherForm.append('time', this.form.time == null ? '' : this.form.time)
            voucherForm.append('amount', this.form.amount)
            voucherForm.append('state', this.form.state)
            voucherForm.append('image', this.form.image)
            voucherForm.append('description', this.form.description)
            //
            if (this.selectedDateAndTime) voucherForm.append('editarFecha', 'si')
            else voucherForm.append('editarFecha', 'no')
            //
            if (this.selected) voucherForm.append('pagoPorAplicativo', 'si')
            else voucherForm.append('pagoPorAplicativo', 'no')

            updateVoucher(this.$route.params.voucherId, voucherForm)
                .then( res => {
                    if(res.status == 200) {
                        this.getVoucherData(this.$route.params.voucherId)
                        this.$notify({
                            type: 'success',
                            title: 'Actualización correcta!!'
                        })
                    }
                }).catch( err => {
                    if (err.response) {
                        if (err.response.data.errors) {
                            this.erroresInputs = err.response.data.errors
                        }
                        this.$notify({
                            type: 'danger',
                            title:  'Existen campos inválidos'
                        })
                    } else if (err.request) {
                        console.log('REQUEST' , err.request)
                    }else {
                        this.notify({
                            type: 'danger',
                            title: err.message
                        })
                    }
                }).finally( () => {
                    this.updateVoucherLoading = false
                })
        },

        switchChanged (e) {
            if (e) this.form.code = null
        },

        voucherNameChange () {
            if (this.form.name === 'SEVIS') {
                this.form.amount = 35
                this.amountInputState = true
            } else {
                this.form.amount = ''
                this.amountInputState = false
            }
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

