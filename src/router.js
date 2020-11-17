import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from 'store/index'

import { setToken, setId, setUser } from '@/util/jsCookie'
import { checkUserRegiste, checkUserLogin } from '@/api/login'
import { callhandler } from './util/bridge'
import { storage } from './util/storage'

Vue.use(Router)
const router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                auth: true, // 是否需要登录
                keepAlive: true // 是否缓存组件
            }
        },
        {
            path: '/about',
            name: 'about',
            component: () =>
                import(/* webpackChunkName: "about" */ './views/About.vue'),
            meta: {
                auth: true,
                keepAlive: true
            }
        },
        {
            path: '/login',
            name: 'login',
            component: () =>
                import(/* webpackChunkName: "login" */ './views/login.vue'),
            meta: {
                auth: false,
                keepAlive: true
            }
        },
        {
            path: '*', // 未匹配到路由时重定向
            redirect: '/',
            meta: {
                // auth: true,
                // keepAlive: true
            }
        }
    ]
})

// 记录页面跳转历史，以此判断页面左滑跳转还是右滑跳转
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

// 全局路由钩子函数 对全局有效
router.beforeEach((to, from, next) => {
    let token = store.getters['login/token'];
    // 当跳转时携带指定方向参数则优先使用指定参数
    if (to.params.direction) {
        store.commit('updateDirection', to.params.direction)
    } else {
        const toIndex = history.getItem(to.path)
        const fromIndex = history.getItem(from.path)
        // 判断并记录跳转页面是否访问过，以此判断跳转过渡方式
        if (toIndex) {
            if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
                store.commit('updateDirection', 'forward')
            } else {
                store.commit('updateDirection', 'back')
            }
        } else {
            ++historyCount
            history.setItem('count', historyCount)
            to.path !== '/' && history.setItem(to.path, historyCount)
            store.commit('updateDirection', 'forward')
        }
    }

    if (token) {
        if (to.name === 'login') { next({ path: '/' }) } else next()
    } else {
        if (to.name !== 'login') {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            })
        } else {
            next()
        }

        callhandler('getUserInfo', (res) => {
            const resData = JSON.parse(res);
            setUser(res)
            checkUserRegiste(resData.mobile, resData.token).then(res => {
                if (res.data === false) {
                    // 未注册
                    if (to.name === 'login') {
                        next()
                    } else {
                        storage.set('pathName', to.name)
                        storage.set('pathQuery', to.query)
                        next({
                            path: '/login',
                            query: {
                                redirect: to.fullPath
                            }
                        })
                    }
                } else {
                    // 已注册
                    checkUserLogin(resData.mobile, resData.userName, resData.token).then(e => {
                        if (e.code === 0) {
                            setId(e.data.id);
                            setToken(e.data.token)
                            store.dispatch('login', { id: e.data.id, token: e.data.token, user: resData })
                            if (to.name === 'login') {
                                next({ path: '/' })
                            } else {
                                next()
                            }
                        }
                    })
                }
            })
        })
    }
})

export default router
