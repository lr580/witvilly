//日期处理专用
//因为存一个Date类到数据库内时计算起来麻烦，所以想要自己手写Date(字符串yyyymmddhhmmss)
let author = 'lr580'; //调试用，以后会删除

Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //⽉份
        "d+": this.getDate(), //⽇
        "h+": this.getHours(), //⼩时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.lenngth == 1) ?
                (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

const format = 'yyyyMMddhhmmss';
const formatNum = 10000000000000;

function Date2Str(src) { //假设src一定是Date
    return parseInt(src.format(format));
}

function Str2Date(src) { //假设src为正确格式的number/string
    src = parseInt(src);
    while (src < formatNum) {
        src *= 10;
    }
    let ss = Math.floor(src % 100);
    src = Math.floor(src / 100);
    let mm = Math.floor(src % 100);
    src = Math.floor(src / 100);
    let hh = Math.floor(src % 100);
    src = Math.floor(src / 100);
    let dd = Math.floor(src % 100);
    src = Math.floor(src / 100);
    let MM = Math.floor(src % 100);
    src = Math.floor(src / 100);
    let yy = Math.floor(src % 10000);
    return new Date(yy + '-' + MM + '-' + dd + ' ' + hh + ':' + mm + ':' + ss);
}

export {
    author, //调试用，以后会删除
    Date2Str,
    Str2Date
};