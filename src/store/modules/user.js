export default  {
    namespaced: true,
    state: {
        data: {},
        type: 'user'
    },
    mutations: {
        setUserStoreData(state, payload) {
            state.data = payload

            localStorage.setItem('usuario',JSON.stringify(payload))
        },
        clearUserStoreData(state, payload) {
            state.data = payload

            localStorage.removeItem("usuario");
        }
    }
    
};