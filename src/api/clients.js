import axios from 'axios';
import store from '@/store'

const API_URL = store.state.api.url;
const TOKEN = store.state.token.token

function getClients() {
    const REQUEST = `api/clients`
    const headers = { Authorization : `Bearer ${TOKEN}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

export { getClients }


// 1|ITycc3P54D1ZyYPXhC9KtwjO24Ug2ACOmTDSOTOy