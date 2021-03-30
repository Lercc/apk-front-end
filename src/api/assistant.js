import axios from 'axios';
import store from '@/store'

const API_URL = store.state.api.url;
// const TOKEN = store.state.token.token

function getAssistants(pPage=1) {
    const REQUEST = `api/assistants?page=${pPage}`
    const headers = { Authorization : `Bearer ${store.state.token.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

function storeAssistant(pFormdata){
    const REQUEST = `api/assistant/store`
    const headers = {
        'content-type' : 'application/json',
        Authorization : `Bearer ${store.state.token.token}`
    }
    return axios.post(`${API_URL}/${REQUEST}`,pFormdata, { headers })
}

function destroyAssistant(pAssistantId){
    const REQUEST = `api/assistants/${pAssistantId}`
    const headers = {
        'content-type' : 'application/json',
        Authorization : `Bearer ${store.state.token.token}`
    }
    return axios.delete(`${API_URL}/${REQUEST}`, { headers })
}

// function updateProgram(pProgramId, pFormdata){
//     const REQUEST = `api/programs/${pProgramId}`
//     const headers = {
//         'content-type' : 'application/json',
//         Authorization : `Bearer ${store.state.token.token}`
//     }
//     return axios.post(`${API_URL}/${REQUEST}`,pFormdata, { headers })
// }


export {
    getAssistants,
    storeAssistant,
    destroyAssistant,
    // updateProgram,
}