<template>
    <b-row>

        <b-col cols="12" lg="7" xl="8" order="1" order-lg="0">
            
            <b-card
                no-body
                class="mb-5 apk-shadow opacity-9"

            >  
                <b-card-header>
                    Crear un programa relacionado al cliente :
                </b-card-header>

                <b-card-body class="my-0  apk-border-dash apk-color-gray-only">
                    <b-row class="d-flex justify-content-around">
                        <span class="d-flex justify-content-center ">
                            <select v-model="newProgramData.program_id" class="apk-select">
                                <option 
                                    v-for="(apkProgram, index) in apkPrograms"
                                    :key="`${index}-${apkProgram.text}`"
                                    :value="apkProgram.value"
                                    class="apk-select-option"
                                >{{apkProgram.text}}</option>
                            </select>
                        </span>

                        <span class="d-flex justify-content-center">
                            <select v-model="newProgramData.season" class="apk-select">
                                <option 
                                    v-for="(year, index) in years"
                                    :key="`${index}-${year}`"
                                    :value="year"
                                    class="apk-select-option"
                                >{{year}}</option>
                            </select>
                        </span>

                        <span class="d-flex justify-content-center md-2">
                            <b-button variant="primary" size="sm" class="apk-select" @click="createClientProgram">
                                CREAR
                            </b-button>
                        </span>
                    </b-row>
                    
                </b-card-body>
            </b-card>


            <!-- PROGRAMAS DE LOS CLIENTES -->
            <div class="accordion"
            >
                <!-- <b-card-header class="apk-soft-shadow" v-if="!dataClientProgramsLoading"> -->
                <b-card-header class="apk-soft-shadow">
                    Programas relacionados al cliente :
                </b-card-header>

                <!-- LOADER -->
                <div class="d-flex justify-content-center  apk-shadow rounded" v-show="dataClientProgramsLoading"
                    style="background-color:#fff">
                    <pulse-loader :loading="dataClientProgramsLoading" :size="20" :margin="'15px'" :color="'#2B2D64'" />
                </div>
                <!-- END LOADER -->

                 <b-card-header class="apk-soft-shadow" v-show="createProgramLoading">
                    <!-- LOADER -->
                    <div class="d-flex justify-content-center  apk-shadow rounded" v-show="createProgramLoading"
                        style="background-color:#fff">
                        <pulse-loader :loading="createProgramLoading" :size="20" :margin="'15px'" :color="'#2B2D64'" />
                    </div>
                    <!-- END LOADER -->
                </b-card-header>

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

                        <b-card-body>
                        <!-- BTN AGREGAR VOUCHER A UN PROGRAMA DEL CLIENTE -->
                            <b-button 
                                block
                                variant="primary" 
                                class="d-flex justify-content-around apk-color-gray apk-border-dash"
                                @click="crearvoucher(clientProgram)"
                            >
                                <span class="apk-client-programs-data"> + AGREGAR VOUCHER</span>
                            </b-button>

                            <!-- BTN AGREGAR ELIMINAR EL PROGRAMA DEL CLIENTE -->
                             <b-button 
                                block
                                variant="danger" 
                                class="d-flex justify-content-around mt-4 opacity-9"
                                v-if="clientProgram.vouchers ? clientProgram.vouchers.length == 0 ? true : false : false "
                                @click="eliminarPrograma(clientProgram)"
                            >
                                 <span class="apk-client-programs-data"> - Eliminar programa</span>
                            </b-button>
                        </b-card-body>

                        <!-- VOUCHERS DATA LOADER -->
                        <div class="bg-secondary d-flex justify-content-center py-2" v-if="!clientProgram.vouchers">
                            <pulse-loader :loading="clientProgram.loading || true" :size="20" :margin="'15px'" :color="'#2B2D64'" />
                        </div>
                        <!-- END LOADER -->

                        <!-- ITERACIÓN DE VOUCHERS POR PROGRAMAS -->
                        <b-card-body 
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
                                        <b-card-text class="mt-4 m-b-3 mb-lg-1 d-flex justify-content-around">
                                            <b-button  size="sm" variant="primary" @click="editarVoucher(voucher.id)">
                                                EDITAR
                                            </b-button>

                                            <b-button  size="sm" variant="danger" @click="eliminarVoucher(voucher.id)">
                                                ELIMINAR
                                            </b-button>
                                        </b-card-text>
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
                        <p class="m-0 ml-1 p-0 opacity-6">Dni :</p> 
                        <p class="apk-client-data">
                            {{$store.state.client.data.dni || clientData.dni}}
                        </p>
                    </b-col>
                    <b-col cols="12" class="mb-2">
                        <p class="m-0 ml-1 p-0 opacity-6">Nombres y apellidos :</p>
                        <p class="apk-client-data">
                            {{$store.state.client.data.name || clientData.name}} {{$store.state.client.data.surnames || clientData.surnames}}
                        </p>
                    </b-col>
                    <b-col cols="12" class="mb-2">
                        <p class="m-0 ml-1 p-0 opacity-6">Celular :</p> 
                        <p class="apk-client-data">
                            {{$store.state.client.data.mobile || clientData.mobile}}
                        </p>
                    </b-col>
                    <b-col cols="12" class="mb-2">
                        <p class="m-0 ml-1 p-0 opacity-6">Correo :</p> 
                        <p class="apk-client-data">
                            {{$store.state.client.data.email || clientData.email}}
                        </p>
                    </b-col>
                    <b-col cols="12" class="mb-2">
                        <p class="m-0 ml-1 p-0 opacity-6">Comentario :</p> 
                        <p class="apk-client-data">
                            {{$store.state.client.data.commentary || clientData.commentary}}
                        </p>
                    </b-col>
                    <b-col cols="12" class="mb-2">
                        <p class="m-0 ml-1 p-0 opacity-6">Perfil :</p> 
                        <p class="apk-client-data">
                            {{$store.state.client.data.profile || clientData.profile}}
                        </p>
                    </b-col>
                    <b-col cols="12" class="mb-2">
                        <b-card-text class="mt-4 m-b-3 mb-lg-1 d-flex justify-content-around">
                            <b-button  size="sm" variant="primary" @click="editarCliente">
                                EDITAR
                            </b-button>

                            <b-button  size="sm" variant="danger" 
                                @click="eliminarCliente"
                                v-if="clientProgramsData.length == 0 ? true : false"
                                >
                                ELIMINAR
                            </b-button>
                        </b-card-text>
                    </b-col>
                </b-row>

            </b-card>
        </b-col>
    </b-row>

