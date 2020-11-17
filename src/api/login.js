import { post } from '@/axios/http.js'

// 验证是否注册
export const checkUserRegiste = function (mobile, userToken) {
    return new Promise(function (resolve, reject) {
        post('/user/user/check', { mobile }, userToken).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

// 注册登录
export const checkUserLogin = function (mobile, nickName, userToken) {
    return new Promise(function (resolve, reject) {
        post('/user/user/login', { mobile, nickName }, userToken).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
