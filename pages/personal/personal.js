//手指开始的坐标
let startY = 0;
//手指移动的坐标
let moveY = 0;
//手指结束的坐标
let moveDistance = 0;

// pages/personal/personal.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        coverTransform:'translateY(0)',
        coverTransition:'',
        userInfo:{}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let userInfo = wx.getStorageSync('userInfo')
        if(userInfo) {
            this.setData({
                userInfo:JSON.parse(userInfo)
            })
        }
    },

    //处理页面的滑动
    handleTouchStart(event){
        this.setData({
            coverTransition:''
        })
        startY = event.touches[0].clientY
    },
    handleTouchMove(event){
        moveY  = event.touches[0].clientY
        moveDistance = moveY - startY
        if(moveDistance<=0) {
            moveDistance = 0
        }
        if(moveDistance >= 80){
            moveDistance=80
        }
        this.setData({
            coverTransform:`translateY(${moveDistance}rpx)`
        })
    },
    handleTouchEnd(){
        this.setData({
            coverTransform:`translateY(0rpx)`,
            coverTransition:'transform 1s linear'
        })
    },

    //跳转到登录页面
    toLogin(){
        wx.navigateTo({
          url: '/pages/login/login',
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})