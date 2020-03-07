const app = getApp()
let userInfo = app.user;
Page({


  data: {
    avatarUrl: app.user.avatarUrl,
    nickName: app.user.nickName
  },
  bindEmail(){
    wx.navigateTo({
      url: '/pages/email/index',
    })
  },
  goToFeedback(){
    wx.navigateTo({
      url: '/pages/feedback/index',
    })
  },
  goToAbout(){
    wx.navigateTo({
      url: '/pages/aboutus/index',
    })
  },
  goToHealth(){
    wx.navigateTo({
      url: '/pages/health/index',
    })
  },

  onLoad(options) {
    const { avatarUrl, nickName } = app.user;
    this.setData({
      avatarUrl,
      nickName,
    })
  },
  
  
})
