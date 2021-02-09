import axios from 'axios';

import store from '@/store'

const API_URL = store.state.api.url;
const TOKEN = store.state.token.token

function storeVoucherClientProgram(pFormData) {
    const REQUEST = `api/vouchers`
    const headers = { Authorization : `Bearer ${TOKEN}`}
    return axios.post(`${API_URL}/${REQUEST}`,pFormData, { headers })
}

function destroyVoucher(pVoucherId) {
    const REQUEST = `api/vouchers/${pVoucherId}`
    const headers = { Authorization : `Bearer ${TOKEN}`}
    return axios.delete(`${API_URL}/${REQUEST}`, { headers })
}



export { storeVoucherClientProgram, destroyVoucher }
