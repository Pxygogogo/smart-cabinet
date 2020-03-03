const app = getApp()
Page({
  data: {
    email: ''
  },
  async bindEmail(e) {
    const {
      email
    } = e.detail.value;
    const emailREG = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (emailREG.test(email)) {
      const {
        _id
      } = wx.getStorageSync('user');
      const res = await app.curl.post('/email', {
        email,
        _id
      })
      if (res._id) {
        wx.showToast({
          title: '绑定成功',
          duration: 1500,
          success() {
            setTimeout(function() {
              wx.switchTab({
                url: '/pages/settings/index',
              })
            }, 1500)
          }
        })
      } else {
        wx.showToast({
          title: '绑定失败',
          icon: 'none'
        })
      }
    } else {
      wx.showModal({
        title: '提示',
        content: '请输入正确的邮箱格式',
        showCancel: false,
      })
    }

  },

  async fetchEmail() {
    const {
      _id
    } = wx.getStorageSync('user');
    const {email} = await app.curl.get('/email',{
      _id
    });
    if (email) {
      this.setData({
        email
      })
    }
  },

  onLoad() {
    this.fetchEmail();
  }

})