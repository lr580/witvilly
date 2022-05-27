//Object 处理专用
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