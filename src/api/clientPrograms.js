import axios from 'axios';
import store from '@/store'

const API_URL = store.state.api.url;
const TOKEN = store.state.token.token

function getVouchersProgramData(pClientId) {
    const REQUEST = `api/clientPrograms/${pClientId}/vouchers`
    const headers = { Authorization : `Bearer ${TOKEN}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

function storeClientProgram(pFormData) {
    const REQUEST = `api/clientPrograms`
    const headers = { Authorization : `Bearer ${TOKEN}`}
    return axios.post(`${API_URL}/${REQUEST}`,pFormData, { headers })
}

export { getVouchersProgramData, storeClientProgram }
