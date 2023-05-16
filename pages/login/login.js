// pages/login/login.js
import request from '../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phone: '',
        password: '',
        isSend: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
        let result = await request('/captcha/verify',{phone,captcha:password})
        if(result.code === 503) {
            wx.showToast({
              title: '验证码错误',
            })
        }
        if(result.code === 200) {
            wx.showToast({
              title: '登录成功',
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