//手指开始的坐标
let startY = 0;
//手指移动的坐标
let moveY = 0;
//手指结束的坐标
let moveDistance = 0;

import request from '../../utils/request'

// pages/personal/personal.js
Page({

    /**
     * 页面的初始数据 
     */
    data: {
        coverTransform: 'translateY(0)',
        coverTransition: '',
        userInfo: {},
        recentPlayList: [] //用户的播放记录
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        //获取存在本地的用户信息
        let userInfo = wx.getStorageSync('userInfo')
        if (userInfo) {
            this.setData({
                userInfo: JSON.parse(userInfo)
            })
        }

        //获取用户播放记录
        this.getUserRecentPlayList(this.data.userInfo.userId)
    },

    //从最近播放跳转到歌曲播放页面
        toSongDetail(event){
            let song = event.currentTarget.dataset.songs.song
            wx.navigateTo({
              url: '/pages/songDetail/songDetail?musicId='+song.id,
            })
        },
    //获取用户播放记录函数
    async getUserRecentPlayList(userid) {
        let result = await request('/user/record',{uid:userid,type:1})
        this.setData({
            recentPlayList:result.weekData.splice(0,10)
        })
    },

    //处理页面的滑动
    handleTouchStart(event) {
        this.setData({
            coverTransition: ''
        })
        startY = event.touches[0].clientY
    },
    handleTouchMove(event) {
        moveY = event.touches[0].clientY
        moveDistance = moveY - startY
        if (moveDistance <= 0) {
            moveDistance = 0
        }
        if (moveDistance >= 80) {
            moveDistance = 80
        }
        this.setData({
            coverTransform: `translateY(${moveDistance}rpx)`
        })
    },
    handleTouchEnd() {
        this.setData({
            coverTransform: `translateY(0rpx)`,
            coverTransition: 'transform 1s linear'
        })
    },



    //跳转到登录页面和退出登录
    toLogin() {
        console.log(this.data.userInfo);
        if (JSON.stringify(this.data.userInfo)=="{}") {
            wx.navigateTo({
                url: '/pages/login/login',
            })
        } else {
            wx.navigateTo({
                url: '/pages/logout/logout',
            })
        }
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