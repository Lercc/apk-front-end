<template>
     <b-row>
        <b-col cols="12" lg="7" xl="8" order="1" order-lg="0">
            <!-- PROGRAMAS DE LOS CLIENTES -->
            <div class="accordion"
            >
                <b-card class="apk-soft-shadow rounded mb-3">
                    Programas :
                </b-card>

                <!-- LOADER -->
                <div class="d-flex justify-content-center  apk-shadow rounded" v-show="dataClientProgramsLoading"
                    style="background-color:#fff">
                    <pulse-loader :loading="dataClientProgramsLoading" :size="20" :margin="'15px'" :color="'#2B2D64'" />
                </div>
                <!-- END LOADER -->

                <!-- ITEREACIÓN DE LOS PROGRAMAS DE LOS CLIENTES -->
                <b-card 
                    no-body 
                    v-show="!dataClientProgramsLoading"
                    class="apk-soft-shadow"
                    v-for="(clientProgram, index) of clientProgramsData"
                    :key="`${index}-c-p-${clientProgram.client_id}`"
                >
                    <!-- CABECERAS -->
                    <b-card-header class="p-2" role="tab">
                        <b-button 
                            block 
                            v-b-toggle="'accordion-' + clientProgram.id"
                            variant="primary"
                            class="d-flex justify-content-around"
                            :class="{ 
                                wat : clientProgram.program_id==1,
                                internship : clientProgram.program_id==2,
                                trainee : clientProgram.program_id==3,
                                aupair : clientProgram.program_id==4
                                }"
                            v-show="!dataClientProgramsLoading"
                        >
                        <span class="apk-client-programs-data d-sm-none">{{clientProgram.program_name == 'work and travel' ? 'wat' : clientProgram.program_name }}</span>
                        <span class="apk-client-programs-data d-none d-sm-block">{{clientProgram.program_name}}</span>
                        <span class="apk-client-programs-data">{{clientProgram.season}}</span>
                        <span class="apk-client-programs-data">{{clientProgram.state}}</span>
                        </b-button>
                    </b-card-header>
                    
                    <!-- CONTENIDO( VOUCHERS) -->
                    <!-- <b-collapse :id="`accordion-${program.id}`" :visible="index == 0" > -->
                    <b-collapse :id="`accordion-${clientProgram.id}`" >

                        <b-card-body >
                        <!-- BTN AGREGAR VOUCHER A UN PROGRAMA DEL CLIENTE -->
                            <b-button 
                                block
                                variant="primary" 
                                class="d-flex justify-content-around apk-color-gray apk-border-dash"
                                @click="crearvoucher(clientProgram.id)"
                            >
                                <span class="apk-client-programs-data"> + AGREGAR VOUCHER</span>
                            </b-button>

                        </b-card-body>

                        <!-- VOUCHERS DATA LOADER -->
                        <div class="bg-secondary d-flex justify-content-center py-2" v-if="!clientProgram.vouchers">
                            <pulse-loader :loading="clientProgram.loading || true" :size="20" :margin="'15px'" :color="'#2B2D64'" />
                        </div>
                        <!-- END LOADER -->

                        <!-- ITERACIÓN DE VOUCHERS POR PROGRAMAS -->
                        <b-card-body 
                            class="rounded"
                            v-else 
                            v-for="(voucher, index) in  clientProgram.vouchers" 
                            :key="`${voucher.id}-voucher-${index}`"
                        >
                            <b-row 
                                no-gutters
                                class="apk-soft-shadow"
                            >
                                <b-col lg="12" xl="6">
                                    <b-card-img :src="voucher.image" class="rounded-0" fluid-grow></b-card-img>
                                </b-col>

                                <b-col lg="12" xl="6">
                                    <b-card-body>
                                        <p class="apk-card-title mb-0">{{voucher.code}}</p>
                                        <p class="apk-card-subtitle mb-0">MONTO: {{voucher.amount}}</p>
                                        <p class="apk-card-subtitle mb-0">{{voucher.name}}</p>
                                        <p class="apk-card-text mb-0">{{voucher.description}}</p>
                                        <badge class="badge-dot mr-4" :type="voucher.state == 'verificado' ? 'success' : 'danger'">
                                            <i :class="`bg-${voucher.state == 'verificado' ? 'success' : 'danger'}`"></i>
                                            <span class="status">{{voucher.state}}</span>
                                        </badge>
                                    </b-card-body>
                                </b-col>
                            </b-row>
                        </b-card-body>
                    </b-collapse>
                </b-card>

            </div>
        </b-col>


        <b-col cols="12" lg="5" xl="4" class="mb-5">
            <b-card
                title="Datos Personales"
                class="apk-shadow"
            >   
                <b-row>
                    <b-col cols="12" class="mb-2">
                        <p class="m-0 ml-1 p-0 opacity-6">Nombres y apellidos :</p>
                        <p class="apk-client-data">
                            {{$store.state.client.data.name || clientData.name}} {{$store.state.client.data.surnames || clientData.surnames}}
                        </p>
                    </b-col>
                </b-row>
            </b-card>
        </b-col>
    </b-row>
