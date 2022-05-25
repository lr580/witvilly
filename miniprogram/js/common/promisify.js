// function promisify(fn){
//     return async function (args){
//         return new Promise((resolve,reject)=>{
//             fn({

//             })
//         })
//     }
// }

Promise.prototype.ignoreError = function () {
    return this.catch(() => {});
};

function toAsync(...names) { //可变参数
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

export {
    toAsync
};