import axios from 'axios';
import store from '@/store'

const API_URL = store.state.api.url;
// const TOKEN = store.state.token.token

function getClient(pClientId) {
    const REQUEST = `api/clients/${pClientId}`
    const headers = { Authorization : `Bearer ${store.state.token.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

function getClients(pPage=1) {
    const REQUEST = `api/clients?page=${pPage}`
    const headers = { Authorization : `Bearer ${store.state.token.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

function getClientProgramsData(pClientId) {
    const REQUEST = `api/clients/${pClientId}/clientPrograms`
    const headers = { Authorization : `Bearer ${store.state.token.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

function storeClient(pFormData) {
    const REQUEST = `api/clients`
    const headers = { Authorization : `Bearer ${store.state.token.token}`}
    return axios.post(`${API_URL}/${REQUEST}`, pFormData, { headers })
}

function updateClient(pClientId, pFormData) {
    const REQUEST = `api/clients/${pClientId}`
    const headers = { 
        "Content-Type":"application/json",
        Authorization   : `Bearer ${store.state.token.token}`,
    }
    return axios.post(`${API_URL}/${REQUEST}`, pFormData, { headers })
}

function destroyCliente(pClientId) {
    const REQUEST = `api/clients/${pClientId}`
    const headers = { Authorization : `Bearer ${store.state.token.token}`}
    return axios.delete(`${API_URL}/${REQUEST}`, { headers })
}

function buscarLeadDni(pDni) {
    const REQUEST = `api/leads/dni/${pDni}`
    const headers = { Authorization : `Bearer ${store.state.token.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}


export { getClient, getClients, getClientProgramsData, storeClient, updateClient, destroyCliente ,buscarLeadDni }


// 1|ITycc3P54D1ZyYPXhC9KtwjO24Ug2ACOmTDSOTOy