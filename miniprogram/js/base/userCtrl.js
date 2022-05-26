// import * as asy from "../common/promisify";
import * as obj from '../common/obj';
import * as io from '../common/io';
var col = null;
//获取用户信息，若不存在则创建
export async function getUser(openid) {
    if (!col) {
        col = wx.cloud.database().collection('cadre');
    }
    let res = null;
    try {
        let got = await col.where({
            _openid: openid,
        }).get();
        // console.log('got',got.data);
        if (got.data.length == 0) {
            var newData = getTemplate(openid);
            await col.add({
                data: newData,
            });
            res = newData;
        } else {
            res = got.data[0]; //作用域问题
        }
        // fuck;
    } catch (err) {
        io.err(err);
        return null;
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
};

function getTemplate(openid) {
    let tmp = obj.clone(template);
    tmp._openid = openid;
    tmp.registerDate = (new Date()).getTime();
    return tmp;
}

// async function createIfNotExist() {

// }