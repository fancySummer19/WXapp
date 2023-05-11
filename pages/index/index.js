// pages/index/index.js
import request from '../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //轮播图数据
        bannerList: [],
        //推荐歌单数据
        recommendList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        //请求轮播图
        let bannerListData = await request('/banner', {
            type: 2
        })
        this.setData({
            bannerList: bannerListData.banners
        })
        //请求推荐歌单数据
        let recommendListData = await request('/personalized', {limit: 10})
        this.setData({
            recommendList: recommendListData.result
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