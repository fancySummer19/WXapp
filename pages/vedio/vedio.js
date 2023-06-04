// pages/vedio/vedio.js
let timer = null

import request from '../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        placeholderContent: '',
        // 搜索热榜
        hotList: [],
        hotListDetail: [],
        //模糊匹配的数据
        searchList:[]
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
        hotDetail.list = res.playlist.tracks.slice(0, 20)
        let hotListDetailTemp = []
        hotListDetailTemp = this.data.hotListDetail
        hotListDetailTemp.push(hotDetail)
        this.setData({
            hotListDetail: hotListDetailTemp
        })
    },
    //从搜索热榜题跳转到搜索详情页
    handleSearchList(e) {
        wx.navigateTo({
            url: '/pages/searchDetail/searchDetail?searchWord=' + e.currentTarget.dataset.list.name
        })
    },
    //当搜索框有文字时弹出模糊搜索
    onChange(e) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            this.getSuggestInfo(e.detail)
        }, 200)
    },
    //请求模糊数据
    async getSuggestInfo(word) {
        if(!word){
            this.setData({
                searchList:[]
            })
        }
        let res = await request('/search/suggest',{keywords:word})
        this.setData({
            searchList:res.result.songs
        })
    },
    //从模糊搜索跳转到搜索详情
    handleSuggest(e) {
        wx.navigateTo({
            url: '/pages/searchDetail/searchDetail?searchWord=' + e.currentTarget.dataset.suggestlist.name
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