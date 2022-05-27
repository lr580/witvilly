import * as io from '../../js/common/io';
// import * as spell from '../../js/common/spells';
Page({
    data: {},

    onLoad: async function (options) {
        io.helpGoto(this, 'directory');
        // const prom1 = new Promise((res) => {
        //     setTimeout(res, 400, '等待400ms完成的异步返回的数据');
        // });
        // const prom2 = new Promise((res) => {
        //     setTimeout(res, 500, '等待500ms完成的异步返回的数据');
        // });
        // const prom3 = new Promise((res) => {
        //     setTimeout(res, 300, '等待300ms完成的异步返回的数据');
        // });
        // let res = await Promise.all([prom1, prom2, prom3]);
        // console.log(res);
        // var array = ['锦乐', '果冻', '白茶', '白芙', '白金'];
        // var resultArray = array.sort(
        //     (param1, param2) => {
        //         return param1.localeCompare(param2, "zh");
        //     }
        // );
        // console.log(resultArray);
        // io.out(spell.convert('你好123A BcC D0- SDF,.，。！EW>\n<再见h\thh'));
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