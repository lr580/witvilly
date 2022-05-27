export var showLoad = false;

export function loading(title = '加载中', mask = false) {
    if (showLoad) {
        wx.showLoading({
            title: title,
            mask: mask,
        });
    }
}

export function loaded() {
    if (showLoad) {
        wx.hideLoading();
    }
}