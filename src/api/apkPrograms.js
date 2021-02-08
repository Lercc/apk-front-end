import axios from 'axios';
import store from '@/store'

const API_URL = store.state.api.url;
const TOKEN = store.state.token.token

// function getClient(pClientId) {
//     const REQUEST = `api/clients/${pClientId}`
//     const headers = { Authorization : `Bearer ${TOKEN}`}
//     return axios.get(`${API_URL}/${REQUEST}`, { headers })
// }

function getApkPrograms(pPage=1) {
    const REQUEST = `api/programs?page=${pPage}`
    const headers = { Authorization : `Bearer ${TOKEN}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

// function getClientProgramsData(pClientId) {
//     const REQUEST = `api/clients/${pClientId}/clientPrograms`
//     const headers = { Authorization : `Bearer ${TOKEN}`}
//     return axios.get(`${API_URL}/${REQUEST}`, { headers })
// }

export {  getApkPrograms  }


// 1|ITycc3P54D1ZyYPXhC9KtwjO24Ug2ACOmTDSOTOy