<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">

            <b-row class="d-flex justify-content-between" >
                <b-col cols="12" sm="auto" class="d-flex justify-content-center mb-2">
                    <b-button variant="primary" size="sm" class="px-3 py-2" 
                        v-show="currentComponent == 'client-details'"
                        @click="changeView('clients-table')"
                    >
                        <b-icon icon="arrow-left-square-fill" ></b-icon>
                        <a>TABLA DE CLIENTES</a>
                    </b-button>
                </b-col>
                
                <b-col cols="12" sm="auto" class="d-flex justify-content-center justify-content-sm-end mb-2">
                    <b-button variant="primary" size="sm" class="px-3 py-2">
                        <b-icon icon="search" ></b-icon>
                        <a>BUSCAR</a>
                    </b-button>
                </b-col>
            </b-row>

        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <component :is="currentViewComponent" @child-event="changeView" />
                    <!-- <clients-table title="Light Table"></clients-table> -->
                </div>
            </div>
        </div>

        <b-container fluid>
            <b-row class="d-flex justify-content-start" >
                <b-col cols="12" sm="auto" class="d-flex justify-content-center mb-2 mt-5">
                    <b-button variant="primary" size="sm" class="px-3 py-2" 
                        v-show="currentComponent == 'client-details'"
                        @click="changeView('clients-table')"
                    >
                        <b-icon icon="arrow-left-square-fill" ></b-icon>
                        <a>TABLA DE CLIENTES</a>
                    </b-button>
                </b-col>
            </b-row>
        </b-container>

    </div>
</template>
<script>
  import ClientsTable from '@/views/GestionVoucherComponents/ClientsTable';
  import ClientDetails from '@/views/GestionVoucherComponents/ClientDetails';

  export default {
    name: 'gestionVouchers',
    components: {
      ClientsTable,
      ClientDetails
    },
    data () {
        return {
            currentComponent: 'clients-table',
        }
    },
    computed: {
        currentViewComponent() {
            return this.currentComponent
        }
    },
    methods: {
        changeView (payload) {
            this.currentComponent = payload
        } 
    }
  };
</script>
<style scoped>
.apk-shadow {
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.16);
}
</style>
