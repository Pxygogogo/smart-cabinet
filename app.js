//app.js
import request from './utils/requests.js'
App({
  curl: request,
  user: wx.getStorageSync('user') ||{} //userinfo
})