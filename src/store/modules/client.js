export default  {
    namespaced: true,
    state: {
        data: {},
        type: 'client'
    },
    mutations: {
        setClientStoreData(state, payload) {
            state.data = payload
        }
    }
    
};