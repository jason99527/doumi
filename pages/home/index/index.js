// pages/home/index/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight:0,
    hotList:[],
    newList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this;
    //动态计算scroll-view组件的高度
    wx.getSystemInfo({
      success: function(res) {
        _this.setData({
          scrollHeight:res.windowHeight - 42
        });
      },
    })
    this.getSelectData()
  },
  // 发送搜索请求
  getSelectData: function () {
    const that = this
    wx.request({
      url: app.globalData.domain,
      data: {
        action: "getHomeStoryList"
      },
      success: function (res) {
        if (res.data.type) {
          that.setData({
            hotList: that.processData(res.data.hotList),
            newList: that.processData(res.data.newList)
          })
        } else {
          wx.showToast({
            title: res.data.msg,
          })
        }
      }
    })
  },
  // 二次处理接口数据
  processData: function (json) {
    let array = []
    for (let i in json) {
      const obj = {}
      obj.id = json[i].id
      obj.Label = (json[i].typeName !== '' && json[i].typeName !== null) ? json[i].typeName.split(',') : ''
      obj.homeImg = json[i].imgPath
      obj.itemtype = json[i].storyType === 0 ? '原创' : '绘本'
      obj.name = json[i].name
      obj.author = json[i].alias
      obj.audioSrc = json[i].audioSrc
      array.push(obj)
    }
    console.log(array)
    return array
  },
  ToPlay:function(){
    wx.navigateTo({
      url: '/pages/common/player/player?id='
    })
  },
  //跳转搜索页
  OpenInput:function(){
    const openId = app.globalData.openid
    if (openId === '') {
      this._Authorization()
    } else {
      wx.navigateTo({
        url: './search/search'
      })
    }
  },

  moreNew:function(){
    wx.navigateTo({
      url: './NewStroy/NewStroy'
    })
  },
  moreHot: function () {
    wx.navigateTo({
      url: './HotStroy/HotStroy'
    })
  },

  ToCreate:function(){
    const openId = app.globalData.openid
    if (openId === '') {
      this._Authorization()
    } else {
      wx.navigateTo({
        url: './CreateType/CreateType'
      })
    }
  },

  // 用户未登录
  _Authorization: () => {
    wx.showModal({
      title: '提示',
      content: '请先登录',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          wx.redirectTo({
            url: '/pages/home/Authorization/index?data=true'
          })
        }
      }
    })
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