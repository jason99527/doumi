var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    follo_list:[],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserFocusUser(false);
  },
  getUserFocusUser: function (_type) {
    var that = this;
    if (app.globalData.openid != '') {
      wx.request({
        url: app.globalData.domain,
        data: {
          action: "getUserFocusUser",
          openid: app.globalData.openid,
          fans: _type
        },
        success: function (res) {
          if (res.data.type) {
              that.setData({
                follo_list: res.data.list
              })
          } else {
            wx.showToast({
              title: res.data.msg,
            })
          }
        }
      })
    } else {
      wx.login({
        success: function (res) {
          if (res.code) {
            wx.request({
              url: app.globalData.domain,
              data: {
                action: "getOpenId",
                code: res.code
              },
              success: function (res) {
                if (res.data.type) {
                  wx.request({
                    url: app.globalData.domain,
                    data: {
                      action: "getUserFocusUser",
                      openid: res.data.openid,
                      fans: _type
                    },
                    success: function (res) {
                      if (res.data.type) {
                          that.setData({
                            follo_list: res.data.list
                          })
                        

                      } else {
                        wx.showToast({
                          title: res.data.msg,
                        })
                      }
                    }
                  })
                } else {
                  wx.showToast({
                    title: res.data.msg,
                  })
                }
              }
            })
          }
        }
      })
    }
  },
  reloadlist:function(){
    this.onLoad()
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