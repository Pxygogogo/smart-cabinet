const app = getApp();


Page({
  
  data: {

  },

  handleLogin({ detail }) {
    if (!~detail.errMsg.indexOf(':ok')) {
      wx.showModal({
        title: '错误',
        content: '请允许获取用户信息',
        showCancel: false
      });
      return;
    }
    wx.login({
      async success({ code }) {
        const res = await app.curl.post('/auth/login', { code, userInfo: detail.userInfo });
        if (res.code === 0) {
          wx.showToast({
            title: '登录成功',
            icon: 'success'
          });
          const { token, user } = res;
          app.user = user;
          wx.setStorageSync('user', user);
          wx.setStorageSync('token', token);
          wx.switchTab({
            url: '/pages/index/index',
          });
        } else {
          wx.showModal({
            title: '错误',
            content: '登录失败',
            showCancel: false
          });
          
        }
      },
    });
  },

  async handleFetchUserInfo() {
    const res = await app.curl.get('/users/current-user');
    console.log(res);
  },
  
  onLoad(){
    if (wx.getStorageSync('token')){
      wx.switchTab({
        url: '/pages/index/index',
      });
    }
  }
  
})