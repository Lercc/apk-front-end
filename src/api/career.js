import axios from 'axios';
import store from '@/store';

const API_URL = store.state.api.url;
const TOKEN = store.state.token.token


function storeCareer(pFormData) {
    const REQUEST = `api/careers`
    const headers = { Authorization : `Bearer ${TOKEN}`}
    return axios.post(`${API_URL}/${REQUEST}`, pFormData, { headers })
}

function getCareer(CareerRequest) {
    const REQUEST = `api/careers/${CareerRequest}`
    const headers = { Authorization : `Bearer ${TOKEN}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

function getCareers(pPage) {
    const REQUEST = `api/careers?page=${pPage}`
    const headers = { Authorization : `Bearer ${TOKEN}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

function getAllCareers() {
    const REQUEST = `api/all/careers`
    const headers = { Authorization : `Bearer ${TOKEN}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}
function getAllActiveCareers() {
    const REQUEST = `api/all/active/careers`
    const headers = { Authorization : `Bearer ${TOKEN}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}


function updateCareerState(pCareerId, pFormData) {
    const REQUEST = `api/updateState/careers/${pCareerId}`
    const headers = { 
        "Content-Type":"application/json",
        Authorization   : `Bearer ${TOKEN}`,
    }
    return axios.post(`${API_URL}/${REQUEST}`,pFormData, { headers })
}


function updateCareer(pCareerId, pFormData) {
    const REQUEST = `api/careers/${pCareerId}`
    const headers = { 
        "Content-Type":"application/json",
        Authorization   : `Bearer ${TOKEN}`,
    }
    return axios.post(`${API_URL}/${REQUEST}`,pFormData, { headers })
}


export { storeCareer, getCareer, getCareers, getAllCareers, getAllActiveCareers, updateCareerState, updateCareer }