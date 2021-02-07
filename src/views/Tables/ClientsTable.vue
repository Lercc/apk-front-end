<template>
  <div class="card shadow-sm"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
            {{title}}
          </h3>
        </div>
      </div>
    </div>

    <!-- LOADER -->
    <div class="bg-secondary d-flex justify-content-center py-9" v-show="dataTableLoading">
    <!-- <div v-show="dataTableLoading"> -->
      <hash-loader :loading="dataTableLoading" :size = "120"  :color="'#2B2D64'"/>
    </div>
    <!-- END LOADER -->

    <div class="table-responsive" v-show="!dataTableLoading">
      <base-table class="table align-items-center table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                  tbody-classes="list"
                  :data="tableData">
        <template slot="columns">
          <th>id</th>
          <th>dni</th>
          <th>cliente</th>
          <th>celular</th>
          <th>correo</th>
          <th>&nbsp;</th>
        </template>


        <template slot-scope="{row}">
          <th scope="row">{{row.id}}</th>
          <th scope="row">{{row.dni}}</th>
          <th scope="row">{{row.name}} {{row.surnames}}</th>
          <th scope="row">{{row.mobile}}</th>
          <th scope="row">{{row.email}}</th>
          <th scope="row">
            <div class="btn btn-sm btn-primary">VER PAGOS</div>
          </th>
        </template>

      </base-table>
    </div>

    <div class="card-footer d-flex justify-content-end"
         :class="type === 'dark' ? 'bg-transparent': ''"
         v-show="!dataTableLoading">
      <base-pagination 
        :pageCount="meta.last_page" 
        :perPage="meta.per_page"
        :value="meta.current_page"
        @input="cargardatos"
      ></base-pagination>
    </div>

  </div>
</template>
<script>
  // import axios from 'axios';
  import {getClients} from '@/api/clients'

  export default {
    name: 'projects-table',
    props: {
      type: {
        type: String
      },
      title: String
    }, 
    data() {
      return {
        data: [] ,
        links: [] ,
        meta: [] ,
        status:'',
        //
        tableData: [],
        //
        dataTableLoading: true,
      }
    },
    beforeMount() {
      this.cargardatos()
    },
    methods: {
      cargardatos (pPage) {
        getClients(pPage)
          .then( res => {
            if (res.status == 200) {
              this.status = 200
              this.data = res.data.data
              this.links = res.data.links
              this.meta = res.data.meta

              this.tableData = res.data.data.map( m => m.attributes )
            }
          }).catch( err => {
            if(err.response){
              console.log(err.response.status)
              this.status = err.response.status
            }
          }).finally( () => {
            console.log(this.status)
          }) 
      },
   }
  }
</script>
<style>
</style>
