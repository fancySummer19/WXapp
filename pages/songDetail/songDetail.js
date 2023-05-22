// pages/songDetail/songDetail.js
import request from '../../utils/request'
import PubSub from 'pubsub-js'
import moment from 'moment'
const appInstance = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 音乐是否播放
        isPlay: false,
        song: {},
        musicId: '',
        //背景图片
        background: {
            backgroundImage: ''
        },
        //歌曲时长信息
        currentTime: '00:00',
        durationTime: '00:00',
        //进度条的数值
        currentTimeV: '0',
        durationTimeV: '100',
        //当前进度的百分比
        percentValue: '0'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        //获取音乐信息
        let musicId = options.musicId
        this.getMusicInfo(musicId)
        this.setData({
            musicId
        })
        //判断当前页面是否在播放
        if (appInstance.globalData.isMusicPlay && appInstance.globalData.musicId === musicId) {
            this.setData({
                isPlay: true
            })
        } else {
            this.musicControl(true)
        }
        //监听音乐的播放和暂停
        this.backgroundAudioManager = wx.getBackgroundAudioManager()
        this.backgroundAudioManager.onPlay(() => {
            this.setData({
                isPlay: true
            })
            //修改全局的音乐播放状态
            appInstance.globalData.isMusicPlay = true
            appInstance.globalData.musicId = musicId
        })
        this.backgroundAudioManager.onPause(() => {
            this.setData({
                isPlay: false
            })
            appInstance.globalData.isMusicPlay = false
        })
        this.backgroundAudioManager.onStop(() => {
            this.setData({
                isPlay: false
            })
            appInstance.globalData.isMusicPlay = false
        })
        this.backgroundAudioManager.onTimeUpdate(() => {
            let currentTime = moment(this.backgroundAudioManager.currentTime * 1000).format('mm:ss')
            let currentTimeV = this.backgroundAudioManager.currentTime * 1000
            this.setData({
                currentTime,
                currentTimeV,
                percentValue: (currentTimeV / this.data.durationTimeV) * 100
            })
        })
        this.backgroundAudioManager.onEnded(() => {
            //播放完一次后重新播放
            this.musicControl(true)
        })
    },
    //进度条的回调
    onChange(event) {
        // wx.showToast({
        //     icon: 'none',
        //     title: `当前值：${event.detail}`,
        // });
        let toTime = event.detail / 100 * this.data.durationTimeV / 1000
        this.backgroundAudioManager.seek(toTime)
    },
    //获取音乐详情的方法
    async getMusicInfo(musicId) {
        let songData = await request('/song/detail', {
            ids: musicId
        })
        let durationTime = moment(songData.songs[0].dt).format('mm:ss')
        let durationTimeV = songData.songs[0].dt
        this.setData({
            song: songData.songs[0],
            background: {
                backgroundImage: songData.songs[0].al.picUrl
            },
            durationTime,
            durationTimeV
        })
    },
    //让音乐一进来就播放(还未完成)
    enterAndPlay() {
        let isPlay = this.data.isPlay
        // this.setData({
        //     isPlay
        // })
        this.musicControl(isPlay)
    },
    //音乐暂停与播放的回调
    handleMusicPlay() {
        let isPlay = !this.data.isPlay
        // this.setData({
        //     isPlay
        // })
        this.musicControl(isPlay)
    },
    //控制音乐播放的函数
    async musicControl(isPlay) {
        // let backgroundAudioManager = wx.getBackgroundAudioManager()
        if (isPlay) {
            // let musicId = this.data.song.id
            // this.getMusicUrl(musicId)
            let musicLinkData = await request('/song/url', {
                id: this.data.musicId,
                cookie: wx.getStorageSync('cookie')
            })
            let musicLink = musicLinkData.data[0].url
            // console.log(musicLinkData.data[0]);
            // console.log(musicLink);
            this.backgroundAudioManager.src = musicLink
            this.backgroundAudioManager.title = this.data.song.name
        } else {
            this.backgroundAudioManager.pause()
        }
    },

    //切换歌曲的回调
    handleSwitch(event) {
        let type = event.currentTarget.id
        //关闭当前的音乐
        this.backgroundAudioManager.stop()
        //发布消息
        PubSub.publish('switchType', type)
        //订阅musicID
        PubSub.subscribe('musicId', (msg, musicId) => {
            console.log(musicId);
            this.setData({
                musicId: musicId
            })
            this.getMusicInfo(musicId)
            this.musicControl(true)
            PubSub.unsubscribe('musicId')
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {},


    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        // if(this.data.isPlay == false) {
        //     this.musicControl(true)
        //     this.setData({
        //         isPlay:true
        //     })
        // }
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