let WxParse = require('../../wxParse/wxParse.js');
const app = getApp();
Page({


  data: {
    model: {}
  },
  async fethDeatil(id) {
    const res = await app.curl.get('/detail', {
      id
    })
    this.setData({
      model: res,
      content: ''
    })
    let that = this;
    WxParse.wxParse('content', 'html', res.content, that, 5);
  },
  onLoad(options) {
    const {
      id
    } = options;
    this.fethDeatil(id);
  },


})