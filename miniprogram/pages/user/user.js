import * as io from '../../js/common/io';
import * as user from '../../js/base/userCtrl';
Page({
    data: {},

    onLoad(options) {
        io.log('user页启动完毕');
        getApp().handler = this;
        let thee = this;
        io.lockfunc(this, 'unlogin', async function () {
            await user.update({
                userType: Math.round(getApp().globalData.userInfo.userType % 10 + 10)
            });
            user.refresh(thee);
        }, true);
        io.lockfunc(this, 'login', async function () {
            await user.update({
                userType: Math.round(getApp().globalData.userInfo.userType % 10)
            });
            user.refresh(thee);
        }, true);
        io.helpGoto(this, 'help');
        io.helpGoto(this, 'userInfo');
        io.helpGoto(this, 'index');
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
        user.refresh(this);
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