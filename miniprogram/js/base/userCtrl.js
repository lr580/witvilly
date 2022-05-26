// import * as asy from "../common/promisify";
import * as obj from '../common/obj';
import * as io from '../common/io';
var col = null;
var _ = null;
var app = null;

function get_col() {
    if (!col) {
        col = wx.cloud.database().collection('cadre');
        _ = wx.cloud.database().command;
        app = getApp();
    }
}
//获取用户信息，若不存在则创建
export async function getUser() {
    get_col();
    let res = getTemplate('', -1);
    try {
        let got = await col.where({
            _openid: app.globalData.openid,
        }).get();

        if (got.data.length == 0) {
            var newData = getTemplate(app.globalData.openid);
            await col.add({
                data: newData,
            });
            res = newData;
        } else {
            res = got.data[0]; //作用域问题
        }

    } catch (err) {
        io.err(err);
        return getTemplate('', -1);
    }
    return res;
}

var template = {
    _openid: '',
    registerDate: null,
    avatar: 'default.jpg',
    name: '',
    sex: '未知',
    birthday: 0,
    userType: 0,
    profile: '',
    phone: '',
    address: '',
    governs: [],
    memos: [],
    plans: [],
    subordinates: [],
    authorized: true,
};

function getTemplate(openid = '', userType = 0) {
    let tmp = obj.clone(template);
    tmp._openid = openid;
    tmp.userType = userType;
    tmp.registerDate = (new Date()).getTime();
    return tmp;
}

export async function update(infos) {
    get_col();
    try {
        await col.where({
            _openid: app.globalData.openid
        }).update({
            data: infos,
        });
        for (let key in infos) {
            app.globalData.userInfo[key] = infos[key];
        }
    } catch (err) {
        io.err(err, '更新失败，请重试');
    }
}