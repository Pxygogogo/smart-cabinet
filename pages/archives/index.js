// pages/archives/index.js
const app = getApp()

Page({
  data: {
    model:[]
  },
  goToAdd(){
    wx.navigateTo({
      url: '/pages/add-archives/index',
    })
  },
  async fetchArchives() {
    const res = await app.curl.get('/archives')
    this.setData({
      'model': res,
    })
  },
  goToEdit(e){
    const _id = e.currentTarget.dataset._id;
    wx.navigateTo({
      url: `/pages/add-archives/index?_id=${_id}`,
    })
  },
  onLoad(){
    this.fetchArchives();
  }

})