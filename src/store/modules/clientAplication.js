export default  {
    namespaced: true,
    state: {
        id:'',
        role:'',
        cliAppToken: ''
    },
    mutations: {
        setTokenCliAppStoreData(state, payload) {
            state.id = payload.id
            state.role = payload.role
            state.cliAppToken = payload.cliAppToken

            localStorage.setItem('cliApp',JSON.stringify(payload))


        },
        clearTokenCliAppStoreData(state) {
            state.id = ''
            state.role = ''
            state.cliAppToken = ''

            localStorage.removeItem("cliApp");

        },
    }
};