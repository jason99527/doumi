// pages/home/index/search/search.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:'',
    Vswitch:false,
    scrollHeight:0,
    hotSearchList:[],
    userSearchList:[],
    selectList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this;
    if (wx.createSelectorQuery){
      //获取头部输入框高度
      wx.createSelectorQuery().select('.Input').boundingClientRect(function (rect){
        //动态计算scroll-view组件的高度
        wx.getSystemInfo({
          success: function (res) {
            _this.setData({
              scrollHeight: res.windowHeight - rect.height
            });
          },
        })
      }).exec()
    }else{
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
    
    this._getData()
  },
  //获取搜索词汇
  _getData:function(){
    const _this = this
    wx.request({
      url: app.globalData.domain,
      data: {
        action: "getSearchList",
        openid: app.globalData.openid
      },
      success: function (res) {
        if (res.data.type) {
          _this.setData({
            hotSearchList: res.data.hotSearchList,
            userSearchList: res.data.userSearchList
          })
        } else {
          wx.showToast({
            title: res.data.msg,
          })
        }
      }
    })
  },
  // 输入框 输入
  setValue:function(e){
    if (e.detail.value === ''){
      this.setData({
        value: ''
      })
    }
  },
  //输入框 完成按钮
  input:function(e){
    this.setData({
      value: e.detail.value
    })
    if (e.detail.value !== ''){
      this.getSelectData(e.detail.value)
      console.log('搜索结果差作者名称 标签')
    }
  },
  // <!--返回首页按钮--> 改为搜索按钮
  BackIndex:function(e){
    this.setData({
      value: e.detail.value.text
    })
    if (e.detail.value.text !== ''){
      this.getSelectData(e.detail.value.text)
    }
  },
  // 点击标签
  clickSelect:function(e){
    const text = e.currentTarget.dataset.text
    this.setData({
      value: text
    })
    this.getSelectData(text)
  },
  // 发送搜索请求
  getSelectData:function(name){
    const that = this
    wx.request({
      url: app.globalData.domain,
      data: {
        action: "searchStory",
        openid: app.globalData.openid,
        name: name
      },
      success: function (res) {
        if (res.data.type) {
          console.log(res.data)
          that.setData({
            selectList: that.processData(res.data.list)
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
  processData:function(json){
    let array = []
    for (let i in json){
      const obj = {}
      obj.id = json[i].id
      obj.typeName = (json[i].typeName !== '' && json[i].typeName !== null) ? json[i].typeName.split(',') : ''
      obj.imgPath = json[i].imgPath
      obj.type = json[i].storyType
      obj.name = json[i].name
      obj.alias = json[i].alias
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