//封装ajax请求
import config from './config'

export default (url, data = {}, method = 'GET') => {
    return new Promise((resolve, reject) => {
        wx.request({
            url:config.host + url,
            data,
            method,
            success: (res) => {
                // console.log('成功', res);
                resolve(res.data)
            },
            fail: (err) => {
                // console.log('失败', err);
                reject(err)
            }
        })
    })
}