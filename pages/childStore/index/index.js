// pages/childStore/index/index.js
const App = getApp()

const util = require('../../../utils/util.js')
const formatTime = util.formatTime

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: 0,
    lodaing:false,
    List:[
     
    ],
    user:{
      img:'../../../images/childStore/myPortrait.png',
      name:'loading...'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this;
    //动态计算scroll-view组件的高度
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          scrollHeight: res.windowHeight
        });
      },
    })

    // 发布完故事跳转到我的故事页
    if (options.from === 'share') {
      wx.navigateTo({
        url: '/pages/childStore/myShare/myShare'
      })
    }

    this.setData({
      user: {
        img: App.globalData.user_img,
        name: App.globalData.user_name
      }
    })

    //获取最新数据
    this._getData()
  },

  scrollButton:function(){
    // console.log('上拉')
    this._getData(1)
    // this.setData({loading:true})
    wx.showLoading({
      title: '正在刷新数据',
    })
  },
  _getData:function(scroll){
    const that = this
    wx.request({
      url: App.globalData.domain,
      data: {
        action: "mc1",
        openid: App.globalData.openid
      },
      success: function (res) {
        // console.log(res)
        if (res.data.type) {
          that.setData({
            List: that.processData(res.data.list)
          })
        } else {
          wx.showToast({
            title: res.data.msg,
          })
        }
        if (scroll){
          setTimeout(() => {
            wx.hideLoading()
            wx.showToast({
              title: '数据刷新成功',
              icon: 'success',
              duration: 1200
            })
          }, 300)
        }
      }
    })
  },
  // 处理数据
  processData: function (json) {
    let array = []
    for (let i in json) {
      const obj = {}
      obj.id = json[i].id
      obj.author = '缺少作者数据'
      obj.time = this.disposeTime(json[i].createTime)
      obj.comment = '缺少评论数据'
      obj.like = json[i].giveLikeNum
      obj.title = json[i].name
      obj.text = json[i].message.split('#hc').join('\n');
      obj.imgPath = json[i].imgPath
      array.push(obj)
    }
    // console.log(array)
    return array
  },

  // 处理时间
  disposeTime:function(time){
    var dateBegin = new Date(time.replace(/-/g, "/"));//将-转化为/，使用new Date
    var dateEnd = new Date();//获取当前时间
    var dateDiff = dateEnd.getTime() - dateBegin.getTime();//时间差的毫秒数
    var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
    var leave1 = dateDiff % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000))//计算出小时数
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000)    //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000))//计算相差分钟数
    //计算相差秒数
    var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000)

    switch (
      (dayDiff > 0 && 0) || 
      (hours > 0 && 1) || 
      (minutes > 0 && 2) || 3
    ){
      case 0:
        return dayDiff+'天前'
      case 1:
        return hours + '小时前'
      case 2:
        return minutes + '分钟前'
      case 3:
        return seconds + '秒前'
    }
    // console.log(" 相差 " + dayDiff + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒")
    // console.log(dateDiff + "时间差的毫秒数", dayDiff + "计算出相差天数", leave1 + "计算天数后剩余的毫秒数"
    //   , hours + "计算出小时数", minutes + "计算相差分钟数", seconds + "计算相差秒数");
  },

  GoRecord:function(){
    const openId = App.globalData.openid
    if (openId === '') {
      this._Authorization()
    } else {
      wx.navigateTo({
        url: '/pages/common/record/record?from=childStore'
      })
    } 
  },

  GoMyShare:function(){
    wx.navigateTo({
      url: '/pages/childStore/myShare/myShare'
    })
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
})