// pages/home/index/HotStroy/HotStroy.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ListType: 'new',
    List: [
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSelectData()
  },
  // 发送搜索请求
  getSelectData: function () {
    const that = this
    wx.request({
      url: app.globalData.domain,
      data: {
        action: "getHotStoryList"
      },
      success: function (res) {
        if (res.data.type) {
          that.setData({
            List: that.processData(res.data.hotList)
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
      obj.img = json[i].imgPath
      obj.type = json[i].storyType === 0 ? '原创' : '绘本'
      obj.name = json[i].name
      obj.author = json[i].alias
      obj.audioSrc = json[i].audioSrc
      array.push(obj)
    }
    console.log(array)
    return array
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