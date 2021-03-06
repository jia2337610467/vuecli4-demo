import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import filters from './filters/index'
import wechat from '@/common/wechat/index'
import 'amfe-flexible';
// 挂载 jsBridge
import { callhandler } from './util/bridge'
Vue.prototype.$callhandler = callhandler

Vue.use(wechat);
// 注入全局过滤器
Object.keys(filters).forEach(item => {
    Vue.filter(item, filters[item])
})

// const wx = Vue.wechat;
// wx.config({
//     appId: '',
//     nonceStr: '',
//     signature: '',
//     timestamp: '',
//     jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
// })

Vue.config.productionTip = false
Vue.config.devtools = true
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
