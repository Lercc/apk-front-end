import axios from 'axios';
import store from '@/store';

const API_URL = store.state.api.url;
const TOKEN = store.state.token.token


function getCareers() {
    const REQUEST = `api/careers`
    const headers = { Authorization : `Bearer ${TOKEN}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

function getAllCareers() {
    const REQUEST = `api/all/careers`
    const headers = { Authorization : `Bearer ${TOKEN}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

export { getCareers, getAllCareers }