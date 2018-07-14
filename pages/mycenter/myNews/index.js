// pages/childStore/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleHeight:'',
    currentTab: 0,
    noticeList:[{
      header:'/images/test_header.jpg',
      username:'2018/6/10',
      time:'逗迷小助手',
      content:'Hello，经过逗迷的坚持不懈，推出了《一个小矮人的传奇法师梦想》 仅供参考'
      }, {
        header: '/images/test_header.jpg',
        username: '2018/6/10',
        time: '逗迷小助手',
        content: 'Hello，经过逗迷的坚持不懈，推出了《一个小矮人的传奇法师梦想》 仅供参考'
        }, {
          header: '/images/test_header.jpg',
          username: '2018/6/10',
          time: '逗迷小助手',
          content: 'Hello，经过逗迷的坚持不懈，推出了《一个小矮人的传奇法师梦想》 仅供参考'
      }, {
        header: '/images/test_header.jpg',
        username: '2018/6/10',
        time: '逗迷小助手',
        content: 'Hello，经过逗迷的坚持不懈，推出了《一个小矮人的传奇法师梦想》 仅供参考'
        }, {
          header: '/images/test_header.jpg',
          username: '2018/6/10',
          time: '逗迷小助手',
          content: 'Hello，经过逗迷的坚持不懈，推出了《一个小矮人的传奇法师梦想》 仅供参考'
      }],
    commentList: [{
      header: '/images/test_header.jpg',
      time: '2018/6/10',
      name: '取唐僧的经',
      bgmSrc: 'http://m10.music.126.net/20180713151834/18d223be0c749fc22eb3e49fcc2c1d96/ymusic/f5dd/37ab/c653/65577d165e6066b3fec8269417d31ad0.mp3'
    }],
    callmeList: [{
      header: '/images/test_header.jpg',
      time: '2018/6/10',
      name: '取唐僧的经',
      bgmSrc: 'http://m10.music.126.net/20180713151834/18d223be0c749fc22eb3e49fcc2c1d96/ymusic/f5dd/37ab/c653/65577d165e6066b3fec8269417d31ad0.mp3'
      }, {
        header: '/images/test_header.jpg',
        time: '2018/6/10',
        name: '取唐僧的经',
        bgmSrc: 'http://m10.music.126.net/20180713151834/18d223be0c749fc22eb3e49fcc2c1d96/ymusic/f5dd/37ab/c653/65577d165e6066b3fec8269417d31ad0.mp3'
        }, {
          header: '/images/test_header.jpg',
          time: '2018/6/10',
          name: '取唐僧的经',
          bgmSrc: 'http://m10.music.126.net/20180713151834/18d223be0c749fc22eb3e49fcc2c1d96/ymusic/f5dd/37ab/c653/65577d165e6066b3fec8269417d31ad0.mp3'
      }, {
        header: '/images/test_header.jpg',
        time: '2018/6/10',
        name: '取唐僧的经',
        bgmSrc: 'http://m10.music.126.net/20180713151834/18d223be0c749fc22eb3e49fcc2c1d96/ymusic/f5dd/37ab/c653/65577d165e6066b3fec8269417d31ad0.mp3'
        }, {
          header: '/images/test_header.jpg',
          time: '2018/6/10',
          name: '取唐僧的经',
          bgmSrc: 'http://m10.music.126.net/20180713151834/18d223be0c749fc22eb3e49fcc2c1d96/ymusic/f5dd/37ab/c653/65577d165e6066b3fec8269417d31ad0.mp3'
      }, {
        header: '/images/test_header.jpg',
        time: '2018/6/10',
        name: '取唐僧的经',
        bgmSrc: 'http://m10.music.126.net/20180713151834/18d223be0c749fc22eb3e49fcc2c1d96/ymusic/f5dd/37ab/c653/65577d165e6066b3fec8269417d31ad0.mp3'
        }, {
          header: '/images/test_header.jpg',
          time: '2018/6/10',
          name: '取唐僧的经',
          bgmSrc: 'http://m10.music.126.net/20180713151834/18d223be0c749fc22eb3e49fcc2c1d96/ymusic/f5dd/37ab/c653/65577d165e6066b3fec8269417d31ad0.mp3'
      }, {
        header: '/images/test_header.jpg',
        time: '2018/6/10',
        name: '取唐僧的经',
        bgmSrc: 'http://m10.music.126.net/20180713151834/18d223be0c749fc22eb3e49fcc2c1d96/ymusic/f5dd/37ab/c653/65577d165e6066b3fec8269417d31ad0.mp3'
        }, {
          header: '/images/test_header.jpg',
          time: '2018/6/10',
          name: '取唐僧的经',
          bgmSrc: 'http://m10.music.126.net/20180713151834/18d223be0c749fc22eb3e49fcc2c1d96/ymusic/f5dd/37ab/c653/65577d165e6066b3fec8269417d31ad0.mp3'
    }],
    praisedList:[{
      header: '/images/test_header.jpg',
      time: '2018/6/10',
      name: '取唐僧的经'
    }]
  },
  catchTouchMove:function (res) {
    return false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var query = wx.createSelectorQuery();
    var that = this;
    query.select('.swiper-tab').boundingClientRect(function (rect) { 
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            titleHeight: res.windowHeight - rect.height
          });
        },
      })
    }).exec()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }, 
  clickTab: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.data.currentTab = e.target.dataset.current
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  ReachBottom: function () {
    var _this =this
    switch (parseInt(_this.data.currentTab)){
      case 0:break;
      case 1:
        
      break;
      case 2:
        _this.data.callmeList.push({
          header: '/images/test_header.jpg',
          time: '2018/6/10',
          name: '取唐僧的经',
          bgmSrc: 'http://m10.music.126.net/20180713151834/18d223be0c749fc22eb3e49fcc2c1d96/ymusic/f5dd/37ab/c653/65577d165e6066b3fec8269417d31ad0.mp3'
        }, {
            header: '/images/test_header.jpg',
            time: '2018/6/10',
            name: '取唐僧的经',
            bgmSrc: 'http://m10.music.126.net/20180713151834/18d223be0c749fc22eb3e49fcc2c1d96/ymusic/f5dd/37ab/c653/65577d165e6066b3fec8269417d31ad0.mp3'
          }, {
            header: '/images/test_header.jpg',
            time: '2018/6/10',
            name: '取唐僧的经',
            bgmSrc: 'http://m10.music.126.net/20180713151834/18d223be0c749fc22eb3e49fcc2c1d96/ymusic/f5dd/37ab/c653/65577d165e6066b3fec8269417d31ad0.mp3'
          })
      break;
    }
   
    _this.setData({ callmeList: _this.data.callmeList })
  }
  
})