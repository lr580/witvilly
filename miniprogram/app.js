import * as getopenid from 'js/common/getopenid';
import * as user from 'js/base/userCtrl';
import * as io from 'js/common/io';
App({
    onLaunch: async function () {
        io.out('app开始初始化');
        io.time();
        this.globalData = {};

        this.cloudInitParam = {
            env: 'cloud1-4gfwdpzcf1fa51e4',
            traceUser: true,
        };
        if (!wx.cloud) {
            console.error('请使用 2.2.3 或以上的基础库以使用云能力');
        } else {
            wx.cloud.init(this.cloudInitParam); //实验表明如果这里加await会慢大约300ms
        }

        this.main(); //程序逻辑初始化
    },

    main: async function () {
        try {
            this.globalData.openid = await getopenid.getopenid(); //实验表明这个await的用时是0.5s-1.2s
            if (!wx.cloud) { //极端情况就等待一下(不大可能触发)
                await wx.cloud.init(this.cloudInitParam);
            }
            io.out('openid:', this.globalData.openid);
            io.timeLog();

            this.globalData.userInfo = await user.getUser();
            io.timeLog();
            io.log('userInfo:', this.globalData.userInfo);
            if (this.globalData.userInfo.userType < 0) {
                throw new Error('信息获取失败');
            } else if (this.globalData.userInfo.userType == 0) {
                wx.navigateTo({
                    url: '/pages/userInfo/userInfo?type=register',
                });
            } else {

            }

        } catch (err_getopenid) {
            io.err(err_getopenid, '网络异常，初始化失败，请重启');
        }
    }
});