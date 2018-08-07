// pages/childStore/index/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:'',
    Address:'未设置',
    Birthday: '未设置'
  },
  gotohere:function(e){
    switch (e.currentTarget.dataset.tab){
      case '1': wx.navigateTo({
        url: '/pages/mycenter/myInformation/myName/index?name=' + this.data.userName
      })
        break;
      case '2': wx.navigateTo({
        url: '/pages/mycenter/myInformation/myAddress/index?id=' 
      })
        break;
      case '3': wx.navigateTo({
        url: '/pages/mycenter/myInformation/myBirthday/index?birthday=' + this.data.Birthday
      })
        break;
    }
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (app.globalData.openid != '') {
      wx.request({
        url: app.globalData.domain,
        data: {
          action: "getUserInfoAndAddress",
          openid: app.globalData.openid
        },
        success: function (res) {
          if (res.data.type) {
            //地址
            var Address = res.data.info.province + res.data.info.city + res.data.info.area + res.data.info.address;
            Address = Address ? Address : '未设置'
            //生日
            var Birthday = res.data.info.birthday ? new Date(res.data.info.birthday).toLocaleDateString().split('/').join('-') : '未设置'
            that.setData({
              userName: res.data.info.alias,
              Address: Address,
              Birthday: Birthday
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
                      action: "getUserInfoAndAddress",
                      openid: res.data.openid
                    },
                    success: function (res) {
                      if (res.data.type) {
                        //地址
                        var Address = res.data.info.province + res.data.info.city + res.data.info.area + res.data.info.address;
                        Address = Address ? Address : '未设置'
                        //生日
                        var Birthday = res.data.info.birthday ? new Date(res.data.info.birthday).toLocaleDateString().split('/').join('-') : '未设置'
                        that.setData({
                          userName: res.data.info.alias,
                          Address: Address,
                          Birthday: Birthday
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   this.onLoad()
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
  
})