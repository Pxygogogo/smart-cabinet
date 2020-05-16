const app = getApp()
let time = ['2', '3'];
const archives = [];
// let _id = '';
Page({


  data: {
    model: {
      time: '3',
      noticePerson: '',
      acrtTime: '08:30',
      durationTime:''
    },
    time: ['2', '3'],
    archives: [],
    initMedicines: [],
    current: [],
    position: 'right',
    _id: ''
  },
  methods: {
    async submitAddNotice(_id, time, medicines, noticePerson, acrtTime) {

    },
  },
  bindTimeChange: function (e) {
    this.setData({
      'model.acrtTime': e.detail.value,
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value,
      'model.time': time[e.detail.value]
    })
  },
  bindPickerChange1: function (e) {
    this.setData({
      index: e.detail.value,
      'model.noticePerson': this.data.archives[e.detail.value]
    })
  },
  handleFruitChange({
    detail = {}
  }) {
    const index = this.data.current.indexOf(detail.value);
    index === -1 ? this.data.current.push(detail.value) : this.data.current.splice(index, 1);
    this.setData({
      current: this.data.current
    });
  },
  async fetchMedicines() {
    const res = await app.curl.get('/medicines')
    if (JSON.stringify(res) === '[]') {
      wx.showModal({
        title: '提示',
        content: '请先添加药品',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/add-medicine/index',
            })
          }
        }
      })
    } else {
      this.setData({
        initMedicines: res
      })
    }

  },
  async fetchArchives() {
    const res = await app.curl.get('/archives')
    if (JSON.stringify(res) === '[]') {
      wx.showModal({
        title: '提示',
        content: '请先添加提醒对象',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/add-archives/index',
            })
          }
        }
      })
    } else {
      let archives = [];
      res.map(item => {
        archives.push(item.relation)
      })
      this.setData({
        archives
      })
    }
  },

  async handleAddNotice(e) {
    let that = this;
    const {
      time,
      acrtTime,
      noticePerson,
    } = this.data.model;
      
    const medicines = [];
    const data = e.detail.value;
    const email = wx.getStorageSync('email') || '';
    (this.data.initMedicines).map(item => {
      (this.data.current).map(i => {
        if (item.name === i) medicines.push(item)
      })
    });
    if (!time || JSON.stringify(medicines) === '[]' || !noticePerson) {
      wx.showModal({
        title: '提示',
        content: '请完善信息后提交',
        showCancel: false
      })
    } else if (email === '') {
      wx.showModal({
        title: '温馨提示',
        content: '绑定邮箱后可获取提醒通知，是否绑定？',
        async success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/email/index',
            })
          } else if (res.cancel) {
            const res = await app.curl.post('/notices', {
              _id: data._id,
              time,
              medicines,
              noticePerson,
              acrtTime,
              durationTime:data.durationTime
            });
            if (res._id && that.data._id === '') {
              wx.showToast({
                title: '添加成功',
                duration: 1500,
                success() {
                  setTimeout(function () {
                    wx.switchTab({
                      url: '/pages/index/index',
                      success(e) {
                        var page = getCurrentPages().pop();
                        if (page == undefined || page == null) return;
                        page.onLoad();
                      }
                    })
                  }, 1500)
                }
              })
            } else {
              wx.showToast({
                title: '修改成功',
                duration: 1500,
                success() {
                  setTimeout(function () {
                    wx.switchTab({
                      url: '/pages/index/index',
                      success(e) {
                        var page = getCurrentPages().pop();
                        if (page == undefined || page == null) return;
                        page.onLoad();
                      }
                    })
                  }, 1500)
                }
              });
            }
          }
        }
      })
    } else {
      const res = await app.curl.post('/notices', {
        _id: data._id,
        time,
        medicines,
        noticePerson,
        acrtTime,
        durationTime:data.durationTime
        
      });
      if (res._id && that.data._id === '') {
        wx.showToast({
          title: '添加成功',
          duration: 1500,
          success() {
            setTimeout(function () {
              wx.switchTab({
                url: '/pages/index/index',
                success(e) {
                  var page = getCurrentPages().pop();
                  if (page == undefined || page == null) return;
                  page.onLoad();
                }
              })
            }, 1500)
          }
        })
      } else {
        wx.showToast({
          title: '修改成功',
          duration: 1500,
          success() {
            setTimeout(function () {
              wx.switchTab({
                url: '/pages/index/index',
                success(e) {
                  var page = getCurrentPages().pop();
                  if (page == undefined || page == null) return;
                  page.onLoad();
                }
              })
            }, 1500)
          }
        });
      }
    }

  },
  async fetchDataById(id) {
    const res = await app.curl.get(`/notices${id}`)
    let current = [];
    if (res.medicines) {
      res.medicines.map(item => {
        current.push(item.name)
      })
    }
    this.setData({
      'model': res,
      current,
    })
  },

  del(e) {
    const {
      _id
    } = e.currentTarget.dataset;
    wx.showModal({
      title: '删除警告',
      content: `确定删除吗？`,
      async success(res) {
        if (res.confirm) {
          const res = await app.curl.delete('/notices', {
            _id
          })
          if (res._id) {
            wx.showToast({
              title: '删除成功',
              duration: 1500,
              success() {
                setTimeout(function () {
                  wx.switchTab({
                    url: '/pages/index/index',
                    success(e) {
                      var page = getCurrentPages().pop();
                      if (page == undefined || page == null) return;
                      page.onLoad();
                    }
                  })
                }, 1500)
              }
            })
          }
        } else {
          wx.showModal({
            title: '错误',
            content: '删除失败',
            complete() {
              wx.switchTab({
                url: '/pages/index/index',
                success(e) {
                  var page = getCurrentPages().pop();
                  if (page == undefined || page == null) return;
                  page.onLoad();
                }
              })
            }
          })
        }
      }
    })
  },

  onLoad(options) {
    if (options._id) {
      this.setData({
        _id: options._id
      })
      this.fetchDataById(options._id)
      this.fetchMedicines();
    } else {
      this.fetchMedicines();
      this.fetchArchives();
    }
  },

})