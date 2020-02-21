import { BASE_URL } from '../config.js';

const request = (method, uri, data) => {
  return new Promise((resvole, reject) => {
    wx.request({
      url: `${BASE_URL}${uri}`,
      data,
      header: {

      },
      method,
      success(res) {
        resvole(res.data)
      },
      fail(res) { },
      complete: function (res) { },
    });
  });
}

export default {
  get: (uri, data) => request('GET', uri, data),
  post: (uri, data) => request('POST', uri, data),
  put: (uri, data) => request('PUT', uri, data),
  delete: (uri, data) => request('DELETE', uri, data),
};