"use strict";
const server = require('http').createServer();
const io = require('socket.io')(server, { cors: true });
const { Worker } = require('worker_threads')
const worker = new Worker('./worker.js')

worker.once('message', (message) => {
    console.log(message);  // 打印 'Hello, world!'。
});

let socket = null
io.on('connection', client => {
    socket = client
    bindEvent()  
});


function bindEvent(){
    // console.log('socket=\r\n',socket)
    if(socket){
        // client.on 监听客户端emit事件
        socket.on('event', data => { 
            console.log('event\r\n', data)
        });
        socket.on('disconnect', () => {
            console.log('client is disconnected\r\n')
        });
        socket.on('hello',(data)=>{
            console.log("hello事件被触发，收到数据",data)
        })
        socket.on('text',(data)=>{
            console.log('text事件被触发',data)
        })
        worker.once('message', (message) => {
            console.log(message);  // 打印 'Hello, world!'。
            socket.emit('person',message)
        });
    }  
}

server.listen(3000)
console.log('server is running at :\r\n http://127.0.0.1:3000')
