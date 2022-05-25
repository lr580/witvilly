// pages/index/index.js
import {
    Date2Str,
    Str2Date
} from '../../js/common/dateCalc.js';
import {uploadImages} from '../../js/common/upload';
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
    onLoad: function (options) {
        this.setData({
            testInfo: Date2Str(Str2Date(20220228))
        });
        // console.log(uploadImages());
        // (async () => {
        //     const p = await new Promise(resolve => {
        //         setTimeout(() => resolve("hello async/await"), 1000);
        //     });
        //     console.log(p);
        // })();
        // try{
        //     const userInfo = await 
        // }catch(err){

        // }
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