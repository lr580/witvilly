import * as io from '../common/io';
import * as obj from '../common/obj';
import * as ran from '../common/randoms';
import * as user from '../base/userCtrl';
export var col = null;
var _ = null;
var app = null;
const epoch = 20;

function get_col() {
    if (!col) {
        col = wx.cloud.database().collection('people');
        _ = wx.cloud.database().command;
        app = getApp();
    }
}

var template = {
    _id: 0,
    _openid: '',
    name: '',
    sex: '未知',
    avatar: '',
    birthday: 0,
    income: '',
    jobs: [],
    addresses: [],
    contacts: [],
    wechat: '',
    groups: [],
    updateDate: 0,
};

function getTemplate(dt = 0) {
    let res = obj.clone(template);
    res._id = (new Date()).getTime() + dt;
    res.updateDate = res._id;
    return res;
}

export async function getPeople(openid = '', governs = null) { //可能会查他人的，所以传参
    get_col();
    if (openid.length == 0) {
        openid = app.globalData.openid;
    }
    let res = []; //空是未创建过,null是读取失败
    let ids = governs;
    try {
        if (governs == null) {
            let userRead = await user.col.where({
                _openid: openid,
            }).get();
            if (userRead.data.length) {
                ids = userRead.data[0].governs;
            } else {
                io.err('用户不存在', '用户不存在');
            }
        }
        // let batch = await col.where({
        //     _id: _.gt(0)
        // }).get(); 
        // ids = obj.split(ids);
        // await new Promise((reso, reje) => {
        //     let suc = 0;
        //     let read = [];
        //     for(let i in ids){
        //         col.where({
        //             _id:_.in(ids)
        //         })
        //     }
        // });
        let batchTimes = Math.ceil(ids.length / epoch);
        let tasks = [];
        for (let i = 0; i < batchTimes; ++i) {
            let promise = col.where({
                _id: _.in(ids),
            }).skip(i * epoch).limit(epoch).get();
            tasks.push(promise);
        }
        let result = (await Promise.all(tasks)).reduce((acc, cur) => {
            return {
                data: acc.data.concat(cur.data),
                errMsg: acc.errMsg,
            }
        });
        res = result.data;
    } catch (err) {
        io.err(err);
    }
    return res;
}

export function testBunch(openid = '', n = 100) { //创建n个测试群众
    get_col();
    let f = function (id) {
        wx.cloud.database().collection('cadre').where({
            _openid: openid
        }).update({
            data: {
                governs: _.push(id)
            }
        });
        // user.update(governs: _.push(id))
    }
    let g = function (obj) {
        io.out(obj);
        col.add({
            data: obj
        }).then(rr => {
            f(obj._id);
        });
    }
    for (let i = 0; i < n; ++i) {
        let newpeople = getTemplate(i);
        // let _id = newpeople._id;
        let newsex = ran.randint(1, 2);
        newpeople.name = ran.name(newsex);
        newpeople.sex = ['', '男', '女'][newsex];
        io.out(newpeople);
        g(newpeople);
    }
}