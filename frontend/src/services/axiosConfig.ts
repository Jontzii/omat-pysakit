import axios from 'axios';

const client = axios.create({
    baseURL: 'https://omatpysakit.jontzi.com/api'
});

export default client;
