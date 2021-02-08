/**
 *  VUEX
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// IMPORTAR MODULOS:
import api from './modules/api';
import token from './modules/token';
import client from './modules/client';
// import carreras from './modules/carreras';
// import ciclos from './modules/ciclos';
// import estudiante from './modules/estudiante';
// import temp from './modules/temp';
// import usuario from './modules/usuario';

// REGISTRAR MODULOS:
export default new Vuex.Store({
  
  modules: {
    api,
    token,
    client,
    // carreras,
    // ciclos,
    // estudiante,
    // temp,
    // usuario,
  }
});