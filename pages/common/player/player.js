// pages/common/player/player.js
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
    //如果是从别的页面点击进来的
    // console.log(this.innerAudioContext)
    // if (options.id){
    //   return;
    // }
    const _this = this
    //兼容处理
    if (wx.createInnerAudioContext) {
      _this.innerAudioContext = wx.createInnerAudioContext()
      const innerAudioContext = _this.innerAudioContext
      //是否自动播放
      innerAudioContext.autoplay = true
      //歌曲src
      innerAudioContext.src = _this.data.PlayItem.src
      //开始播放
      innerAudioContext.onPlay(() => {
        wx.hideToast()
        console.log('开始播放')
      })
      //监听播放 需先onPlay()
      innerAudioContext.onTimeUpdate(function (res) {
        _this.setData({
          starttime: _this.funTime(innerAudioContext.currentTime),  //当前时长
          duration: _this.funTime(innerAudioContext.duration),  //总时长
          offset: parseInt(innerAudioContext.currentTime),  //播放器当前长度
          max: parseInt(innerAudioContext.duration) //播放器总长度
        })
      })
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
      innerAudioContext.onWaiting(()=>{
        wx.showLoading({
          title: "Loading...",
          icon: "loading"
        })
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },

  //将时长换算成时间格式
  funTime: function (time) {
    const min = parseInt(time / 60);
    const set = parseInt(time % 60) < 10 ? '0' + parseInt(time % 60) : parseInt(time % 60);
    const Time = min + ':' + set;
    return Time;
  },

  //拖动进度条 松开
  sliderchange: function (e) {
    const val = e.detail.value
    this.innerAudioContext.seek(val)
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
      this.innerAudioContext.pause()  //暂停
    }else{  //否则还没播放
      this.innerAudioContext.play() //播放
    }
    //修改数据
    this.setData({
      playSwitch:!this.data.playSwitch
    })
  },

  //切换歌曲
  switchMusic: function (data) {
    this.innerAudioContext.pause()  //将正在播放的歌曲暂停
    this.innerAudioContext.seek(0)  //跳转到0秒
    this.innerAudioContext.src = data ? data : this.data.PlayItem.src //修改src地址
    this.innerAudioContext.play()   //播放
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