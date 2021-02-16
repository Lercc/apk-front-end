import axios from 'axios';
import store from '@/store'

const API_URL = store.state.api.url;
// const TOKEN = store.state.token.token


function getShowLead(pLeadId) {
    const REQUEST = `api/leads/show/${pLeadId}`
    const headers = { Authorization : `Bearer ${store.state.token.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

function getLeadsCalificados(pPage=1) {
    const REQUEST = `api/leads/calificados?page=${pPage}`
    const headers = { Authorization : `Bearer ${store.state.token.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

/** perfils aceptados-pipeline todos, enviados y no enviados*/
function getLeadsPerfilesAceptados(pPage=1) {
    const REQUEST = `api/leads/perfiles-aceptados?page=${pPage}`
    const headers = { Authorization : `Bearer ${store.state.token.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}
function getLeadsPerfilesAceptadosEnviado(pPage=1) {
    const REQUEST = `api/leads/perfiles-aceptados-enviado?page=${pPage}`
    const headers = { Authorization : `Bearer ${store.state.token.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}
function getLeadsPerfilesAceptadosNoEnviado(pPage=1) {
    const REQUEST = `api/leads/perfiles-aceptados-noenviado?page=${pPage}`
    const headers = { Authorization : `Bearer ${store.state.token.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

function updatePipeline(pLeadId, pPipeline) {
    const REQUEST = `api/leads/${pLeadId}/${pPipeline}/updatepipeline`
    const headers = { Authorization : `Bearer ${store.state.token.token}`}
    return axios.put(`${API_URL}/${REQUEST}`, { headers })
}

/** */

function getLeadsIngles(pPage=1) {
    const REQUEST = `api/leads/ingles?page=${pPage}`
    const headers = { Authorization : `Bearer ${store.state.token.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

function getLeadsEdad(pPage=1) {
    const REQUEST = `api/leads/edad?page=${pPage}`
    const headers = { Authorization : `Bearer ${store.state.token.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

// updates
function updateQualifiedTable(pLeadId, pFormData) {
    const REQUEST = `api/leads/${pLeadId}/updateQualifiedTable`
    const headers = { 
        "Content-Type":"application/json",
        Authorization : `Bearer ${store.state.token.token}`
    }
    return axios.post(`${API_URL}/${REQUEST}`, pFormData, { headers })
}

function updateAceptedTable(pLeadId, pFormData) {
    const REQUEST = `api/leads/${pLeadId}/updateAceptedTable`
    const headers = { 
        "Content-Type":"application/json",
        Authorization : `Bearer ${store.state.token.token}`
    }
    return axios.post(`${API_URL}/${REQUEST}`, pFormData, { headers })
}
function updateAgeTable(pLeadId, pFormData) {
    const REQUEST = `api/leads/${pLeadId}/updateAgeTable`
    const headers = { 
        "Content-Type":"application/json",
        Authorization : `Bearer ${store.state.token.token}`
    }
    return axios.post(`${API_URL}/${REQUEST}`, pFormData, { headers })
}
function updateEnglishTable(pLeadId, pFormData) {
    const REQUEST = `api/leads/${pLeadId}/updateEnglishTable`
    const headers = { 
        "Content-Type":"application/json",
        Authorization : `Bearer ${store.state.token.token}`
    }
    return axios.post(`${API_URL}/${REQUEST}`, pFormData, { headers })
}


// 
function updateLead(pLeadId, pFormData) {
    const REQUEST = `api/leads/${pLeadId}/update`
    const headers = { 
        "Content-Type":"application/json",
        Authorization : `Bearer ${store.state.token.token}`
    }
    return axios.post(`${API_URL}/${REQUEST}`, pFormData, { headers })
}

// 
function destroyLead(pLeadId) {
    const REQUEST = `api/leads/${pLeadId}`
    const headers = { Authorization : `Bearer ${store.state.token.token}`}
    return axios.delete(`${API_URL}/${REQUEST}`, { headers })
}

//
function createLead(pFormData) {
    const REQUEST = `api/leads/store`
    const headers = { Authorization : `Bearer ${store.state.token.token}`}
    return axios.post(`${API_URL}/${REQUEST}`, pFormData, { headers })
}
function createLeadWithoutAuth(pFormData) {
    const REQUEST = `api/leads/store/without`
    return axios.post(`${API_URL}/${REQUEST}`, pFormData)
}

export {
    getShowLead,
    getLeadsCalificados,
    getLeadsPerfilesAceptados,
    getLeadsPerfilesAceptadosEnviado,
    getLeadsPerfilesAceptadosNoEnviado,
    updatePipeline,
    getLeadsIngles,
    getLeadsEdad,
    updateEnglishTable, 
    updateAgeTable, 
    updateAceptedTable, 
    updateQualifiedTable,
    updateLead,
    destroyLead,
    createLead,
    createLeadWithoutAuth
}
