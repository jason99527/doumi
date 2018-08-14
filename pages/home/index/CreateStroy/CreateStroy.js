// pages/home/index/CreateStroy/CreateStroy.js
const App = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:0,
    label:[],
    Image:null, //上传的图片
    name:null, //故事名称
    type:null //故事类型
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.type = options.type
    this.getSelectData()
  },
  // 发送请求获取标签
  getSelectData: function () {
    const that = this
    wx.request({
      url: App.globalData.domain,
      data: {
        action: "home55",
        openid: App.globalData.openid
      },
      success: function (res) {
        if (res.data.type) {
          that.setData({
            label: that.processData(res.data.list)
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
    let tab = 0
    for (let i in json) {
      if (json[i].isDel)
        continue
      tab ++
      const obj = {}
      obj.tab = tab === 1 ? true : false
      obj.id = json[i].id
      obj.text = json[i].name
      array.push(obj)
    }
    console.log(array)
    return array
  },
  //选择标签
  tab:function(e){
    //获取当前已选择标签的个数
    const TabList = this.data.label.filter(
      item => {
        return item.tab
      }
    )
    //如果已经选择了四个标签 并且还在继续添加标签
    if (!this.data.label[e.currentTarget.dataset.num].tab && TabList.length > 3){
      wx.showModal({
        content: '最多只能选择四个标签哦'
      })
      return;
    }
    //存储当前选择的对象对应的数组
    const List = `label[${e.currentTarget.dataset.num}].tab`
    //存储当前选择对象的tab值
    const Tab = this.data.label[e.currentTarget.dataset.num].tab
    //修改tab值
    this.setData({
      [List]: !Tab
    })
  },
  // 选择图片
  chooseImage:function(){
    const _this = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        _this.setData({
          Image: res.tempFilePaths[0]
        })
      },
      complete:function(){
        //由于调用拍照和图片会暂停播放 所以选择后需重新播放音乐
        if (App.globalData.PlayItem.playing) {
          App.innerAudioContext.play() //播放
          App.globalData.PlayItem.playing = true
        }
      }
    })
  },
  //输入框
  input:function(e){
      this.setData({
        name: e.detail.value
      })
  },
  //开始录制按钮
  upload:function(){
    //定义标签容器
    let LabelList = []
    const Data = this.data
    //微信弹窗接口
    const alert = this.alert
    //全局变量
    const ListData = App.globalData.uploadStroyData
    //获取选中的标签
    const TabList = Data.label.filter(
      item => {return item.tab}
    )
    //判断输入信息是否符合
    switch ((Data.name === null && 1) ||
      (Data.name.length < 6 && 2) ||
      (Data.name.indexOf(' ') !== -1 && 3) ||
      (TabList.length === 0 && 4) ||
      (Data.Image === null && 5) || 0)
    {
      case 1:
        alert('请输入故事名称')
        return;
      case 2:
        alert('故事名称不得少于6个字符')
        return;
      case 3:
        alert('故事名称不能出现空格')
        return;
      case 4:
        alert('最少需要选择一个标签哦')
        return;
      case 5:
        alert('请上传故事封面')
        return;
    }
    //提取选择的标签内容
    [].forEach.call(TabList,e=>{
      LabelList.push(e.text)
    })
    //存储信息
    ListData.stroyType = Data.type
    ListData.coverImg = Data.Image
    ListData.name = Data.name
    ListData.label = LabelList.join()
    //跳转页面
    wx.navigateTo({
      url: '/pages/common/record/record'
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  alert(text){
    wx.showModal({
      content: text
    })
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