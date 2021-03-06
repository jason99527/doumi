// pages/common/player/player.js
const App = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    playSwitch:true, //是否播放
    starttime: '00:00', //开始时间
    duration: '05:00',  //总时长
    playEnd:false,
    playNum:0,//当前播放歌曲Index
    ListSwitch:false, //是否点开播放记录
    animateSWitch: true, //是否修改动画层z-index
    PlayType:{  //播放类型 列表/单曲循环/随机
      type:'random',
      ImageSrc:'../../../images/Player/Btn-random.png'  //按钮图片地址
    },
    PlayItem:{  //当前播放歌曲信息
      id:'10086',
      name:'Loading...',
      author:'Loading...',
      img:'',
      src: ''
    },
    playRecord:[  //播放记录
      {
        name:'放羊的小孩',
        author:'取唐僧的经'
      },
      {
        name: '放羊的小孩',
        author: '取唐僧的经'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取歌曲ID
    this.getMp3Data(options.id)
    // 同步全局音频信息
    this.synchronization()
    // 判断是否第一次播放 显示置顶小程序提示
    this.firstPlay()

    const _this = this;

  },
  firstPlay:function(){
    if (App.globalData.user_first_play){
      wx.showModal({
        title: '提示',
        content: '置顶小程序即可在后台播放故事哦',
        showCancel:false
      })
      App.globalData.user_first_play = false
    }
  },
  // 获取歌曲信息
  getMp3Data:function(id){
    const _this = this
    wx.request({
      url: App.globalData.domain,
      data: {
        action: "selectStoryById",
        openid: App.globalData.openid,
        storyId:id
      },
      success: function (res) {
        if (res.data.type) {
          _this.JudegMp3(res.data.info)
        } else {
          wx.showToast({
            title: res.data.msg,
          })
        }
      }
    })
  },
  // 同步数据
  synchronization:function(){
    this.setData({
      starttime: App.globalData.PlayItem.starttime,  //当前时长
      duration: App.globalData.PlayItem.duration,  //总时长
      offset: App.globalData.PlayItem.offset,  //播放器当前长度
      max: App.globalData.PlayItem.max, //播放器总长度
      playSwitch: App.globalData.PlayItem.playing, //是否在播放
      PlayItem: {  //当前播放歌曲信息
        id: App.globalData.PlayItem.id,
        name: App.globalData.PlayItem.name,
        author: App.globalData.PlayItem.author,
        img: App.globalData.PlayItem.coverImgUrl,
        src: App.globalData.PlayItem.src
      }
    })
  },
  // 判断是否需要切换歌曲信息
  JudegMp3:function(info){
    if (info.audioSrc === '' || info.audioSrc === null){
      wx.showToast({
        title: '音频地址出错',
        icon: 'none',
        duration: 2000
      })
      return 
    }
    // 如果是同一首歌歌
    if (App.globalData.PlayItem.src === info.audioSrc){
      this.innerAudioContext()
      // 如果已经停止
      console.log(App.globalData.PlayItem.playStop)
      if (App.globalData.PlayItem.playStop) {
        this.historyPlayData(App.globalData.PlayItem.offset)
      }
      return
    }else {
      if (App.globalData.PlayItem.src === ''){
        this.SwitchPlay(info.name, info.alias, info.imgPath, info.audioSrc)
        App.innerAudioContext()
      }else {
        this.SwitchPlay(info.name, info.alias, info.imgPath, info.audioSrc)
        App.switchMusic()
      }
    }
      this.innerAudioContext()
      App.globalData.PlayItem.playing = true

      // console.log(App.globalData.PlayItem)
    // }
  },
  // 给播放接口重新绑定相关事件
  innerAudioContext:function(){
    const _this = this
    //监听播放器播放事件
    App.innerAudioContext.onTimeUpdate(function (res) {
      //修改当前页面数据 同时修改全局歌曲信息
      const innerAudioContext = App.innerAudioContext
      if (innerAudioContext.duration === 0){
        return
      }
      App.globalData.PlayItem.starttime = _this.funTime(innerAudioContext.currentTime)  //当前时长
      App.globalData.PlayItem.duration = _this.funTime(innerAudioContext.duration)  //总时长
      App.globalData.PlayItem.offset = parseInt(innerAudioContext.currentTime)  //播放器当前长度
      App.globalData.PlayItem.max = parseInt(innerAudioContext.duration) //播放器总长度

      _this.synchronization()
    });
    //开始播放
    App.innerAudioContext.onPlay(() => {
      App.globalData.PlayItem.playing = true
      _this.setData({
        playEnd: false
      })
      wx.hideLoading()
      console.log('开始播放')
    })
    //暂停
    App.innerAudioContext.onPause(function () {
      App.globalData.PlayItem.playing = false
      _this.setData({
        playSwitch: false
      })
      console.log('暂停')
    })
    // 播放结束
    App.innerAudioContext.onEnded(() => {
      console.log('播放结束')
      App.globalData.PlayItem.playing = false
      _this.setData({
        playEnd: true,
        playSwitch:false
      })
    })
    //停止
    App.innerAudioContext.onStop(function () {
      console.log('播放停止')
      App.globalData.PlayItem.playing = false
      App.globalData.PlayItem.playStop = true
      _this.setData({
        playEnd: true,
        playSwitch: false
      })
    })
  },

  //将时长换算成时间格式
  funTime: function (time) {
    const min = parseInt(time / 60);
    const set = parseInt(time % 60) < 10 ? '0' + parseInt(time % 60) : parseInt(time % 60);
    const Time = min + ':' + set;
    return Time;
  },

  // 修改播放源全局变量
  SwitchPlay: function (name, author, coverImgUrl, src){
    App.globalData.PlayItem.name = name
    App.globalData.PlayItem.author = author
    App.globalData.PlayItem.coverImgUrl = coverImgUrl
    App.globalData.PlayItem.src = src
  },

  //拖动进度条 松开
  sliderchange: function (e) {
    const val = e.detail.value
    if (this.data.playEnd === false){
      App.innerAudioContext.seek(val)
      App.innerAudioContext.play()
    }else {
      this.historyPlayData(val)
    }
    App.globalData.PlayItem.playing = true
  },
  // 音频停止 重新播放并定位到上次播放的坐标
  historyPlayData: function (val) {
    this.SwitchPlay(App.globalData.PlayItem.name, App.globalData.PlayItem.author, App.globalData.PlayItem.coverImgUrl, App.globalData.PlayItem.src)
    App.switchMusic(val)
  },

  //拖动进度条 移动
  touchmove: function (e) {
    const val = e.detail.value
    this.setData({
      starttime: this.funTime(val)
    })
  },

  // 播放/暂停
  play:function(){
    //获取当前播放状态
    const playSwitch = this.data.playSwitch
    //如果正在播放
    if (playSwitch){
      App.innerAudioContext.pause()  //暂停
      App.globalData.PlayItem.playing = false
    }else{  //否则还没播放
      App.innerAudioContext.play() //播放
      App.globalData.PlayItem.playing = true
    }
    //修改数据
    this.setData({
      playSwitch:!this.data.playSwitch
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  //打开/关闭播放列表
  OpenList:function(){
    //修改开关实现上拉/收起动画
    this.setData({
      ListSwitch: !this.data.ListSwitch
    })
    //动画执行完毕修改z-index
    setTimeout(()=>{
      this.setData({
        animateSWitch: !this.data.animateSWitch
      })
    },300)
  },

  //修改播放模式
  PlayType:function(){
    //获取当前播放模式
    let Type = this.data.PlayType.type
    //循环修改模式
    switch (Type){
      case 'random':
        Type = 'list'
      break;
      case 'list':
        Type = 'single'
      break;
      case 'single':
        Type = 'random'
      break;
    }
    //修改参数
    this.setData({
      PlayType:{
        type: Type,
        ImageSrc: `../../../images/Player/Btn-${this.data.PlayType.type}.png`
      }
    })
  }
})