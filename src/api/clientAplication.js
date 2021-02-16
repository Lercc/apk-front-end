import axios from 'axios';
import store from '@/store'

const API_URL = store.state.api.url;
// const TOKEN = store.state.token.token

function getVouchersProgramData(pClientId) {
    const REQUEST = `api/clientPrograms/${pClientId}/vouchers`
    const headers = { Authorization : `Bearer ${store.state.clientAplication.cliAppToken}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

function getClient(pClientId) {
    const REQUEST = `api/clients/${pClientId}`
    const headers = { Authorization : `Bearer ${store.state.clientAplication.cliAppToken}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

function getClientProgramsData(pClientId) {
    const REQUEST = `api/clients/${pClientId}/clientPrograms`
    const headers = { Authorization : `Bearer ${store.state.clientAplication.cliAppToken}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

function storeVoucherClientProgram(pFormData) {
    const REQUEST = `api/vouchers`
    const headers = { Authorization : `Bearer ${store.state.clientAplication.cliAppToken}`}
    return axios.post(`${API_URL}/${REQUEST}`,pFormData, { headers })
}

export { getVouchersProgramData, getClient, getClientProgramsData , storeVoucherClientProgram}
