/**
 * @API getData 调用原生
 * @param {String} type
 * 1. getUserInfo => 获取token和用户名  @return {userName,token}
 * 2. getRealNameStatus => 获取是否实名 @return {type}: 0 没有认证 1 认证
 * 3. bindCardSuccess => 绑定成功
 */
// 判断终端
const u = navigator.userAgent
const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
// ios 使用时的初始化方法
const iosFunction = (callback) => {
    if (window.WebViewJavascriptBridge) {
        return callback(window.WebViewJavascriptBridge)
    }
    if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback)
    }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function () {
        document.documentElement.removeChild(WVJBIframe);
    }, 0);
}
// Android 使用时的初始化方法
const androidFunction = (callback) => {
    if (window.WebViewJavascriptBridge) {
        callback(window.WebViewJavascriptBridge);
    } else {
        document.addEventListener('WebViewJavascriptBridgeReady', function () {
            callback(window.WebViewJavascriptBridge);
        }, false)
    }
}

window.setupWebViewJavascriptBridge = isAndroid ? androidFunction : iosFunction

isAndroid && window.setupWebViewJavascriptBridge(function (bridge) {
    // 注册 H5 界面的默认接收函数（与安卓交互时，安卓端可以不调用函数名，直接 send 数据过来，就能够在这里接收到数据）
    bridge.init(function (msg, responseCallback) {
        console.log(msg);
        responseCallback()
    })
})

const callHandlerValue = 'getData' // 调用原生方法名
const callHandlerRouter = 'operationModel'
const registerHandlerValue = 'dataFrom' // 原生调用js
// H5 调用原生
export const callhandler = (method, callback) => {
    window.setupWebViewJavascriptBridge((bridge) => {
        bridge.callHandler(callHandlerValue, {
            method: method // 根据 type 调用原生的方法
        }, callback)
    })
}
// H5 调用原生跳转路由
export const routerJump = (Ourl, callback) => {
    window.setupWebViewJavascriptBridge((bridge) => {
        bridge.callHandler(callHandlerRouter, {
            method: 'jumpPage',
            data: {
                url: 'gjrrouter:///' + Ourl
            }
        }, callback)
    })
}
// 原生调用H5 ==> dataFrom
export const registerhandler = (callback) => {
    window.setupWebViewJavascriptBridge((bridge) => {
        bridge.registerHandler(registerHandlerValue, (data, responseCallback) => {
            callback(data, responseCallback)
        })
    })
}
