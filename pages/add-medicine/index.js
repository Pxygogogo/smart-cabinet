// pages/add-medicine/index.js
const app = getApp();
import { BASE_URL } from '../../config.js'
Page({

  data: {
    model: {
      type: '感冒用药',
      img: '/images/upload.svg',
      beforeEat: false,
      effectiveDate:''
    },
    items: [
      { name: true, value: '饭前' },
      { name: false, value: '饭后', checked: 'true' },
    ],
    medicineType: ['感冒用药', '肠胃用药', '跌打损伤', '皮肤用药', '儿童用药', '其他药品'],
    index: 0
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value,
      'model.type': ['感冒用药', '肠胃用药', '跌打损伤', '皮肤用药', '儿童用药', '其他药品'][e.detail.value]
    })
  },
  chooseImg() {
    let that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        const tempFilePath = res.tempFilePaths;
        wx.uploadFile({
          url: `${BASE_URL}/upload`,
          filePath: tempFilePath[0],
          name: 'file',
          header: {
            "Content-Type": "multipart/form-data"//记得设置
          },
          success(res) {
            that.setData({
              'model.img': JSON.parse(res.data).url
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
  async handleAddMedicine(e) {
    const data = e.detail.value;
    if (data.name && data.time && data.package && data.medicineImg) {
      const res = await app.curl.post('/medicines', data);
      if (res._id) {
        wx.showModal({
          title: '提示',
          content: '继续添加',
          success(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/add-medicine/index',
              })
            } else if (res.cancel) {
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
      }
    } else {
      wx.showToast({
        title: '带星号的为必填项！',
        icon: 'none',
      })
    }
  }

})