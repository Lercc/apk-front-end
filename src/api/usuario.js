import axios from 'axios';
import store from '@/store';

const API_URL = store.state.api.url;
const TOKEN = store.state.token.token


function storeUser(pFormData) {
    const REQUEST = `api/users`
    const headers = { Authorization : `Bearer ${TOKEN}`}
    return axios.post(`${API_URL}/${REQUEST}`, pFormData, { headers })
}

function getUser(pUserId) {
    const REQUEST = `api/users/${pUserId}`
    const headers = { Authorization : `Bearer ${TOKEN}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

function getUsers(pPage) {
    const REQUEST = `api/users?page=${pPage}`
    const headers = { Authorization : `Bearer ${TOKEN}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

function updateUser(pUserId, pFormData) {
    const REQUEST = `api/users/${pUserId}`
    const headers = { 
        "Content-Type":"application/json",
        Authorization   : `Bearer ${TOKEN}`,
    }
    return axios.post(`${API_URL}/${REQUEST}`,pFormData, { headers })
}

function destroyUser(pUserId) {
    const REQUEST = `api/users/${pUserId}`
    const headers = { Authorization : `Bearer ${TOKEN}`}
    return axios.delete(`${API_URL}/${REQUEST}`, { headers })
}

export { storeUser, getUser, getUsers, updateUser, destroyUser}