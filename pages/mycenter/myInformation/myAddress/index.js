const app = getApp();
// pages/childStore/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:null
  },
  getUserName:function(){
    
  },
  voteTitle:function(e){
    this.data.username = e.detail.value
  },
  updata:function(e){
    var i = e.target.dataset.i;
    var data = this.data.list[i];
    var item = {
      id : data.id,
      name : data.name,
      phone : data.phone,
      province: data.province,
      city: data.city,
      area: data.area,
      address: data.address
    }
    wx.navigateTo({
      url: '/pages/mycenter/myInformation/myAddress/add/index?data=' + JSON.stringify(item)
    })
  },
  insert:function(){
    wx.navigateTo({
      url: '/pages/mycenter/myInformation/myAddress/add/index'
    });
  },
  delete:function(e){
    var that = this
    wx.showModal({
      title: '提示',
      content: '确认删除该地址',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.domain,
            data: {
              action: "delUserAddress",
              id: e.target.dataset.id,
              openid: app.globalData.openid,
            },
            success: function (res) {
              if (res.data.type) {
                that.onLoad()
                } else {
                wx.showModal({
                  title: '提示',
                  content: res.data.msg,
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {

                    }
                  }
                })
              }
            }
          })
        }
      }
    })
  },
    /**
     *    * 生命周期函数--监听页面加载
     *    */
  updatedefault:function(e){
    var that = this
    wx.request({
      url: app.globalData.domain,
      data: {
        action: "changeUserDefaultAddress",
        openid: app.globalData.openid,
        id: e.target.dataset.id
      },
      success: function (res) {
        if (res.data.type) {
          wx.showToast({
            title: '设置成功',
          })
        } else {
          wx.showToast({
            title: res.data.msg,
          })
        }
        that.onLoad(); 
      }
    })
  },  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if(app.globalData.openid != '') {
      wx.request({
        url: app.globalData.domain,
        data: {
          action: "getUserAddressList",
          openid: app.globalData.openid
        },
        success: function (res) {
          if (res.data.type) {
            that.setData({
              list: res.data.list
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
                      action: "getUserAddressList",
                      openid: res.data.openid
                    },
                    success: function (res) {
                      if (res.data.type) {
                        that.setData({
                          list:res.data.list
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