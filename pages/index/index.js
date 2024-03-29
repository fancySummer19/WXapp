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
        recommendList: [],
        //排行榜数据
        topList: [],
        //精品歌单数据
        cats: ['华语', '古风', '欧美', '流行'],
        highQualityLists: [],
        //每日歌单
        recommendSongs: [],
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
        let recommendListData = await request('/personalized', {
            limit: 10
        })
        this.setData({
            recommendList: recommendListData.result
        })
        //请求排行榜数据(并对请求到的数据进行处理)
        let index = 0
        let resultArr = []
        let topListData = await request('/toplist/detail')
        while (index < 4) {
            let topListItem = {
                name: topListData.list[index].name,
                imgUrl: topListData.list[index].coverImgUrl,
                tracks: topListData.list[index].tracks.slice(0, 3)
            }
            resultArr.push(topListItem)
            index++
        }
        this.setData({
            topList: resultArr
        })
        //获取精品歌单
        this.data.cats.forEach(e => {
            this.getHighQuality(e)
        })
        //请求每日推荐歌曲的第一首
        if (wx.getStorageSync('cookie')) {
            this.getRecommendSongs(wx.getStorageSync('cookie'))
        }
    },
    //获取每日推荐歌曲信息
    async getRecommendSongs(cookie) {
        let res = await request('/recommend/songs', {
            cookie
        })
        this.setData({
            recommendSongs: res.data.dailySongs[0]
        })
    },
    //获取精品歌单
    async getHighQuality(cat) {
        let res = await request('/top/playlist/highquality', {
            limit: 20,
            cat
        })
        let list = res.playlists.slice(0, 3)
        let list2 = {
            list,
            cat
        }
        let lists = this.data.highQualityLists.concat(list2)
        this.setData({
            highQualityLists: lists
        })
    },
    //处理轮播图的跳转
    handleBanner(event) {
        let banner = event.currentTarget.dataset.banner
        if (banner.targetType == 1) {
            wx.navigateTo({
                url: '/pages/songDetail/songDetail?musicId=' + banner.song.id,
            })
        }
        if (banner.targetType == 10) {
            wx.navigateTo({
                url: '/pages/recommendSong/recommendSong?id=' + banner.targetId,
            })
        } else {
            wx.showToast({
                title: '不能跳转',
                icon: 'error'
            })
        }
    },
    //从推荐歌单跳转到歌单详情
    hanleRecommendDetails(event) {
        let list = event.currentTarget.dataset.list
        wx.navigateTo({
            url: '/pages/recommendSong/recommendSong?id=' + list.id,
        })
    },
    //每日推荐的页面跳转
    handleMeiri() {
        wx.navigateTo({
            url: '/pages/recommendSong/recommendSong',
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