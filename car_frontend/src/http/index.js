"use strict"; 
import axios from 'axios';
import vm from '../main';
const instance = axios.create({
    baseURL:'/api',
    timeout: 5000,
    headers:{'Content-Type':'application/json; charset=utf-8'}
})

instance.interceptors.request.use( async config=>{
    config.headers.responseType = 'json';
    const token = window.localStorage.getItem('token')
    // console.log('reqToken=',token)
    config.headers['AUTHORIZATION'] = token
    return config;
})

instance.interceptors.response.use( 
    response=>{
        // console.log('response',response)
        const { StatusCode } = response.data 
        if(StatusCode!==200){
            vm.$message.info('鉴权失败请重新登录').then(()=>{
                vm.$router.push('/Login')
            })
        }
        return Promise.resolve(response)
    },
    error=>{
        return Promise.reject(error)
    }
)

export default instance;