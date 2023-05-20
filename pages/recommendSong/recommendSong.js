// pages/recommendSong/recommendSong.js
import request from '../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        recommendSongs:[],
        day:'',
        month:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        //判断用户是否登录
        let userInfo = wx.getStorageSync('userInfo')
        if(!userInfo){
            wx.showToast({
              title: '请先登录',
              success:()=>{
                  wx.reLaunch({
                    url: '/pages/login/login',
                  })
              }
            })
        }
        //更新日期
        this.setData({
            day:new Date().getDate(),
            month:new Date().getMonth() +1
        })

        //请求每日歌曲的数据
        this.getRecommendSongs(wx.getStorageSync('cookie'))
    },

    //获取每日推荐歌曲信息
    async getRecommendSongs(cookie){
        let res = await request('/recommend/songs',{cookie})
        this.setData({
            recommendSongs:res.data.dailySongs
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