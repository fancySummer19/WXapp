// pages/recommendSong/recommendSong.js
import request from '../../utils/request'
import PubSub from 'pubsub-js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        recommendSongs: [],
        day: '',
        month: '',
        // list:[],
        listId: '',
        listInfo: [],
        index: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        if (options.id) {
            this.setData({
                listId: options.id
            })
            //获取跳转过来时携带的歌单ID
            this.getListDetails(options.id)
            this.getLsitInfo(options.id)
        } else {
            // console.log(ListId);
            //判断用户是否登录
            let userInfo = wx.getStorageSync('userInfo')
            if (!userInfo) {
                wx.showToast({
                    title: '请先登录',
                    success: () => {
                        wx.reLaunch({
                            url: '/pages/login/login',
                        })
                    }
                })
            }
            //更新日期
            this.setData({
                day: new Date().getDate(),
                month: new Date().getMonth() + 1
            })

            //请求每日歌曲的数据
            this.getRecommendSongs(wx.getStorageSync('cookie'))
        }
        //订阅来自songDetail的消息用于切换歌曲
        PubSub.subscribe('switchType', (msg, type) => {
            let {
                recommendSongs,
                index
            } = this.data
            if (type === 'pre') {
                (index === 0) && (index = recommendSongs.length)
                index -= 1
            } else {
                (index === recommendSongs.length-1) && (index = -1)
                index += 1
            }
            this.setData({
                index
            })
            let musicId = recommendSongs[index].id
            PubSub.publish('musicId',musicId)
        })
    },
    //获取歌单的信息
    async getLsitInfo(listId) {
        let res = await request('/playlist/detail', {
            id: listId
        })
        this.setData({
            listInfo: res.playlist
        })
    },
    //获取歌单的所有歌曲
    async getListDetails(listid) {
        let res = await request('/playlist/track/all', {
            id: listid,
            limit: 20,
            offset: 1
        })
        this.setData({
            recommendSongs: res.songs
        })
    },
    //跳转到歌曲详情页
    toSongDetail(event) {
        let {
            song,
            index
        } = event.currentTarget.dataset
        this.setData({
            index
        })
        wx.navigateTo({
            url: '/pages/songDetail/songDetail?musicId=' + song.id,
        })
    },

    //获取每日推荐歌曲信息
    async getRecommendSongs(cookie) {
        let res = await request('/recommend/songs', {
            cookie
        })
        this.setData({
            recommendSongs: res.data.dailySongs
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