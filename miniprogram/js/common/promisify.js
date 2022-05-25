//异步简化库
function promisify(fn) {
    return async function (args) {
        return new Promise((resolve, reject) => {
            fn({
                ...(args || {}),
                success: res => resolve(res),
                fail: err => reject(err)
            });
        });
    };
}

Promise.prototype.ignoreError = function () {
    return this.catch(() => {});
};

const allFuncs = ['login', 'request', 'getUserInfo'];

function toAsync(names) { //若...names是可变参数
    // 这里 names 期望是一个数组
    return (names || [])
        .map(name => ({
            name,
            member: wx[name]
        }))
        .filter(t => typeof t.member === "function")
        .reduce((r, t) => {
            r[t.name] = promisify(wx[t.name]);
            return r;
        }, {});
}

const awx = toAsync(allFuncs);

const acloud = promisify(wx.cloud.callFunction);

export {
    promisify,
    awx,
    acloud
};