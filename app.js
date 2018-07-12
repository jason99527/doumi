//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

  },
  globalData: {
    userInfo:{
      user_img: '/images/test_header.jpg',
      user_name: '估计就是假的吧'
    },
    PlayItem: {  //当前播放歌曲信息
      id: '10086',
      name: '测试歌曲',
      author: '歌曲作者',
      src: ''
    }
  },
  //音乐播放器
  innerAudioContext:function(){
    const _this = this
    //兼容处理
    if (wx.createInnerAudioContext) {
      _this.innerAudioContext = wx.createInnerAudioContext()
      const innerAudioContext = _this.innerAudioContext
      //是否自动播放
      innerAudioContext.autoplay = true
      //歌曲src
      innerAudioContext.src = _this.globalData.PlayItem.src
      //开始播放
      innerAudioContext.onPlay(() => {
        wx.hideLoading()
        console.log('开始播放')
      })
      // // 监听播放 需先onPlay()
      // innerAudioContext.onTimeUpdate(function (res) {
        // _this.setData({
        //   starttime: _this.funTime(innerAudioContext.currentTime),  //当前时长
        //   duration: _this.funTime(innerAudioContext.duration),  //总时长
        //   offset: parseInt(innerAudioContext.currentTime),  //播放器当前长度
        //   max: parseInt(innerAudioContext.duration) //播放器总长度
        // })
      // })
      //播放失败
      innerAudioContext.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
      })
      //播放结束
      innerAudioContext.onEnded(() => {
        // _this.nextplay(0);
        console.log('播放结束')
      })
      //歌曲加载中
      innerAudioContext.onWaiting(() => {
        wx.showLoading({
          title: "Loading..."
        })
      })
      //加载完毕
      innerAudioContext.onCanplay(() => {
        wx.hideLoading()
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  //切换歌曲
  switchMusic: function (data) {
    this.innerAudioContext.pause()  //将正在播放的歌曲暂停
    this.innerAudioContext.seek(0)  //跳转到0秒
    this.innerAudioContext.src = data ? data : this.globalData.PlayItem.src //修改src地址
    this.innerAudioContext.play()   //播放
  }
  // //将时长换算成时间格式
  // funTime: function (time) {
  //   const min = parseInt(time / 60);
  //   const set = parseInt(time % 60) < 10 ? '0' + parseInt(time % 60) : parseInt(time % 60);
  //   const Time = min + ':' + set;
  //   return Time;
  // }
})