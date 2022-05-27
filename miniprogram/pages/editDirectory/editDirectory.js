// pages/editDirectory/editDirectory.js
import * as io from '../../js/common/io';
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        io.out(options);
        io.helpInput(this, 'name');
        io.helpInputSex(this, 'sex');
        io.helpInput(this, 'income');
        io.helpInputDate(this, 'birthday');
        io.helpInputs(this, 'jobs');
        io.helpInputs(this, 'addresses');
        io.helpInputs(this, 'contacts');
        io.helpInput(this, 'wechat');
        let thee = this;
        io.lockfunc(this, 'save', async function () {
            if (thee.data.input.name.length == 0) {
                io.print('名字为必填');
                return;
            }
            io.out(thee.data);
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})