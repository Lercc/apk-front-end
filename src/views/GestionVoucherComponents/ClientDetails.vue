<template>
    <b-row>
        <b-col cols="12" lg="7" xl="8" order="1" order-lg="0">
             <!-- LOADER -->
            <div class="bg-secondary d-flex justify-content-center py-8 apk-shadow rounded" v-if="dataClientProgramsLoading">
                <pulse-loader :loading="dataClientProgramsLoading" :size="20" :margin="'15px'" :color="'#2B2D64'" />
            </div>
            <!-- END LOADER -->
            <div class="accordion">
                <b-card 
                    no-body 
                    class="apk-shadow"
                    v-for="(program, index) of clientProgramsData"
                    :key="`${index}-c-p-${program.client_id}`"
                >
                    <b-card-header class="p-2" role="tab">
                        <b-button 
                            block 
                            v-b-toggle="'accordion-' + program.id"
                            variant="primary" 
                            class="d-flex justify-content-around"
                            :class="{ 
                                wat : program.program_id==1,
                                internship : program.program_id==2,
                                trainee : program.program_id==3,
                                aupair : program.program_id==4
                                }"
                            v-show="!dataClientProgramsLoading"
                        >
                          <span class="apk-client-programs-data">{{program.program_name}}</span>
                          <span class="apk-client-programs-data">{{program.season}}</span>
                          <span class="apk-client-programs-data">{{program.state}}</span>
                        </b-button>
                    </b-card-header>
                    
                    <b-collapse :id="`accordion-${program.id}`" :visible="index == 0" >
                    <!-- <b-collapse :id="`accordion-${program.id}`" visible > -->
                        <b-card-body>
                            <b-button 
                                block 
                                variant="primary" 
                                class="d-flex justify-content-around apk-color-gray"
                                v-show="!program.vouchers"
                            >
                            <span class="apk-client-programs-data"> + AGREGAR</span>
                            </b-button>
                        </b-card-body>
                        <!-- LOADER -->
                        <div class="bg-secondary d-flex justify-content-center py-8" v-if="!program.vouchers">
                            <pulse-loader :loading="program.loading || true" :size="20" :margin="'15px'" :color="'#2B2D64'" />
                        </div>
                        <!-- END LOADER -->
                        <b-card-body 
                            v-else 
                            v-for="(voucher, index) in  program.vouchers" 
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
                                        <p class="apk-card-subtitle mb-0">{{voucher.name}}</p>
                                        <p class="apk-card-text mb-0">{{voucher.description}}</p>
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
                title="Datos del cliente"
                class="apk-shadow"
            >   
                <b-row>
                    <b-col cols="12" class="mb-2">
                        <b>DNI</b>
                        <p class="apk-client-data">
                            {{$store.state.client.data.dni}}
                        </p>
                    </b-col>
                    <b-col cols="12" class="mb-2">
                        <b>NOMBRES Y APELLIDOS: </b>
                        <p class="apk-client-data">
                            {{$store.state.client.data.name}} {{$store.state.client.data.surnames}}
                        </p>
                    </b-col>
                    <b-col cols="12" class="mb-2">
                        <b>CELULAR:</b>
                        <p class="apk-client-data">
                            {{$store.state.client.data.mobile}}
                        </p>
                    </b-col>
                    <b-col cols="12" class="mb-2">
                        <b>CORREO: </b>
                        <p class="apk-client-data">
                            {{$store.state.client.data.email}}
                        </p>
                    </b-col>
                    <b-col cols="12" class="mb-2">
                        <b>COMENTARIO:</b>
                        <p class="apk-client-data">
                            {{$store.state.client.data.commentary}}
                        </p>
                    </b-col>
                    <b-col cols="12">
                        <b>PERFIL:</b>
                        <p class="apk-client-data">
                            {{$store.state.client.data.profile}}
                        </p>
                    </b-col>
                </b-row>

            </b-card>
        </b-col>
    </b-row>

</template>
<script>
  import store from '@/store';
  import { getClientProgramsData } from '@/api/clients';
  import { getVouchersProgramData } from '@/api/clientPrograms';

  export default {
    data() {
        return {
            clientProgramsData: [] ,
            status:'',
            //
            dataClientProgramsLoading: false,
      }
    },
    beforeMount (){
        this.getData()
    },
    computed: {
        color(pay) {
            return pay
        },
    },
    methods: {
        getData() {
            this.dataClientProgramsLoading = true
            getClientProgramsData(store.state.client.data.id)
                .then (res => {
                    if (res.status == 200) {
                        this.status = 200
                        this.clientProgramsData = res.data.data.map(m => m.attributes)

                        this.clientProgramsData.forEach(element => {
                            this.getVouchersData(element)
                        });
                    }
                }).catch (err => {
                     if(err.response){
                        this.status = err.response.status
                    } else {
                        this.$notify({
                            type: 'danger',
                            title: err.message
                        })
                    }
                }).finally( () => {
                    this.dataClientProgramsLoading = false
                    if (this.status == 200) {
                        this.$notify({
                            type: 'success',
                            title: `${this.status}: Datos recuperados`
                        })
                    } else {
                         this.$notify({
                            type: 'danger',
                            title: `${this.status}: Algo salio mal`
                        })
                    }
          })
        },

        getVouchersData(program) {
            program.loading = true
            getVouchersProgramData(program.id)
                .then(res => {
                    if(res.status==200) {
                        this.$set( program, "vouchers", res.data.data.map( m => m.attributes ));
                    }
                }).catch( err => {
                    if(err.response){
                        console.log('RRRRRR',err.response.status)
                    } else {
                        this.$notify({
                            type: 'danger',
                            title: err.message
                        })
                    }
                }).finally( () => {
                    this.$set( program, "loading", false );
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
