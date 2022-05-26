import * as io from '../../js/common/io';
import * as user from '../../js/base/userCtrl';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        type: '',
        userInfo: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            type: options.type,
            userInfo: getApp().globalData.userInfo,
        });
        io.helpInput(this, 'name');
        io.helpInput(this, 'address');
        let thee = this; //下面不thee不行
        io.lockfunc(this, 'save', async function () {
            thee.data.input.userType = 2; //当前版本默认用户为2
            if (thee.data.input.name.length == 0) {
                io.print('请填写您的姓名');
                return;
            }
            await user.update(thee.data.input);
            wx.navigateBack();
        }, true);
        if (thee.data.type != 'register') {
            io.out('未开发');
        }
    },

    select_userType(param) { //暂时无用
        io.out('select user type:', param);
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