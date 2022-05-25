// app.js
import {
  acloud
} from 'js/common/promisify';
import {getopenid} from 'js/common/getopenid';
App({
  onLaunch: async function () {
    this.globalData = {
      openid: '',
    }; 
    // wx.async = toAsync;
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: 'cloud1-4gfwdpzcf1fa51e4',
        traceUser: true, 
      });  
    } 
    try { 
      // const openidPack = await acloud({
      //   name: 'getopenid'
      // });
      // this.globalData.openid = openidPack.result.openid;
      this.globalData.openid = await getopenid();// openidPack
      console.log('openid:', this.globalData.openid);
    } catch (err_getopenid) {
      console.log('err_getopenid', err_getopenid);
    }
  }
});