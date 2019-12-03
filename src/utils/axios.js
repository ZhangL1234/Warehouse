import axios from 'axios'

// 创建axios实例
const service = axios.create({
    baseURL:  'http://60.215.124.164:8082/',
    timeout: 15000, // 请求超时时间
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    }
});

const requestSuccessFunc = function (requestObj) {
    let token = localStorage.getItem('token')
    if (token) {
        requestObj.headers['token'] = token
    }
    return requestObj
};

const requestFailFunc = function (requestError){
    return Promise.reject(requestError)
};

const responseSuccessFunc = function (responseObj){
    // 自定义响应成功逻辑，全局拦截接口，根据不同业务做不同处理，响应成功监控等
    let resData = responseObj.data
    switch (resData.code) {
        case 1: // 如果业务成功，直接进成功回调console.info(resData.body)
            return resData;
        case 0:
            // Element.Message.error(resData.msg)
            return false;
        case 2:
            // 操作成功，仅通知
            return resData;
        default:
            return Promise.reject(resData)
    }
};

const responseFailFunc = function(responseError){
    return Promise.reject(responseError)
};

service.interceptors.request.use(requestSuccessFunc,requestFailFunc);

service.interceptors.response.use(responseSuccessFunc,responseFailFunc);

export default service
