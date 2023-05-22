// pages/songDetail/songDetail.js
import request from '../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 音乐是否播放
        isPlay:false,
        song:{},
        //背景图片
        background:{
            backgroundImage:''
        },
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let musicId = options.musicId
        this.getMusicInfo(musicId)
        //监听音乐的播放和暂停
        this.backgroundAudioManager = wx.getBackgroundAudioManager()
        this.backgroundAudioManager.onPlay(()=>{
            this.setData({
                isPlay:true
            })
        })
        this.backgroundAudioManager.onPause(()=>{
            this.setData({
                isPlay:false
            })
        })
        this.backgroundAudioManager.onStop(()=>{
            this.setData({
                isPlay:false
            })
        })

    },
    //获取音乐详情的方法
    async getMusicInfo(musicId) {
        let songData = await request('/song/detail',{ids:musicId})
        this.setData({
            song:songData.songs[0],
            background:{backgroundImage:songData.songs[0].al.picUrl}
        })
    },
    //让音乐一进来就播放(还未完成)
    enterAndPlay(){
        let isPlay = this.data.isPlay
        // this.setData({
        //     isPlay
        // })
        this.musicControl(isPlay)
    },
    //音乐暂停与播放的回调
    handleMusicPlay(){
        let isPlay = !this.data.isPlay
        // this.setData({
        //     isPlay
        // })
        this.musicControl(isPlay)
    },
    //控制音乐播放的函数
    async musicControl(isPlay){
        // let backgroundAudioManager = wx.getBackgroundAudioManager()
        if(isPlay){
            // let musicId = this.data.song.id
            // this.getMusicUrl(musicId)
            let musicLinkData = await request('/song/url',{id:this.data.song.id})
            let musicLink = musicLinkData.data[0].url
            console.log(musicLink);
            this.backgroundAudioManager.src = musicLink
            this.backgroundAudioManager.title = this.data.song.name
        }else {
            this.backgroundAudioManager.pause()
        }
    },
    //获取音乐播放链接的函数请求
    // async getMusicUrl(musicId){
    //     let musicUrlData = await request('/song/url',{id:musicId})
    //     this.setData({
    //         musicUrl:musicUrlData.data[0].url
    //     })
    // },

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