import axios from 'axios';
import store from '@/store'

const API_URL = store.state.api.url;
// const TOKEN = store.state.token.token

function getVouchersProgramData(pClientId) {
    const REQUEST = `api/clientPrograms/${pClientId}/vouchers`
    const headers = { Authorization : `Bearer ${store.state.token.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

function storeClientProgram(pFormData) {
    const REQUEST = `api/clientPrograms`
    const headers = { Authorization : `Bearer ${store.state.token.token}`}
    return axios.post(`${API_URL}/${REQUEST}`,pFormData, { headers })
}

function destroyClientProgram(pClientProgramId) {
    const REQUEST = `api/clientPrograms/${pClientProgramId}`
    const headers = { Authorization : `Bearer ${store.state.token.token}`}
    return axios.delete(`${API_URL}/${REQUEST}`, { headers })
}


export { getVouchersProgramData, storeClientProgram, destroyClientProgram }
