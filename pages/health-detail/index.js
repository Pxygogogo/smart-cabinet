const app = getApp();
Page({


  data: {
    model:{}
  },
  async fethDeatil(id){
    const res = await app.curl.get('/detail',{id})
    this.setData({
      model:res
    })
  },
  onLoad (options) {
    const{id} = options;
    this.fethDeatil(id);
  },

 
})