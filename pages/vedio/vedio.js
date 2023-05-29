// pages/vedio/vedio.js

import request from '../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        placeholderContent: '',
        hotList: [],
        hotListDetail: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        //获取几个热搜列表的id
        this.gethot()
        //获取列表详情
        // let id = this.hotList[0]
        // this.gethotDetail(id)
    },
    //确定搜索时出发
    onSearch(e) {
        wx.navigateTo({
            url: '/pages/searchDetail/searchDetail?searchWord=' + e.detail,
        })
    },
    //获取几个热搜列表的id
    async gethot() {
        let res = await request('/toplist')
        let hotArr = []
        for (let i = 0; i <= 3; i++) {
            hotArr.push(res.list[i].id)
        }
        this.gethotDetail(hotArr[0])
        this.gethotDetail(hotArr[1])
        this.gethotDetail(hotArr[2])
        this.gethotDetail(hotArr[3])
        this.setData({
            hotList: hotArr
        })
    },
    //获取热榜的详情
    async gethotDetail(listId) {
        let res = await request('/playlist/detail', {
            id: listId
        })
        let hotDetail = {}
        hotDetail.title = res.playlist.name
        hotDetail.list=res.playlist.tracks.slice(0,20)
        let hotListDetailTemp = []
        hotListDetailTemp = this.data.hotListDetail
        hotListDetailTemp.push(hotDetail)
        this.setData({
            hotListDetail:hotListDetailTemp
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