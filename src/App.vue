<template>
  <div id="app">
    <notifications></notifications>
    <router-view/>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex';
export default {
  created() {
    if (localStorage.getItem("token") && JSON.parse(localStorage.getItem("usuario"))) {

        this.setTokenStoreData(localStorage.getItem("token"))
        this.setUserStoreData( JSON.parse( localStorage.getItem("usuario") ) )

        //redireccionar
        if (localStorage.getItem('detalleClienteId')) this.$router.push({ name: 'detalles-aplicante', params: { clientId: localStorage.getItem('detalleClienteId')} })
        else if(this.data.rol == 'employee') this.$router.push({ name : 'gestion-de-aplicantes' })
        else if(this.data.rol == 'admin') this.$router.push({ name : 'inicio' })
        
    } else if (JSON.parse(localStorage.getItem("cliApp"))) {

      this.setTokenCliAppStoreData(JSON.parse(localStorage.getItem("cliApp")))
      this.$router.push({ name : 'registro-voucher'})
    }
  },
  computed: {
    ...mapState('user',['data']),
  },
  methods: {
    ...mapMutations('token',['setTokenStoreData']),
    ...mapMutations('user',['setUserStoreData']),

    ...mapMutations('clientAplication',['setTokenCliAppStoreData']),
  }
}
</script>
