// pages/childStore/index/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleHeight:'',
    currentTab: 0,
    yclist:[],
    hblist: [],
    sclist:[]
  },
  catchTouchMove:function (res) {
    return false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getstory:function(_type){
    var that = this;
    if (app.globalData.openid != '') {
      wx.request({
        url: app.globalData.domain,
        data: {
          action: "selectUserStory",
          openid: app.globalData.openid,
          storyType: _type
        },
        success: function (res) {
          if (res.data.type) {
            if (_type) {
              that.setData({
                hblist: res.data.list
              })
            } else {
              that.setData({
                yclist: res.data.list
              })
            }
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
                      action: "selectUserStory",
                      openid: res.data.openid,
                      storyType: _type
                    },
                    success: function (res) {
                      if (res.data.type) {
                        if (_type){
                          that.setData({
                            hblist :  res.data.list
                          })
                        }else{
                          that.setData({
                            yclist: res.data.list
                          })
                        }
                        
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
  getCollection: function () {
    var that = this;
    if (app.globalData.openid != '') {
      wx.request({
        url: app.globalData.domain,
        data: {
          action: "selectUserCollectStory",
          openid: app.globalData.openid,
        },
        success: function (res) {
          if (res.data.type) {
              that.setData({
                sclist: res.data.list
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
                      action: "selectUserCollectStory",
                      openid: res.data.openid,
                    },
                    success: function (res) {
                      if (res.data.type) {
                          that.setData({
                            sclist: res.data.list
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
  onLoad: function (options) {
    this.getstory(0)
    this.getstory(1)
    this.getCollection()
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