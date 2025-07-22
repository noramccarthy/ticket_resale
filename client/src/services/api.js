import axios from 'axios';

const api = axios.create({
    baseURL: 'http://3.148.106.111/api',
    // withCredentials: true,
});

export default api;


