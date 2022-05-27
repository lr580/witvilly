import * as io from '../../js/common/io';
import * as user from '../../js/base/userCtrl';
Page({
    data: {
        type: '',
    },

    onLoad(options) {
        if (options.type != null) {
            this.setData({
                type: options.type,
            });
        }
        user.refresh(this);
        io.helpInput(this, 'name');
        io.helpInput(this, 'address');
        io.helpInput(this, 'sex');
        io.helpInput(this, 'birthday');
        io.helpInput(this, 'job');
        io.helpInput(this, 'profile');
        let thee = this; //下面不thee不行
        io.lockfunc(this, 'save', async function () {
            thee.data.input.userType = 2; //当前版本默认用户为2
            if (thee.data.input.name.length == 0) {
                io.print('请填写您的姓名');
                return;
            }
            thee.data.input.sex = io.transformSex(thee.data.input.sex);
            thee.data.input.birthday = io.transformPickdate(thee.data.input.birthday);
            await user.update(thee.data.input);
            wx.navigateBack();
        }, true);
        io.lockfunc(this, 'upload_avatar', async function () {
            let path = await io.uploadImages(1, 'avatar/');
            if (path.length) {
                await user.update({
                    avatar: path[0],
                }, thee);
            }
        });
    },

    select_userType(param) { //暂时无用
        io.out('select user type:', param);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

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