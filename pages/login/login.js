// pages/login/login.js
import request from '../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phone: '',
        password: '',
        isSend: true,
        key: '',
        qrurl: '',
        qrimg: '',
        //定时器
        setTime: null,

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        // 发送请求获取key
        let {
            key
        } = this.data
        let keyData = await request('/login/qr/key', {
            timestamp: new Date().getTime()
        })
        this.setData({
            key: keyData.data.unikey
        })
        //发送请求获取qrimg
        let qrData = await request('/login/qr/create', {
            key: keyData.data.unikey,
            qrimg: true,
            timestamp: new Date().getTime()
        })
        this.setData({
            qrurl: qrData.data.qrurl,
            qrimg: qrData.data.qrimg
        })

        //启动定时器
        this.startCount()
    },

    //定时器
    startCount: async function () {
        if (!this.data.setTime) {
            this.data.setTime = setInterval(async () => {
                let {
                    key
                } = this.data
                let result = await request('/login/qr/check', {
                    key,
                    timestamp: new Date().getTime()
                })
                if (result.code == 803) {
                    //获取的cookie存在本地
                    wx.setStorageSync('cookie', result.cookie)

                    wx.showToast({
                        title: '登录成功',
                    })
                    this.getuserInfo()
                    clearInterval(this.data.setTime)
                    this.setData({
                        setTime: null
                    })
                }
                if (result.code == 800) {
                    wx.showToast({
                        title: '二维码过期',
                    })
                }
            }, 1000)
        }
    },

    //登录成功后获取用户信息
    async getuserInfo() {
        let result = await request('/user/account',{cookie:wx.getStorageSync('cookie')})
        wx.setStorageSync('userInfo', JSON.stringify(result.profile))
        wx.reLaunch({
            url: '/pages/personal/personal',
        })
    },

    //表单回调
    handleInput(e) {
        let type = e.currentTarget.id
        this.setData({
            [type]: e.detail.value
        })
    },

    //登录的回调
    async login() {
        let {
            phone,
            password
        } = this.data
        //表单验证
        //验证电话的格式
        if (!phone) {
            wx.showToast({
                title: '手机号码不能为空',
                icon: 'none'
            })
            return
        }
        let phoneReg = /^1(3|3|4|5|6|7|8|9)\d{9}$/
        if (!phoneReg.test(phone)) {
            wx.showToast({
                title: '手机号码格式错误',
                icon: 'none'
            })
            return
        }
        //验证验证码
        if (!password) {
            wx.showToast({
                title: '验证码不能为空',
                icon: 'none'
            })
            return
        }
        //后端验证（还未完成）
        let result = await request('/login/cellphone', {
            phone,
            captcha: password
        })
        if (result.code === 503) {
            wx.showToast({
                title: '验证码错误',
            })
        }
        if (result.code === 200) {
            wx.showToast({
                title: '登录成功',
            })
            // 将用户信息存储到本地
            wx.setStorageSync('userInfo', JSON.stringify(result.profile))
            wx.reLaunch({
                url: '/pages/personal/personal',
            })
        }

    },
    //   发送验证码的回调
    /* 获取验证码按钮 */
    async sendCode() {
        let {
            phone
            // password
        } = this.data
        //表单验证
        //验证电话的格式
        if (!phone) {
            wx.showToast({
                title: '手机号码不能为空',
                icon: 'none'
            })
            return
        }
        let phoneReg = /^1(3|3|4|5|6|7|8|9)\d{9}$/
        if (!phoneReg.test(phone)) {
            wx.showToast({
                title: '手机号码格式错误',
                icon: 'none'
            })
            return
        }
        //发送请求获取验证码
        let isSendData = await request('/captcha/sent', {
            phone
        })
        console.log(isSendData);
        wx.nextTick(this.setData({
            isSend: isSendData.data
        }))

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        clearInterval(this.data.setTime)
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})