import axios from 'axios';
import store from '@/store'

const API_URL = store.state.api.url;
// const TOKEN = store.state.token.token // no sirve crear constastes si no tine scope definido


function logout(pUserId) {
    const REQUEST = `api/logout/${pUserId}`
    const headers = { Authorization : `Bearer ${store.state.token.token}`}
    return axios.post(`${API_URL}/${REQUEST}`, { headers})
}

function storeUser(pFormData) {
    const REQUEST = `api/users`
    const headers = { Authorization : `Bearer ${store.state.token.token}`}
    return axios.post(`${API_URL}/${REQUEST}`, pFormData, { headers })
}

function getUser(pUserId) {
    const REQUEST = `api/users/${pUserId}`
    const headers = { Authorization : `Bearer ${store.state.token.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

function getUsers(pPage=1) {
    const REQUEST = `api/users?page=${pPage}`
    const headers = { 'Authorization' : `Bearer ${store.state.token.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

function updateUser(pUserId, pFormData) {
    const REQUEST = `api/users/${pUserId}`
    const headers = { 
        'content-type' : 'application/json',
        Authorization   : `Bearer ${store.state.token.token}`,
    }
    return axios.post(`${API_URL}/${REQUEST}`,pFormData, { headers })
}

function destroyUser(pUserId) {
    const REQUEST = `api/users/${pUserId}`
    const headers = { Authorization : `Bearer ${store.state.token.token}`}
    return axios.delete(`${API_URL}/${REQUEST}`, { headers })
}

function login(pFormData) {
    const REQUEST = `api/login`
    return axios.post(`${API_URL}/${REQUEST}`, pFormData)
}

function clientLogin(pFormData) {
    const REQUEST = `api/login/client`
    return axios.post(`${API_URL}/${REQUEST}`, pFormData)
}

export {  logout, storeUser, getUser, getUsers, updateUser, destroyUser, login, clientLogin}