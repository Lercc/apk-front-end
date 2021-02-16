import axios from 'axios';
import store from '@/store';

const API_URL = store.state.api.url;
// const TOKEN = store.state.token.token


function getInstitution(pInstitutionId) {
    const REQUEST = `api/institutions/${pInstitutionId}`
    const headers = { Authorization : `Bearer ${store.state.token.token}`}

    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

function getAllActiveInstitutions () {
    const REQUEST = `api/all/active/institutions`
    const headers = { Authorization : `Bearer ${store.state.token.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}
function getAllActiveInstitutionsWithoutAuth () {
    const REQUEST = `api/all/active/institutions/without`
    return axios.get(`${API_URL}/${REQUEST}`)
}

function getInstitutions (pPage=1) {
    const REQUEST = `api/institutions?page=${pPage}`
    const headers = { Authorization : `Bearer ${store.state.token.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}


function updateInstitutionState (pInstitutionId, pFormData) {
    const REQUEST = `api/updateState/institutions/${pInstitutionId}`
    const headers = { 
        "Content-Type":"application/json",
        Authorization   : `Bearer ${store.state.token.token}`,
    }
    return axios.post(`${API_URL}/${REQUEST}`,pFormData, { headers })
}

function storeInstitution(pFormData) {
    const REQUEST = `api/institutions`
    const headers = { Authorization : `Bearer ${store.state.token.token}`}
    return axios.post(`${API_URL}/${REQUEST}`, pFormData, { headers })
}

function updateInstitution(pInstitutionId, pFormData) {
    const REQUEST = `api/institutions/${pInstitutionId}`
    const headers = { 
        "Content-Type":"application/json",
        Authorization   : `Bearer ${store.state.token.token}`,
    }
    return axios.post(`${API_URL}/${REQUEST}`,pFormData, { headers })
}


export { 
    getInstitution, 
    getAllActiveInstitutions,
    getAllActiveInstitutionsWithoutAuth,
    getInstitutions ,
    updateInstitutionState ,
    storeInstitution,
    updateInstitution
}