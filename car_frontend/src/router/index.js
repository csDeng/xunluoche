import Vue from 'vue'
import vueRouter from 'vue-router'

Vue.use(vueRouter)

export default new vueRouter({
    mode:'hash',
    routes:[
        {
            path:'/Login',
            component: ()=>import('~/views/Login'),
            meta:{
                showMenu:false
            }
        },
        {
            path:'/Register',
            component: ()=>import('~/views/Register'),
            meta: {
                showMenu:false
            }
        },
        {
            path:'/Home',
            component: ()=>import('~/views/Home'),
            meta:{
                showMenu:true
            }
        },
        {
            path:'/History',
            component: ()=>import('~/views/history'),
            meta:{
                showMenu:true
            }
        },
        {
            path:'/Video',
            component: ()=>import('~/views/video'),
            meta:{
                showMenu:true
            }
        },
        {
            path:'/Device',
            component: ()=>import('~/views/device'),
            meta:{
                showMenu:true
            }
        },
        {
            path:'/',
            redirect:'/Login'
        }
    ]
})