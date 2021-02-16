import axios from 'axios';
import store from '@/store'

const API_URL = store.state.api.url;
// const TOKEN = store.state.token.token

function getProgram(pProgramId) {
    const REQUEST = `api/programs/${pProgramId}`
    const headers = { Authorization : `Bearer ${store.state.token.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

function getApkPrograms(pPage=1) {
    const REQUEST = `api/programs?page=${pPage}`
    const headers = { Authorization : `Bearer ${store.state.token.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

function getAllActivePrograms() {
    const REQUEST = `api/all/active/programs`
    const headers = { Authorization : `Bearer ${store.state.token.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}
function getAllActiveProgramsWithoutAuth() {
    const REQUEST = `api/all/active/programs/without`
    return axios.get(`${API_URL}/${REQUEST}`)
}

function updateProgram(pProgramId, pFormdata){
    const REQUEST = `api/programs/${pProgramId}`
    const headers = {
        'content-type' : 'application/json',
        Authorization : `Bearer ${store.state.token.token}`
    }
    return axios.post(`${API_URL}/${REQUEST}`,pFormdata, { headers })
}

function updateProgramState(pProgramId, pFormdata){
    const REQUEST = `api/updateState/programs/${pProgramId}`
    const headers = {
        'content-type' : 'application/json',
        Authorization : `Bearer ${store.state.token.token}`
    }
    return axios.post(`${API_URL}/${REQUEST}`,pFormdata, { headers })
}

function storeProgram(pFormdata){
    const REQUEST = `api/programs`
    const headers = {
        'content-type' : 'application/json',
        Authorization : `Bearer ${store.state.token.token}`
    }
    return axios.post(`${API_URL}/${REQUEST}`,pFormdata, { headers })
}

export {  
    getProgram,
    getApkPrograms,
    getAllActivePrograms,
    getAllActiveProgramsWithoutAuth,
    updateProgramState,
    updateProgram,
    storeProgram
}