const app = getApp();
Page({

  
  data: {
    model:''
  },
  goToAdd(){
    wx.navigateTo({
      url: '/pages/add-notice/index',
    })
  },
  async fetchNotice(type) {
    const res = await app.curl.get(`/notices`)
    if(JSON.stringify(res)!=='[]'){
      this.setData({
        'model': res,
      })
    } 
  },
  goToEdit(e) {
    const _id = e.currentTarget.dataset._id;
    wx.navigateTo({
      url: `/pages/add-notice/index?_id=${_id}`,
    })
  },
  onLoad(){
    let token = wx.getStorageSync('token');
    if(!token){
      wx.redirectTo({
        url: '/pages/login/index',
      })
    }else{
      this.fetchNotice();
    }
    
  },
  onShow(){

  }

})