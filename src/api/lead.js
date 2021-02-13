import axios from 'axios';
import store from '@/store'

const API_URL = store.state.api.url;
const TOKEN = store.state.token.token


function getShowLead(pLeadId) {
    const REQUEST = `api/leads/show/${pLeadId}`
    const headers = { Authorization : `Bearer ${TOKEN}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

function getLeadsCalificados(pPage=1) {
    const REQUEST = `api/leads/calificados?page=${pPage}`
    const headers = { Authorization : `Bearer ${TOKEN}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

function getLeadsPerfilesAceptados(pPage=1) {
    const REQUEST = `api/leads/perfiles-aceptados?page=${pPage}`
    const headers = { Authorization : `Bearer ${TOKEN}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

// updates
function updateQualifiedTable(pLeadId, pFormData) {
    const REQUEST = `api/leads/${pLeadId}/updateQualifiedTable`
    const headers = { 
        "Content-Type":"application/json",
        Authorization : `Bearer ${TOKEN}`
    }
    return axios.post(`${API_URL}/${REQUEST}`, pFormData, { headers })
}
function updateAceptedTable(pLeadId, pFormData) {
    const REQUEST = `api/leads/${pLeadId}/updateAceptedTable`
    const headers = { 
        "Content-Type":"application/json",
        Authorization : `Bearer ${TOKEN}`
    }
    return axios.post(`${API_URL}/${REQUEST}`, pFormData, { headers })
}
function updateAgeTable(pLeadId, pFormData) {
    const REQUEST = `api/leads/${pLeadId}/updateAgeTable`
    const headers = { 
        "Content-Type":"application/json",
        Authorization : `Bearer ${TOKEN}`
    }
    return axios.post(`${API_URL}/${REQUEST}`, pFormData, { headers })
}
function updateEnglishTable(pLeadId, pFormData) {
    const REQUEST = `api/leads/${pLeadId}/updateEnglishTable`
    const headers = { 
        "Content-Type":"application/json",
        Authorization : `Bearer ${TOKEN}`
    }
    return axios.post(`${API_URL}/${REQUEST}`, pFormData, { headers })
}


// 
function updateLead(pLeadId, pFormData) {
    const REQUEST = `api/leads/${pLeadId}/update`
    const headers = { 
        "Content-Type":"application/json",
        Authorization : `Bearer ${TOKEN}`
    }
    return axios.post(`${API_URL}/${REQUEST}`, pFormData, { headers })
}

// 
function destroyLead(pLeadId) {
    const REQUEST = `api/leads/${pLeadId}`
    const headers = { Authorization : `Bearer ${TOKEN}`}
    return axios.delete(`${API_URL}/${REQUEST}`, { headers })
}

//
function createLead(pFormData) {
    const REQUEST = `api/leads/store`
    const headers = { Authorization : `Bearer ${TOKEN}`}
    return axios.post(`${API_URL}/${REQUEST}`, pFormData, { headers })
}

export {
    getShowLead,
    getLeadsCalificados, 
    getLeadsPerfilesAceptados, 
    updateEnglishTable, 
    updateAgeTable, 
    updateAceptedTable, 
    updateQualifiedTable,
    updateLead,
    destroyLead,
    createLead
}
