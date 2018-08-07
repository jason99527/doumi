const app = getApp();
// pages/childStore/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    name:null,
    phone:null,
    region: ['广东省', '深圳市', '南山区'],
    address:null,
    ifupdate:false
  },
  bindPickerCity: function (e) {
    console.log("选择的城市:", e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  votename:function(e){
    this.data.name = e.detail.value
  },
  votephone: function (e) {
    this.data.phone = e.detail.value
  },
  voteaddress: function (e) {
    this.data.address = e.detail.value
  },
  updata:function(){
    if (this.data.name && this.data.phone && this.data.address){
      if(this.data.ifupdate){
        wx.request({
          url: app.globalData.domain,
          data: {
            action: "changeUserAddress",
            id:this.data.id,
            openid: app.globalData.openid,
            name: this.data.name,
            phone: this.data.phone,
            province: this.data.region[0],
            city: this.data.region[1],
            area: this.data.region[2],
            address: this.data.address
          },
          success: function (res) {
            if (res.data.type) {
              wx.showModal({
                title: '成功',
                content: '修改成功',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    wx.navigateBack();
                  }
                }
              })
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
      }else{
        wx.request({
          url: app.globalData.domain,
          data: {
            action: "saveUserAddress",
            openid: app.globalData.openid,
            name:this.data.name,
            phone:this.data.phone,
            province: this.data.region[0],
            city: this.data.region[1],
            area: this.data.region[2],
            address: this.data.address
          },
          success: function (res) {
            if (res.data.type) {
                wx.showModal({
                  title: '成功',
                  content: '添加成功',
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                      wx.navigateBack();
                    }
                  }
                })  
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
    }else{
      wx.showModal({
        title: '提示',
        content: '请确保每一项都不为空',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }
  },
    /**
     *    * 生命周期函数--监听页面加载
     *    */
     
  onLoad: function (options) {
    var that = this;
      if(options.data!=null){
        var data = JSON.parse(options.data)
        that.setData({
            id:data.id,
            name: data.name,
            phone: data.phone,
            region: [data.province, data.city, data.area] ,
            address: data.address,
            ifupdate : true
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
  
  }, 
  
})