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
      id: '10086',  //歌曲id
      name: '测试歌曲', //歌曲名称
      author: '歌曲作者', //作者
      src: '',    //播放源
      starttime:'loading...', //当前时长
      duration: '∞',  //总时长
      offset:0,   //当前播放位置
      max:100,   //总长度
      playing:true //是否正在播放
    },
    uploadStroyData:{ //准备提交的故事信息
      stroyType:null, //故事类型  绘本||原创 || 趣事
      coverImg:null,  //故事封面
      name:null, //故事名称
      label:null,  //故事标签
      src:null,  //录音文件
      storyLength:null, // 故事长度123456
      text:null, //作者感想
      time:null //上传时间
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
      // 监听播放 需先onPlay()
      // innerAudioContext.onTimeUpdate(function (res) {
        // console.log(_this.globalData.PlayItem)
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
  //切换播放歌曲
  switchMusic: function (data) {
    this.innerAudioContext.pause()  //将正在播放的歌曲暂停
    this.innerAudioContext.seek(0)  //跳转到0秒
    this.innerAudioContext.src = data ? data : this.globalData.PlayItem.src //修改src地址
    this.innerAudioContext.play()   //播放
  },
  //全局录音接口
  setRecorderManager:function (){
    const _this = this;
    if (wx.getRecorderManager) {
      this.recorderManager = wx.getRecorderManager()
      const recorderManager = this.recorderManager

      recorderManager.onStart(() => {
        console.log('录音接口开始录音')
      })
      recorderManager.onPause(() => {
        console.log('录音接口暂停')
      })
      recorderManager.onStop((res) => {
        console.log('录音结束')
      })
      recorderManager.onFrameRecorded((res) => {
        const { frameBuffer } = res
        console.log('录音超出限定文件大小', frameBuffer.byteLength / 1048576)
      })
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  //重置录音接口
  resetRecorderManager:function(obj){
    this.recorderManager.stop()
    this.recorderManager.start(obj)
  }
})