</template>
<script>
  import { getClient, getClientProgramsData, getVouchersProgramData, } from '@/api/clientAplication';
  import { mapState } from 'vuex';

  export default {
      name:'ClientDetails',
    data() {
        return {
            clientProgramsData: [] ,
            clientData: [],
            //
            dataClientProgramsLoading: false,
      }
    },

    computed: {
        ...mapState('clientAplication', ['id','role','ClientProgramtoken'])
    },

    beforeMount (){
        this.getData()
    },
    methods: {

        getData () {
            this.dataClientProgramsLoading = true
            getClientProgramsData(this.id)
                .then (res => {
                    if (res.status == 200) {
                        this.clientProgramsData = res.data.data.map(m => m.attributes)
                        this.$notify({
                            type: 'success',
                            title: `Programas recuperados`
                        })

                        this.clientProgramsData.forEach( clientProgra => {
                            this.getVouchersData(clientProgra)
                        });
                    }
                }).catch (err => {
                     if(err.response){
                        this.$notify({
                            type: 'danger',
                            title: `Algo salio mal :${err.resposne.status}`
                        })
                    } else {
                        this.$notify({
                            type: 'danger',
                            title: err.message
                        })
                    }
                }).finally( () => {
                     this.dataClientProgramsLoading = false
                })
            

                getClient(this.id)
                .then( res => {
                    if (res.status == 200) {
                        this.clientData = res.data.data.attributes
                        this.$notify({
                            type: 'success',
                            title: `Datos de cliente recuperados`
                        })
                    }
                }).catch( err => {
                    if(err.response){
                        this.$notify({
                            type: 'danger',
                            title: `Algo salio mal :${err.resposne.status}`
                        })
                    } else {
                        this.$notify({
                            type: 'danger',
                            title: err.message
                        })
                    }
                })
            
        },

        getVouchersData (clientProgram) {
            clientProgram.loading = true
            getVouchersProgramData(clientProgram.id)
                .then(res => {
                    if(res.status==200) {
                        this.$set( clientProgram, "vouchers", res.data.data.map( m => m.attributes ));
                    }
                }).catch( err => {
                    if(err.response){
                        this.$notify({
                            type: 'danger',
                            title: `Algo salio mal :${err.resposne.status}`
                        })
                    } else {
                        this.$notify({
                            type: 'danger',
                            title: err.message
                        })
                    }
                }).finally( () => {
                    this.$set( clientProgram, "loading", false );
                })
        },

        crearvoucher (pClientProgram) {
            this.$router.push({ 
                name : 'registrar-nuevo-voucher',
                params: {
                    'clientProgramId' : pClientProgram,
                }    
            })
        },
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
        background-color: #ffad00;
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
        font-weight: normal;
        font-style: italic;
        text-align: justify;
        color: rgb(173, 173, 173);
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