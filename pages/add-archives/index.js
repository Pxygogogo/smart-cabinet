const app = getApp();
import { BASE_URL } from '../../config.js'
const sex = ['男', '女'];
// let _id = '';
Page({
  data: {
    model:{
      avatarImg:'../../images/upload_img.svg',
      sex:'',
      relation:''
    },
    sex,
    _id:''
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value,
      'model.sex': sex[e.detail.value]
    })
  },
  uploadAvatar(){
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
              'model.avatarImg': JSON.parse(res.data).url
            })
          }
        })
      },
    })
  },
  async handleSubmit(e){
    const data = e.detail.value;
    if(data.relation&&data.sex){
      const res = await app.curl.post('/archives', data)
      if (res._id && this.data._id === ''){
        wx.showToast({
          title: '添加成功',
          duration: 1500,
          success(){
            setTimeout(function () {
              wx.switchTab({
                url: '/pages/archives/index',
                success(e) {
                  var page = getCurrentPages().pop();
                  if (page == undefined || page == null) return;
                  page.onLoad();
                }
              })
            }, 1500)
          }
        })
      } else if (res.code === -1) {
        wx.showModal({
          title: '添加失败',
          content: res.msg,
        })
      }else{
        wx.showToast({
          title:'修改成功',
          duration: 1500,
          success() {
            setTimeout(function () {
              wx.switchTab({
                url: '/pages/archives/index',
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
    } else {
      wx.showToast({
        title: '带星号的为必填项！',
        icon: 'none',
      })
    }
  },
  async fetchDataById(id) {
    const res = await app.curl.get(`/archives${id}`)
    this.setData({
      'model': res
    })
  },
  del(e) {
    const { _id, relation } = e.currentTarget.dataset;
    wx.showModal({
      title: '删除警告',
      content: `确定删除关系人「${relation}」吗？`,
      async success(res) {
        if (res.confirm) {
          const res = await app.curl.delete('/archives', { _id })
          if (res._id) {
            wx.showToast({
              title: '删除成功',
              duration: 1500,
              success() {
                setTimeout(function () {
                  wx.switchTab({
                    url: '/pages/archives/index',
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

        }
      }
    })
  },

  onLoad(options){
    if (options._id) {
      this.setData({
        _id: options._id
      })
      this.fetchDataById(options._id)
    }
  }
  

  
})