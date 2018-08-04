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
    playNum:0,//当前播放歌曲Index
    ListSwitch:false, //是否点开播放记录
    animateSWitch: true, //是否修改动画层z-index
    PlayType:{  //播放类型 列表/单曲循环/随机
      type:'random',
      ImageSrc:'../../../images/Player/Btn-random.png'  //按钮图片地址
    },
    PlayItem:{  //当前播放歌曲信息
      id:'10086',
      name:'测试歌曲',
      author:'歌曲作者',
      src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
    },
    playRecord:[  //播放记录
      {
        name:'放羊的小孩',
        author:'取唐僧的经'
      },
      {
        name: '放羊的小孩',
        author: '取唐僧的经'
      },
      {
        name: '放羊的小孩',
        author: '取唐僧的经'
      },
      {
        name: '放羊的小孩',
        author: '取唐僧的经'
      },
      {
        name: '放羊的小孩',
        author: '取唐僧的经'
      },
      {
        name: '放羊的小孩',
        author: '取唐僧的经'
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
    this.GetPlayState()
    //页面初始化数据
    this.setData({
      starttime: App.globalData.PlayItem.starttime,  //当前时长
      duration: App.globalData.PlayItem.duration,  //总时长
      offset: App.globalData.PlayItem.offset,  //播放器当前长度
      max: App.globalData.PlayItem.max, //播放器总长度
      playSwitch: App.globalData.PlayItem.playing //是否在播放
    })
    const _this = this;
    //如果当前没有播放歌曲
    if (App.globalData.PlayItem.src === ''){
        this.SwitchPlay('此时此刻', '许巍', 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000', 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46')
        App.innerAudioContext()
    }else{
      // 切换播放源
      // this.SwitchPlay('此时此刻123123', '许巍123123', 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000', 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46')
      // App.switchMusic()
    }
    //监听播放器播放事件
    App.innerAudioContext.onTimeUpdate(function (res) {
      //修改当前页面数据 同时修改全局歌曲信息
      const innerAudioContext = App.innerAudioContext
      App.globalData.PlayItem.starttime = _this.funTime(innerAudioContext.currentTime)  //当前时长
      App.globalData.PlayItem.duration = _this.funTime(innerAudioContext.duration)  //总时长
      App.globalData.PlayItem.offset = parseInt(innerAudioContext.currentTime)  //播放器当前长度
      App.globalData.PlayItem.max = parseInt(innerAudioContext.duration) //播放器总长度

      _this.setData({
        starttime: App.globalData.PlayItem.starttime,  //当前时长
        duration: App.globalData.PlayItem.duration,  //总时长
        offset: App.globalData.PlayItem.offset,  //播放器当前长度
        max: App.globalData.PlayItem.max //播放器总长度
      })
    });
    //暂停
    App.innerAudioContext.onPause(function(){
      App.globalData.PlayItem.playing =  false
      _this.setData({
        playSwitch: false
      })
      console.log('暂停')
    })
    //停止
    App.innerAudioContext.onStop(function () {
      console.log('停止')
    })
  },

  //将时长换算成时间格式
  funTime: function (time) {
    const min = parseInt(time / 60);
    const set = parseInt(time % 60) < 10 ? '0' + parseInt(time % 60) : parseInt(time % 60);
    const Time = min + ':' + set;
    return Time;
  },

  // 获取后台音频播放进度
  GetPlayState: function(){
    wx.getBackgroundAudioPlayerState({
      success: function (res) {
        App.globalData.PlayItem.playing = res.status === 1 ? true : false
        console.log(res)
      }
    })
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
    App.innerAudioContext.seek(val)
    App.innerAudioContext.play()
    App.globalData.PlayItem.playing = true
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