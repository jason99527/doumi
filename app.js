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
    }
  }
})