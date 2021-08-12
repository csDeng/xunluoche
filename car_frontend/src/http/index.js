"use strict"; 
import axios from 'axios';
import Vue from '../main';
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
        const code = response.data.StatusCode
        console.log('response',response)
        if( code===401 ){
            Vue.$message.error('鉴权失败，请重新登陆').then(()=>{
                Vue.$router.push('/Login')
            })
            return Promise.reject('鉴权失败')
            
        }
        return Promise.resolve(response)
    },
    error=>{
        return Promise.reject(error)
    }
)

export default instance;