import axios from 'axios';
import store from '@/store'

const API_URL = store.state.api.url;

function login(pEmail, pPassword ) {
    const REQUEST = `api/login`

    const BODY = new FormData;
    BODY.append('email',pEmail);
    BODY.append('password',pPassword);
    BODY.append('token_name','admin');

    return axios.post(`${API_URL}/${REQUEST}`, BODY);
}

export { login }


// 1|ITycc3P54D1ZyYPXhC9KtwjO24Ug2ACOmTDSOTOy