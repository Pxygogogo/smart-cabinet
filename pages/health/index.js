// pages/health/index.js
Page({


  data: {
    page: 1
  },

  onReachBottom: function () {
    this.setData({
      page: this.data.page + 1
    })
  },


})