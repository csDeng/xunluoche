"use strict";
const Redis = require('ioredis');
const config = require('./redis.config')
const { parentPort } = require('worker_threads')
const redis = new Redis(config);

redis.on('error',(e)=>{
    console.error('connect redis error\r\n',e)
})
redis.on('close',()=>{
    console.info('redis is closed')
})

// console.log(parentPort.postMessage('hahha'))

function getP(){
    redis.get('People').then(r=>{
        if(!r){
            getG(r)
        }
    },e=>{
        console.error(e)
    })
}
function getG(person){
    redis.get('GPS').then(r=>{
        console.log('g=\r\n',r)
        parentPort.postMessage({person,r})
    },e=>{
        console.error(e)
    })
}

console.log(this)
// 3s请求一次数据库
setInterval(()=>{
    getP()
}, 15000)
