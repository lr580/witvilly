import * as peo from '../../js/base/peopleCtrl';
import * as io from '../../js/common/io';
Page({
    data: {},

    async onLoad(options) {//maybe onShow? or maybe not
        let people = await peo.getPeople('', getApp().globalData.userInfo.governs);
        peo.blender(peo.sort(people));
        this.setData({
            people: people,
        });
        io.helpGoto(this, 'editDirectory', {}, 'goto_addDirectory');
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