import axios from 'axios';
import store from '@/store'

// import qs from 'qs'

const API_URL = store.state.api.url;
// const TOKEN = store.state.token.token

function storeVoucherClientProgram(pFormData) {
    const REQUEST = `api/vouchers`
    const headers = { Authorization : `Bearer ${store.state.token.token}`}
    return axios.post(`${API_URL}/${REQUEST}`,pFormData, { headers })
}

function destroyVoucher(pVoucherId) {
    const REQUEST = `api/vouchers/${pVoucherId}`
    const headers = { Authorization : `Bearer ${store.state.token.token}`}
    return axios.delete(`${API_URL}/${REQUEST}`, { headers })
}

function getVoucher(pVoucherId) {
    const REQUEST = `api/vouchers/${pVoucherId}`
    const headers = { Authorization : `Bearer ${store.state.token.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

function updateVoucher(pVoucherId, pFormData) {
    const REQUEST = `api/vouchers/${pVoucherId}`
    // const data = qs.stringify(pFormData)
    // const data = pFormData
    const headers = { 
        "Content-Type":"application/json",
        Authorization   : `Bearer ${store.state.token.token}`,
    }
    return axios.post(`${API_URL}/${REQUEST}`, pFormData, { headers })
}



export { storeVoucherClientProgram, destroyVoucher, getVoucher, updateVoucher }
