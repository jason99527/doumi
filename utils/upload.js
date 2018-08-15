/*
  ## 上传图片/音频  ##
  loadingText: loading显示提示文本 例:正在上传图片...
  URL: 后台上传接口 例:http://192.168.2.180:8881/renren-fast/generator/wxapi/creatBook
  filePath: 上传的文件临时路径
  Name: 接口名称
  formData: 附带参数
          例: 
            const formImgData = {
                'coverImg': App.globalData.uploadStroyData.coverImg,
                'openid': App.globalData.openid,
                'label': App.globalData.uploadStroyData.label,
                'storyType': App.globalData.uploadStroyData.stroyType,
                'name': App.globalData.uploadStroyData.name
            }
  调用方法:
  uploadData('正在上传图片...', Url, App.globalData.uploadStroyData.coverImg, 'coverImg', formImgData).then(res=>{
      ...
  }).catch(res=>{
      ...
  })
*/
const upLoadData = function(loadingText,URL,filePath,Name,formData = {}){
  return new Promise((resolve, reject)=>{
    wx.showLoading({
      title: loadingText,
      mask: true
    })
    const uploadTask = wx.uploadFile({
      url: URL,
      filePath: filePath,
      name: Name,
      formData: formData,
      success: function (res) {
        resolve(res)
      },
      fail: function (res) {
        reject(res)
      }
    })
  })
}

module.exports = {
  upLoadData: upLoadData
}