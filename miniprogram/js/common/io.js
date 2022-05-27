//微信输出专用
const isConsole = true; //是否调试
export function err(cerr, outmsg = '网络错误，请重试', duration = 1000) {
    wx.showToast({
        title: outmsg,
        icon: 'none',
        duration: duration,
    });
    if (isConsole) {
        console.error(cerr);
    }
}

export function print(info, icon = 'none', duration = 1000) {
    wx.showToast({
        title: info,
        icon: icon,
        duration: duration,
    });
}

const isOut = true; //是否调试输出
export function out(...info) {
    if (isOut) {
        console.info(...info);
    }
}
export const log = out; //同名函数

export function time() {
    if (isOut) {
        console.time();
    }
}
export function timeEnd() {
    if (isOut) {
        console.time();
    }
}
export function timeLog() {
    if (isOut) {
        console.timeLog();
    }
}

function createParamObj(handler, obj) {
    if (handler.data[obj] == undefined) {
        handler.data[obj] = {};
    }
}

export function helpInput(handler, key = '', dest = '', funcName = '', obj = 'input', initObj = 'userInfo') {
    if (dest.length == 0) {
        dest = key;
    }
    if (funcName.length == 0) {
        funcName = 'input_' + key;
    }
    createParamObj(handler, obj);
    // if (handler.data[obj] == undefined) {
    //     handler.data[obj] = {};
    // }
    if (handler.data[obj][dest] == undefined) { //似乎没必要，反正后面setData会帮建的吧(?)
        if (handler.data[initObj] && handler.data[initObj][dest]) {
            handler.data[obj][dest] = handler.data[initObj][dest];
        } else {
            handler.data[obj][dest] = '';
        }
    }
    handler[funcName] = function (param) {
        let wrap = {};
        wrap[obj] = handler.data[obj]; //不要覆盖原有的
        wrap[obj][dest] = param.detail.value;
        handler.setData(wrap);
    }
}

// export function helpSelect(handler, key = '', dest = '', funcName = '', obj = 'input') {
//     if (dest.length == 0) {
//         dest = key;
//     }
//     if (funcName.length == 0) {
//         funcName = 'select_' + key;
//     }
//     createParamObj(handler, obj);
// } 不需要

const warnFrequence = true;
export function lockfunc(handler, lockname, func, async = true) {
    initlock(handler, lockname);
    if (!async) {
        handler[lockname] = function () {
            if (handler['checklock_' + lockname]()) {
                return;
            }
            func();
            handler['unlock_' + lockname]();
        }
    } else {
        handler[lockname] = async function () {
            if (handler['checklock_' + lockname]()) {
                return;
            }
            func();
            handler['unlock_' + lockname]();
        }
    }
}

export function initlock(handler, lockname = '1') {
    if (!handler.data.locks) {
        handler.data.locks = {};
    }
    handler.data.locks[lockname] = false;
    let checklock_name = 'checklock_' + lockname;
    handler[checklock_name] = function () {
        if (handler.data.locks[lockname]) {
            if (warnFrequence) {
                print('请勿频繁点击');
            }
            return true; //已上锁
        }
        handler.data.locks[lockname] = true; //进行上锁
        return false;
    }
    let unlock_name = 'unlock_' + lockname;
    handler[unlock_name] = function () {
        handler.data.locks[lockname] = false;
    }
}

export function helpGoto(handler, url, param = {}, funcName = '', full = false) {
    if (funcName.length == 0) {
        funcName = 'goto_' + url;
    }
    if (!full) {
        url = '/pages/' + url + '/' + url;
    }
    let hasParam = false;
    let para = '';
    for (let key in param) {
        if (!hasParam) {
            hasParam = true;
            url += '?';
        }
        para += key + '=' + param[key];
    }
    url += para;
    handler[funcName] = function () {
        wx.navigateTo({
            url: url,
        });
    };
}

export function setData(handler, ...param) {
    let wrap = {};
    let idx = 0;
    let key = '';
    for (let v in param) {
        if (idx & 1) {
            wrap[key] = v;
        } else {
            key = v;
        }
        idx ^= 1;
    }
    handler.setData(wrap);
}

export function setDatas(handler, param) {
    handler.setData(param);
}

export const imageRoot = 'rich/';
export async function uploadImages(cnt = 9, root = imageRoot, abbr = true) {
    var imagePaths = [];
    var destPaths = [];
    try {
        let tempRes = await wx.chooseImage({
            count: cnt,
        });
        let beginTime = (new Date()).getTime();
        for (let i in tempRes.tempFilePaths) {
            let tempFilePath = tempRes.tempFilePaths[i];
            let pathSplit = tempFilePath.split('.');
            let suffix = pathSplit[pathSplit.length - 1];
            let destPath0 = String(beginTime + i) + '.' + suffix;
            destPaths.push(root + destPath0);
            if (!abbr) {
                destPath0 = root + destPath0;
            }
            imagePaths.push(destPath0);
        }
        await uploads(tempRes.tempFilePaths, destPaths);
    } catch (err) {
        if (err.errMsg != "chooseImage:fail cancel") {
            err(err, '上传失败');
        }
        return null;
    }
    return imagePaths;
}

export async function uploads(src, dest) {
    let suc = 0;
    return await new Promise((res, rej) => {
        for (let i = 0; i < src.length; ++i) {
            wx.cloud.uploadFile({
                filePath: src[i],
                cloudPath: dest[i],
            }).then(res1 => {
                if (++suc == src.length) {
                    res(true);
                }
            }).catch(err1 => {
                err(err1);
                rej(false);
            });
        }
    });
}

export function transformPickdate(val) { //将'yyyy-mm-dd'转时间戳
    if (String(val) == 'NaN' || val.length == 0) { //isNaN不好用
        val = 0;
    } else {
        val = (new Date(val)).getTime();
    }
    return val;
}

export function transformSex(val) {
    if (val.length == 0) {
        val = '未知';
    }
    return val;
}