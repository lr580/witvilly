// app.js
// import {
//   toAsync
// } from 'js/common/promisify';
App({
  onLaunch: function () {
    // wx.async = toAsync;
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: 'cloud1-4gfwdpzcf1fa51e4',
        traceUser: true,
      });
    }

    this.globalData = {};
  }
});