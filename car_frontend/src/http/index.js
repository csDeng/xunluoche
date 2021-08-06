"use strict"; 
import axios from 'axios';

const instance = axios.create({
    baseURL:'/api',
    timeout: 5000,
    headers:{'Content-Type':'application/json; charset=utf-8'}
})

instance.interceptors.request.use( async config=>{
    config.headers.responseType = 'json';
    return config;
})

instance.interceptors.response.use( 
    response=>{
        return Promise.resolve(response)
    },
    error=>{
        return Promise.reject(error)
    }
)

export default instance;