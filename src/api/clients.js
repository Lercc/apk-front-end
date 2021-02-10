import axios from 'axios';
import store from '@/store'

const API_URL = store.state.api.url;
const TOKEN = store.state.token.token

function getClient(pClientId) {
    const REQUEST = `api/clients/${pClientId}`
    const headers = { Authorization : `Bearer ${TOKEN}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

function getClients(pPage=1) {
    const REQUEST = `api/clients?page=${pPage}`
    const headers = { Authorization : `Bearer ${TOKEN}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

function getClientProgramsData(pClientId) {
    const REQUEST = `api/clients/${pClientId}/clientPrograms`
    const headers = { Authorization : `Bearer ${TOKEN}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

function storeClient(pFormData) {
    const REQUEST = `api/clients`
    const headers = { Authorization : `Bearer ${TOKEN}`}
    return axios.post(`${API_URL}/${REQUEST}`, pFormData, { headers })
}

export { getClient, getClients, getClientProgramsData, storeClient }


// 1|ITycc3P54D1ZyYPXhC9KtwjO24Ug2ACOmTDSOTOy