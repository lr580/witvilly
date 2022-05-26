// app.js
import * as getopenid from 'js/common/getopenid';
import * as cadre from 'js/base/cadreCtrl';
import * as user from 'js/base/userCtrl';
App({
    onLaunch: async function () {
        console.log('App开始初始化');
        this.timeBegin = new Date(); //调试：程序初始化用时统计
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
            let openid = this.globalData.openid; //简写
            console.log('openid:', this.globalData.openid);

            if (!wx.cloud) { //极端情况就等待一下(不大可能触发)
                await wx.cloud.init(this.cloudInitParam);
            }
            console.log('用时(ms):', (new Date().getTime()) - this.timeBegin.getTime());
 
            const db = wx.cloud.database();
            const c_cadre = db.collection('cadre');

            const hasInfo = await user.getUser(openid);
            // const hasInfo = await wx.cloud.database().collection('cadre').where({
            //     _openid: 'oUtoa5VrERTUmzFHFHkb8pDCZ3H4' 
            // }).count();
            console.log('用时(ms):', (new Date().getTime()) - this.timeBegin.getTime());
            console.log(hasInfo);
        } catch (err_getopenid) {
            console.log('err_getopenid', err_getopenid);
        }
    }
});