</template>
<script>
  import store from '@/store';
  import { getClient, getClientProgramsData, destroyCliente } from '@/api/clients';
  import { getVouchersProgramData, storeClientProgram, destroyClientProgram } from '@/api/clientPrograms';
  import { getAllActivePrograms } from '@/api/apkPrograms';
  import { destroyVoucher } from '@/api/voucher';
  import swal from 'sweetalert';

  export default {
      name:'ClientDetails',
    data() {
        return {
            clientProgramsData: [] ,
            clientData: [],
            apkPrograms: [],
            newProgramData: {
                program_id: 1,
                season: ''
            },
            years: [],
            //
            dataClientProgramsLoading: false,
            createProgramLoading: false
      }
    },
    beforeMount (){
        this.getClientProgramsData()
        this.getYears()
        localStorage.removeItem('detalleClienteId')
    },
    methods: {
        getYears () {
            var date = new Date();
            var year = date.getFullYear();
            
            this.newProgramData.season = year

            for(let i=year-3; i<year+3; i++) {
                this.years.push(i)
            }
        },

        getClientProgramsData () {
            this.dataClientProgramsLoading = true
            getClientProgramsData(store.state.client.data.id || this.$route.params.clientId)
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
            

            if (!store.state.client.data.lengh) {
                 getClient(this.$route.params.clientId)
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
            }
            getAllActivePrograms ()
                .then (res => {
                    if (res.status) {
                        this.apkPrograms = res.data.data.map( m => ({value: m.attributes.id, text: m.attributes.name}) )
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

        crearvoucher (clientProgram) {
            this.$router.push({
                name : 'crear-voucher',
                params: {
                    clientProgramId : clientProgram.id,
                    clientId: clientProgram.client_id
                }
            })
        },

        createClientProgram () {
            this.createProgramLoading = true
            let clientProgram = new FormData()
            clientProgram.append('client_id', this.$route.params.clientId)
            clientProgram.append('program_id', this.newProgramData.program_id)
            clientProgram.append('season', this.newProgramData.season)
            clientProgram.append('state','activo')

            storeClientProgram (clientProgram)
                .then ( res => {
                    if(res.status == 201) {
                        this.$notify({
                            type: 'success',
                            title: 'Programa para el cliente creado!!'
                        })
                        this.getClientProgramsData()
                    }
                }).catch( err => {
                    if (err.response){
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
                    this.createProgramLoading = false
                })
        },

        eliminarVoucher (voucherId) {
            swal('¿Estás seguro de eliminar este voucher?', {
                    icon: 'warning',
                    dangerMode: true,
                    buttons: true,
                }
            ).then( resp => {
                if(resp) {
                    destroyVoucher(voucherId)
                        .then( res => {
                            if(res.status == 204) {
                                this.getClientProgramsData()
                                swal('El voucher fue eliminado',{icon:'success'})
                            }
                        }).catch( err => {
                            if(err.response){
                                swal('No se pudo eliminar el voucher', err.response.status, {icon:'warning'})
                            } else {
                                swal('No se pudo eliminar el voucher', err.message, {icon:'warning'})
                            }
                        })
                }
            })
        },

        editarVoucher (voucherId) {
            this.$router.push({
                name: 'editar-voucher',
                params: {
                    voucherId: voucherId,
                    clientId: this.$route.params.clientId
                }
            })
        },

        eliminarPrograma (clientProgram) {
            this.$set( clientProgram, "deleteLoading", true );
            destroyClientProgram(clientProgram.id)
                .then( res => {
                    if (res.status == 204) {
                        this.$notify({
                            type: 'success',
                            title: 'Programa eliminado!'
                        })
                        this.getClientProgramsData()
                    } 
                }).catch( err => {
                    if (err.response) {
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
                }).finally ( () => {
                    this.$set( clientProgram, "deleteLoading", false );
                }) 
        },
      
        eliminarCliente () {
            swal('¿Estás seguro de eliminar este Cliente?', {
                    icon: 'warning',
                    dangerMode: true,
                    buttons: true,
                }
            ).then( resp => {
                if(resp) {
                    destroyCliente(this.$route.params.clientId)
                        .then( res => {
                            if(res.status == 204) {
                                swal('El cliente fue eliminado',{icon:'success'})
                                this.$router.push({name: 'lista-aplicantes'})
                            }
                        }).catch( err => {
                            if(err.response){
                                swal('No se pudo eliminar el cliente', err.response.status, {icon:'warning'})
                            } else {
                                swal('No se pudo eliminar el cliente', err.message, {icon:'warning'})
                            }
                        })
                }
            })
        },

       editarCliente () {
            this.$router.push({
                name: 'editar-aplicante',
                params: {
                    clientId: this.$route.params.clientId
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
        background-color: rgb(239, 74, 129);
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
