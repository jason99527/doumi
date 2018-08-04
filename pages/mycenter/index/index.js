
// pages/mycenter/index/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_img: '',
    user_name: ''
  },
  TomyAttention: function (e) {
    if(e.target.dataset.type =='follow')
      wx.navigateTo({
        url: '/pages/mycenter/myAttention/index?id='
      })
    else if (e.target.dataset.type == 'fans')
      wx.navigateTo({
        url: '/pages/mycenter/myFans/index?id='
      })
    else if (e.target.dataset.type == 'news')
      wx.navigateTo({
        url: '/pages/mycenter/myNews/index?id='
      })
  },
  Myinformation:function(){
    wx.navigateTo({
      url: '/pages/mycenter/myInformation/index?id='
    })
  },
  myWealth:function(){
    wx.navigateTo({
      url: '/pages/mycenter/myWealth/index?id='
    })
  },
  myStory: function () {
    wx.navigateTo({
      url: '/pages/mycenter/myStory/index?id='
    })
  },
  About:function(){
    wx.navigateTo({
      url: '/pages/mycenter/About/index?id='
    })
  },
  Sign: function () {
    wx.navigateTo({
      url: '/pages/mycenter/Sign/index?id='
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if(app.globalData.openid!=''){
      app.request({
        url: "generator/wxapi/nav",
        data: {
          action: "getUserInfo",
          openid: app.globalData.openid
        },
        success: function (res) {
          that.setData({
            user_img: res.data.info.header,
            user_name: res.data.info.alias
          })
        }
      })
    }else{
      wx.login({
        success: function (res) {
          if (res.code) {
            app.request({
              url: "generator/wxapi/nav",
              data: {
                action: "getOpenId",
                code: res.code
              },
              success: function (res) {
                app.request({
                  url: "generator/wxapi/nav",
                  data: {
                    action: "getUserInfo",
                    openid: res.data.openid
                  },
                  success: function (res) {
                    that.setData({
                      user_img: res.data.info.header,
                      user_name: res.data.info.alias
                    })
                  }
                })
              }
            })
          }
        }
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
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
  
  }

})