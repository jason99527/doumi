//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          //先获取用户openid 
          wx.request({
            url: that.globalData.domain,
            data: {
              action: "getOpenId",
              code: res.code
            },
            success: function (res) {
              var data = res.data;
              that.globalData.openid = data.openid; //全局注册openid
              //根据用户openid 查找该用户是否注册过
              wx.request({
                url: that.globalData.domain,
                data: {
                  action: "getUserInfo",
                  openid: data.openid
                },
                success: function (res) {
                  var data = res.data
                  if (data.type) { //已有用户数据  更新头像及最后登录时间
                    //更新全局数据
                    that.globalData.id = data.info.id; //全局注册id
                    that.globalData.user_img = data.info.header;
                    that.globalData.user_name = data.info.alias;
                    wx.getUserInfo({
                      success: function (e) {
                        wx.request({
                          url: that.globalData.domain,
                          data: {
                            action: "updateLogin",
                            id: data.info.id,
                            header: e.userInfo.avatarUrl == data.info.header ? e.userInfo.avatarUrl : e.userInfo.avatarUrl
                          },
                          success: function (res) {
                            if (res.data.type) {
                              console.log('登录成功')
                            }
                          }
                        })

                      },
                      fail: function (e) {
                        //没有授权缓存 跳转至授权页面重新授权
                        wx.redirectTo({
                          url: '/pages/home/Authorization/index?data=true'
                        })
                      }
                    })
                  } else {            //该用户没有数据 跳转授权界面
                    wx.redirectTo({
                      url: '/pages/home/Authorization/index?data=false'
                    })
                  }
                },
                fail: function () {
                  console.log('失败')
                }
              })
            }
          })
          //获取用户名头像
          // that.request({
          //   data:{
          //     action:'getUserInfo',
          //     openid:'1'
          //   },
          //   success:function(res){
          //     console.log(res)
          //   }
          // })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },
  globalData: {
    id: '', //用户id
    domain: "http://192.168.0.107:8881/renren-fast/generator/wxapi/nav",//路径
    openid: '', //用户openid
    user_img: '', //用户头像地址
    user_name: '', //用户名字
    PlayItem: {  //当前播放歌曲信息
      id: '10086',  //歌曲id
      name: '测试歌曲', //歌曲名称
      author: '歌曲作者', //作者
      coverImgUrl: '歌曲封面',
      src: '',    //播放源
      starttime: 'loading...', //当前时长
      duration: '∞',  //总时长
      offset: 0,   //当前播放位置
      max: 100,   //总长度
      playing: true //是否正在播放  
    },
    uploadStroyData: { //准备提交的故事信息
      stroyType: null, //故事类型  绘本||原创 || 趣事
      coverImg: null,  //故事封面
      name: null, //故事名称
      label: null,  //故事标签
      src: null,  //录音文件
      storyLength: null, // 故事长度123456
      text: null, //作者感想
      time: null //上传时间
    }
  },
  //音乐播放器
  innerAudioContext: function () {
    const _this = this
    if (wx.getBackgroundAudioManager) {
      this.innerAudioContext = wx.getBackgroundAudioManager()
      const innerAudioContext = this.innerAudioContext
      // 歌曲信息
      this.switchMusic()

      //开始播放
      innerAudioContext.onPlay(() => {
        wx.hideLoading()
        console.log('开始播放')
      })
      // 监听播放
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
  switchMusic: function () {
    this.innerAudioContext.pause()  //将正在播放的歌曲暂停
    this.innerAudioContext.seek(0)  //跳转到0秒
    this.innerAudioContext.title = this.globalData.PlayItem.name
    this.innerAudioContext.epname = this.globalData.PlayItem.name
    this.innerAudioContext.singer = this.globalData.PlayItem.author
    this.innerAudioContext.coverImgUrl = this.globalData.PlayItem.coverImgUrl
    this.innerAudioContext.src = this.globalData.PlayItem.src //修改src地址
    // this.innerAudioContext.play()   //播放
  },

  //全局录音接口
  setRecorderManager: function () {
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
  resetRecorderManager: function (obj) {
    this.recorderManager.stop()
    this.recorderManager.start(obj)
  },
  request: function (it) {

    var url = 'http://192.168.0.107:8881/renren-fast/'


    wx.request({
      url: url + it.url,//请求地址
      data: it.data,
      header: it.header ? it.header : {//请求头
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: it.method,//get为默认方法/POST
      success: it.success,//请求成功
      fail: it.fail ? it.fail : function () {
        console.log('请求失败')
        wx.showToast({
          title: '服务器连接失败',  //标题
          icon: 'loading',  //图标，支持"success"、"loading"
        })
      },//请求失败
      complete: it.complete//请求完成后执行的函数
    })
  }
})