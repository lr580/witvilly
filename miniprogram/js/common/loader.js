export function loading(title = '加载中', mask = false) {
    wx.showLoading({
        title: title,
        mask: mask,
    });
}

export function loaded() {
    wx.hideLoading();
}