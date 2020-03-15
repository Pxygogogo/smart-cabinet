// pages/add-medicine/index.js
const app = getApp();
import {
  BASE_URL
} from '../../config.js'
const medicineArr = ['感冒用药', '肠胃用药', '跌打损伤', '皮肤用药', '儿童用药', '其他药品'];
const items = ['无', '饭后', '饭前'];
// let _id = '';
Page({

  data: {
    model: {
      type: '感冒用药',
      medicineImg: '/images/upload_img.svg',
      beforeEat: '无',
      effectiveDate: '',
      quantity: ''
    },
    ways: items,
    medicineType: medicineArr,
    index: 0,
    _id: ''
  },
  bindPickerChange1: function(e) {
    this.setData({
      index: e.detail.value,
      'model.type': medicineArr[e.detail.value]
    })
  },
  bindPickerChange2: function(e) {
    this.setData({
      index: e.detail.value,
      'model.beforeEat': items[e.detail.value]
    })
  },
  chooseImg() {
    let that = this;
    wx.chooseImage({
      count: 1,
      success: function(res) {
        const tempFilePath = res.tempFilePaths;
        wx.uploadFile({
          url: `${BASE_URL}/upload`,
          filePath: tempFilePath[0],
          name: 'file',
          header: {
            "Content-Type": "multipart/form-data" //记得设置
          },
          success(res) {
            that.setData({
              'model.medicineImg': JSON.parse(res.data).url
            })
          }
        })
      },
    })
  },
  radioChange(e) {
    this.setData({
      'model.beforeEat': e.detail.value,
    })
  },
  myShowToast(title) {
    wx.showToast({
      title,
      duration: 1500,
      success() {
        setTimeout(function() {
          wx.switchTab({
            url: '/pages/medicine-box/index',
            success(e) {
              var page = getCurrentPages().pop();
              if (page == undefined || page == null) return;
              page.onLoad();
            }
          })
        }, 1500)
      }
    });
  },
  async handleAddMedicine(e) {
    let that = this;
    const data = e.detail.value;
    if (data.name  && data.package && data.medicineImg) {
      const res = await app.curl.post('/medicines', data);
      if (res._id && this.data._id === '') {
        wx.showModal({
          title: '提示',
          content: '继续添加？',
          async success(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/add-medicine/index',
              })
            } else if (res.cancel) {
              const res = await app.curl.post('/adddone', {
                message: 'add done'
              });
              if (res === "failed") {
                wx.showToast({
                  title: '添加完成指令发送给药箱失败！',
                  icon: 'none'
                })
              }
              wx.switchTab({
                url: '/pages/medicine-box/index',
                success(e) {
                  var page = getCurrentPages().pop();
                  if (page == undefined || page == null) return;
                  page.onLoad();
                }
              })
            }
          }
        })
      } else if (res.code === -1) {
        wx.showModal({
          title: '添加失败',
          content: res.msg,
        })
      } else {
        this.myShowToast('修改成功');
      }
    } else {
      wx.showToast({
        title: '带星号的为必填项！',
        icon: 'none',
      })
    }
  },
  async fetchDataById(id) {
    const res = await app.curl.get(`/medicines${id}`)
    this.setData({
      'model': res
    })

  },
  del(e) {
    let that = this;
    const {
      _id,
      name
    } = e.currentTarget.dataset;
    wx.showModal({
      title: '删除警告',
      content: `确定删除药品「${name}」吗？`,
      async success(res) {
        if (res.confirm) {
          const res = await app.curl.delete('/medicines', {
            _id
          })
          if (res._id) {
            that.myShowToast('删除成功');
          }
        } else {

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
    }
  }

})