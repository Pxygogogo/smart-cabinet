const app = getApp();
Component({
  properties: {
    page: {
      type: Number,
      value: '',
      observer: function (newVal, oldVal) {
        this.fetchHealthNews(newVal);
      }
    }
  },

  data: {
    model: []
  },

  methods: {
    async fetchHealthNews(page) {
      const res = await app.curl.get('/health-news', { page })
      if (page === 1) {
        this.setData({
          model: res
        })
      } else {
        this.setData({
          model: this.data.model.concat(res)
        })
      }
    },
    goToDetail(e) {
      const { id } = e.currentTarget.dataset;
      wx.navigateTo({
        url: `/pages/health-detail/index?id=${id}`,
      })
    }
  },
  



})