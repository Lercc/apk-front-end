export default  {
    namespaced: true,
    state: {
        token: ''
    },
    mutations: {
        setTokenStoreData(state, payload) {
            state.token = payload

            localStorage.setItem('token', payload)
        },
        clearTokenStoreData(state, payload) {
            state.token = payload

            localStorage.removeItem("token");
        },
    }
};