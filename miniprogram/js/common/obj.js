//Object和Array专用
export var clone = function (obj) {
    var newObj = {};
    if (obj instanceof Array) {
        newObj = [];
    }
    for (var key in obj) {
        var val = obj[key];
        newObj[key] = typeof val === 'object' ? clone(val) : val;
    }
    return newObj;
};

export function split(arr, epoch=20) {
    let n = Math.ceil(arr.length / epoch);
    let res = [];
    for (let i = 0; i < n; ++i) {
        res[i] = [];
        for (let j = i * epoch; j < Math.min(arr.length, (i + 1) * epoch); ++j) {
            res[i].push(arr[j]);
        }
    }
    return res;
}

// export async function parallel(){

// }