// pages/search/index.js
const app = getApp()
Page({

  
  data: {
    model:[]
  },
  goToEdit(e) {
    const _id = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: `/pages/add-medicine/index?_id=${_id}`,
    })
  },
  async fetchMedicine() {
    const res = await app.curl.get('/medicines')
    this.setData({
      'model': res,
    })
  },
  async handleSearch(e) {
    const res = await app.curl.get('/medicines', { query: e.detail.value })
    if(res!=[]){
      this.setData({
        'model': res
      })
    }else{
      wx.showToast({
        title: '没有匹配项',
      })
    }
    
  },
  onLoad(){
    this.fetchMedicine();
  }
})