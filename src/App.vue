<template>
  <div id="app">
    <notifications></notifications>
    <router-view/>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';
export default {
  created() {
    if (localStorage.getItem("token") && JSON.parse(localStorage.getItem("usuario"))) {

        this.setTokenStoreData(localStorage.getItem("token"))
        this.setUserStoreData( JSON.parse( localStorage.getItem("usuario") ) )
        this.$router.push({ name : 'inicio'})

    } else if (JSON.parse(localStorage.getItem("cliApp"))) {

      this.setTokenCliAppStoreData(JSON.parse(localStorage.getItem("cliApp")))
      this.$router.push({ name : 'registro-voucher'})
      
    }
  },
  methods: {
    ...mapMutations('token',['setTokenStoreData']),
    ...mapMutations('user',['setUserStoreData']),

    ...mapMutations('clientAplication',['setTokenCliAppStoreData']),
  }
}
</script>
