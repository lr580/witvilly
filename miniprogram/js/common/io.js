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