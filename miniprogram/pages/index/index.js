// pages/index/index.js
import {
    Date2Str,
    Str2Date
} from '../../js/common/dateCalc.js';
import {
    uploadImages
} from '../../js/common/upload';
import {
    acloud,
    awx,
    promisify
} from '../../js/common/promisify.js';
// import {
//     request_url
// } from '../../js/conn/secret';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        testInfo: 'QwQ',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        this.setData({
            testInfo: Date2Str(Str2Date(20220228))
        });
        // wx.cloud.callFunction({
        //     name: 'getopenid',
        //     success: res => {
        //         console.log(res);
        //     },
        //     fail: err => {
        //         console.log(err);
        //     }
        // });
        try {
            // console.log(1);
            // const openidPack = await acloud({
            //     name: 'getopenid'
            // });
            // const openid = openidPack.result.openid;
            // console.log(openid);
            // console.log(1);
            // const res = await asyncLogin();
            // const {
            // code
            // } = await awx.login();
            // console.log(code);
            // let url = request_url;
            // url.replace('JSCODE', code);
            // const userinfo = awx.request({
            //     url
            // });
            // console.log(userinfo);
            // console.log(url);
            // do something with code
        } catch (err) {
            // login error
        } finally {
            // promisify 里没有专门注入 complete 回调，
            // 因为 complete 的内容可以写在这里

        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})