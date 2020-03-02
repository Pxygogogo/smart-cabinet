const app = getApp()

Page({
  data: {
    model: [],
    activeIndex: 0,
    VerticalNavTop: 0,
    TabCur: 0,
    classification: [
      { title: "全部药品" },
      { title: "感冒用药" },
      { title: "肠胃用药" },
      { title: "跌打损伤" },
      { title: "皮肤用药" },
      { title: "儿童用药" },
      { title: "其他药品" },

    ],

  },
  goToAdd() {
    wx.navigateTo({
      url: '/pages/add-medicine/index',
    })
  },
  goToSearch() {
    wx.navigateTo({
      url: '/pages/search/index',
    })
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
  async fetchTypeMedicine(type) {
    const res = await app.curl.get(`/medicines?query=${type}`)
    this.setData({
      'model': res,
    })
  },

  onLoad: function (options) {
    //请求药品数据
    this.fetchMedicine();
    var that = this;
    //调用getSystemInfo APi获取到用户的手机屏幕高度，动态设置scroll-view的高度
    // 还有缺陷，代改进
    wx.getSystemInfo({
      success(res) {

        // var heightleft = (res.windowHeight*2);
        var height = (res.windowHeight * 2);

        that.setData({
          phoneHeight: height,
        })
      }
    })
  },

  // 侧边栏的点击事件
  switchClassify: function (e) {
    const type = e.currentTarget.dataset.type;
    this.fetchTypeMedicine(type);
    var that = this;
    that.setData({
      VerticalNavTop: (e.currentTarget.dataset.index - 1) * 50,
      activeIndex: e.currentTarget.dataset.index,
      TabCur: e.currentTarget.dataset.id,
    })
  },
})