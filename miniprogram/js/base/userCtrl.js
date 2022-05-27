// import * as asy from "../common/promisify";
import * as obj from '../common/obj';
import * as io from '../common/io';
import * as date from '../common/dateCalc';
export var col = null;
var _ = null;
var app = null;

function get_col() {
    if (!col) {
        col = wx.cloud.database().collection('cadre');
        _ = wx.cloud.database().command;
        app = getApp();
    }
}
//获取用户信息，若不存在则创建，获取成功显示出来(如果定义了handler)
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
    _id :0,
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
    job: '',
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
    tmp._id = tmp.registerDate;
    return tmp;
}

export async function update(infos, handler = null, key = 'userInfo', decor = true) {
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
        if (handler) {
            refresh(handler, key, decor);
        }
    } catch (err) {
        io.err(err, '更新失败，请重试');
    }
}

export const typeChar = ['未登录', '群众', '基层干部', '高层干部', '其他'];
export function refresh(handler, key = 'userInfo', decor = true) {
    get_col();
    if (app.globalData.userInfo == undefined) { //全局信息未加载出来
        return;
    }
    let wrap = {}
    wrap[key] = obj.clone(app.globalData.userInfo);
    if (decor) {
        wrap[key].registerDate = date.print(wrap[key].registerDate);
        wrap[key].birthday = date.print(wrap[key].birthday);
        if (wrap[key].userType >= 10 && wrap[key].userType <= 20) {
            wrap[key].userType = '未登录';
        } else if (wrap[key].userType > 20) {
            wrap[key].userType = '已注销';
        } else {
            wrap[key].userType = typeChar[wrap[key].userType];
        }
        wrap[key].avatar = (app.globalData.cloudpath + 'avatar/' + wrap[key].avatar).trim();
    }

    handler.setData(wrap);
}