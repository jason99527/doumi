// pages/home/index/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _is:null//判断数据库是否有数据
  },

  onGotUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      if(that.data._is=="true"){
        //没有授权缓存的用户
        app.request({
          url: 'generator/dmuser/update',
          data: {
            id: app.globalData.id,
            header: e.detail.userInfo.avatarUrl
          },
          method: 'POST',
          success: function () {
            wx.showToast({
              title: '注册成功',
              icon: 'success',
              duration: 2000
            })
            wx.switchTab({  //授权成功后，跳转进入小程序首页
              url: '/pages/home/index/index'
            })
          }
        })
      }else{
        //插入登录的用户的相关信息到数据库
        app.request({
          url:'generator/dmuser/save',
          data:{
            openid:app.globalData.openid,
            alias:e.detail.userInfo.nickName,
            header: e.detail.userInfo.avatarUrl,
          },
          method:'POST',
          header:{
            "Content-Type": "application/json;charset=UTF-8"
          },
          success:function(res){
            if(res.data.type){ 
              //注册成功
              wx.showToast({
                title: '注册成功',
                icon: 'success',
                duration: 2000
              })
              wx.switchTab({  //授权成功后，跳转进入小程序首页
                url: '/pages/home/index/index'
              })
            }else{
              //注册失败
              wx.showToast({
                title: '注册失败',
                icon: 'loading',
                duration: 2000
              })
            }
          }
        })
      }
      
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      _is:options.data
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