// pages/feedback/index.js
const app = getApp();

Page({


  data: {
    model: {
      feedback: ''
    }
  },

  async handleSubmit(e) {
    const { feedback } = e.detail.value;
    const { _id } = wx.getStorageSync('user');
    if (feedback !== '') {
      const res = await app.curl.post('/feedback', { feedback,_id })
      if(res._id){
        wx.showToast({
          title: '反馈成功',
          duration: 1500,
          success() {
            setTimeout(function () {
              wx.switchTab({
                url: '/pages/settings/index',
              })
            }, 1500)
          }
        })
      }else{
        wx.showToast({
          title: '反馈失败',
          duration: 1500,
          success() {
            setTimeout(function () {
              wx.switchTab({
                url: '/pages/settings/index',
              })
            }, 1500)
          }
        })
      }
    } else {
      wx.showModal({
        title: '错误',
        content: '请勿提交空内容',
        showCancel: false
      })
    }
  }

})