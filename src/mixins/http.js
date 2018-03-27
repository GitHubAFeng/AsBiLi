import wepy from 'wepy'
import { domain } from '../config'
import db from '../util/db'


export default class HttpMixin extends wepy.mixin{
    
    GetWithBind(url, params = {}, showToast = true, handler = {}) {
        return this.requestWithBind('GET', url, params, showToast, handler)
    }
    
    PostWithBind(url, params = {}, showToast = true, handler = {}) {
        return this.requestWithBind('POST', url, params, showToast, handler)
    }
    
    //验证登录，用户登录成功后会在cookie设置verify = 1
    async requestWithBind(method, url, params = {}, showToast = true, handler = {}) {
        if (db.Get('verify') === 0) {
            wepy.showModal({
                title: '登录',
                content: '账号或密码错误，是否跳转到登录页面？',
                success: function (res) {
                    if (res.confirm) {
                        wepy.navigateTo({
                            url: '/pages/login'
                        })
                    } else if (res.cancel) {
                        wepy.navigateBack({
                            delta: 1
                        })
                    }
                }
            })
            throw '用户验证失败'
        } else {
            return this.request(method, url, params, showToast, handler)
        }
    }
    
    //请求时带上token ， 而用户token在服务端响应设置在cookie ，后端获取在请求头token判断权限
    request(method, url, params = {}, showToast = true, handler = {}) {
        handler.url = domain + url
        handler.data = params
        handler.header = {
            'Authorization': 'Bearer ' + db.Get('token')
        }
        handler.method = method
        if (method === 'POST') {
            handler.header['content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    
        wepy.showLoading && wepy.showLoading({
            title: '加载中...'
        })
    
        return new Promise((resolve, reject) => {
            handler.success = res => {
                wepy.hideLoading && wepy.hideLoading()
                if (res.data.status === 0) {
                    if (showToast) this.ShowToast(res.data.msg, 'success')
                    resolve(res.data)
                } else {
                    if (showToast) this.ShowToast(res.data.msg || res.data || "网络错误")
                    reject(res)
                }
            }
            handler.fail = () => {
                wepy.hideLoading && wepy.hideLoading()
                if (showToast) this.ShowToast('网络错误', 'error', 3000)
                reject('Network request failed')
            }
            wepy.request(handler)
        })
    }
    
    // GET请求
    GET(url, params = {}, showToast = true, handler = {}) {
        return this.request('GET', url, params, showToast, handler)
    }
    
    // POST请求
    POST(url, params = {}, showToast = true, handler = {}) {
        return this.request('POST', url, params, showToast, handler)
    }
    
    
}


