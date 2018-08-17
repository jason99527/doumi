// pages/mycenter/component/userList/index.js
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
      type:Array,
      value:null
    },
    fans:{
      type:null,
      value:null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    followUser:function(e){
      var that = this
      wx.request({
        url: app.globalData.domain,
        data: {
          action: "FocusOnUsers",
          openid: app.globalData.openid,
          userid: e.target.dataset.userid
        },
        success: function (res) {
          if (res.data.type) {
            that.triggerEvent("reload")
          } else {
            wx.showToast({
              title: res.data.msg,
            })
          }
        }
      })
    },
    cancelUser:function(e){
      var that = this
      wx.request({
        url: app.globalData.domain,
        data: {
          action: "delFocusUser",
          openid: app.globalData.openid,
          userid: e.target.dataset.userid
        },
        success: function (res) {
          console.log(res)
          if (res.data.type) {
            that.triggerEvent("reload")
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
