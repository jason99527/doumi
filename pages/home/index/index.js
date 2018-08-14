// pages/home/index/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight:0,
    hotList:[
      {
        id:1,
        homeImg:'../../../images/Home/banner.png',
        title:'放羊的小孩',
        Label:['可爱','动人','童话','公主'],
        itemtype:'原创',
        author:'取唐增的经'
      },
      {
        id: 2,
        homeImg: '../../../images/Home/banner.png',
        title: '放羊的小孩',
        Label: ['可爱', '动人', '童话', '公主'],
        itemtype: '原创',
        author: '取唐增的经'
      },
      {
        id: 3,
        homeImg: '../../../images/Home/banner.png',
        title: '放羊的小孩',
        Label: ['可爱', '动人', '童话', '公主'],
        itemtype: '原创',
        author: '取唐增的经'
      },
      {
        id: 4,
        homeImg: '../../../images/Home/banner.png',
        title: '放羊的小孩',
        Label: ['可爱', '动人', '童话', '公主'],
        itemtype: '原创',
        author: '取唐增的经'
      }
    ],
    newList: [
      {
        id: 1,
        homeImg: '../../../images/Home/banner.png',
        title: '放羊的小孩',
        Label: ['可爱', '动人', '童话', '公主'],
        itemtype: '原创',
        author: '取唐增的经'
      },
      {
        id: 2,
        homeImg: '../../../images/Home/banner.png',
        title: '放羊的小孩',
        Label: ['可爱', '动人', '童话', '公主'],
        itemtype: '原创',
        author: '取唐增的经'
      },
      {
        id: 3,
        homeImg: '../../../images/Home/banner.png',
        title: '放羊的小孩',
        Label: ['可爱', '动人', '童话', '公主'],
        itemtype: '原创',
        author: '取唐增的经'
      },
      {
        id: 4,
        homeImg: '../../../images/Home/banner.png',
        title: '放羊的小孩',
        Label: ['可爱', '动人', '童话', '公主'],
        itemtype: '原创',
        author: '取唐增的经'
      }
    ]
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