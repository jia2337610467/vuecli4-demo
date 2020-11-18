import axios from 'axios'
import qs from 'qs'
import store from 'store/index'
import { Toast } from 'vant'

axios.create({
    baseURL: process.env.VUE_APP_BASE_URL, // 基础地址
    timeout: 12000 // 请求超时时间
});

// post请求头的设置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 请求拦截器
axios.interceptors.request.use(
    config => {
        // 可在此设置要发送的token
        let token = store.getters['login/token'];
        token && (config.headers.token = token)
        return config
    },
    error => {
        return Promise.error(error)
    }
)

// 回调拦截器
axios.interceptors.response.use(
    response => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误 结合自身业务和后台返回的接口状态约定写respone拦截器
        if (response.status === 200 && response.data.code === 0) {
            return Promise.resolve(response)
        } else {
            Toast({
                message: response.data.msg,
                position: 'bottom',
                duration: 2000
            });
            return Promise.reject(response)
        }
    },
    error => {
        const responseCode = error.response.status
        switch (responseCode) {
            // 401：未登录
            case 401:
                break
            // 404请求不存在
            case 404:
                Toast({
                    message: '网络请求不存在',
                    position: 'bottom',
                    duration: 2000
                });
                break
            default:
                Toast({
                    message: error.response.data.message,
                    position: 'bottom',
                    duration: 2000
                });
        }

        return Promise.reject(error.response)
    }
)

/**
 * 封装get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function get (url, params = {}) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                params: params
            })
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err)
            })
    })
    // 或者return axios.get();
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function post (url, params, userToken) {
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(params), { headers: { token: userToken } })
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err)
            })
    })
    //  或者return axios.post();
}

export { get, post }
