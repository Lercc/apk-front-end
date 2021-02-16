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
    }
  },
  methods: {
    ...mapMutations('token',['setTokenStoreData']),
    ...mapMutations('user',['setUserStoreData']),
  }
}
</script>
