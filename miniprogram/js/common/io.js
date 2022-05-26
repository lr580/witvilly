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

export function helpInput(handler, key = '', dest = '', funcName = '', obj = 'input') {
    if (dest.length == 0) {
        dest = key;
    }
    if (funcName.length == 0) {
        funcName = 'input_' + key;
    }
    if (handler.data[obj] == undefined) {
        handler.data[obj] = {};
    }
    if (handler.data[obj][dest] == undefined) { //似乎没必要，反正后面setData会帮建的吧(?)
        handler.data[obj][dest] = '';
    }
    handler[funcName] = function (param) {
        let wrap = {};
        wrap[obj] = handler.data[obj]; //不要覆盖原有的
        wrap[obj][dest] = param.detail.value;
        handler.setData(wrap);
    }
}

export function helpInput0(handler, key = '', dest = '', funcName = '') { //旧版函数，暂时废置
    if (dest.length == 0) {
        dest = 'i_' + key;
    }
    if (funcName.length == 0) {
        funcName = 'input_' + key;
    }
    if (handler.data[dest] == undefined) { //似乎没必要，反正后面setData会帮建的吧(?)
        handler.data[dest] = '';
    }
    handler[funcName] = function (param) {
        let wrap = {};
        wrap[dest] = param.detail.value;
        handler.setData(wrap);
    }
}

const warnFrequence = true;
export function lockfunc(handler, lockname, func, async = false) {
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