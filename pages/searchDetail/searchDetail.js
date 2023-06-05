// pages/searchDetail/searchDetail.js
import request from '../../utils/request'
import PubSub from 'pubsub-js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchWord: '',
        searchListId: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log('搜索功能因为接口原因无法渲染完整的列表');
        console.log('关键词'+options.searchWord);
        this.setData({
            searchWord: options.searchWord
        })
        this.getSearchInfo()
    },

    //获取搜索数据
    async getSearchInfo() {
        let res = await request('/search', {
            keywords: this.data.searchWord
        })
        let idList = []
        res.result.songs.forEach(element => {
            idList.push(element.album.id)
        });
        this.setData({
            searchListId: idList,
            test:res.result.songs[0].album.id
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
        PubSub.unsubscribe('switchType')
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