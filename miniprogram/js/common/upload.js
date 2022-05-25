// import {
//     md5
// } from '/md5.js';

const destRoot = "rich/";

async function uploadImages(cnt = 9) {
    let imagePaths = [];
    await new Promise(resolve => {
        wx.chooseImage({
            count: cnt,
            success: res => {
                console.log(res.tempFilePaths);
                let beginTime = (new Date()).getTime();
                for (let i in res.tempFilePaths) {
                    let tempFilePath = res.tempFilePaths[i];
                    let pathSplit = tempFilePath.split('.');
                    let suffix = pathSplit[pathSplit.length - 1];
                    // let destPath = destRoot + md5(tempFilePath) + '.' + suffix;
                    let destPath = destRoot + String(beginTime + i) + '.' + suffix;
                    imagePaths.push(destPath);
                    // console.log((new Date()).getTime());
                    // console.log(destPath);
                    wx.cloud.uploadFile({ 
                        filePath: tempFilePath,
                        cloudPath: destPath,
                        // url: destRoot,
                        // name: md5(tempFilePath),
                        success: res1 => {
                            console.log("Aya");
                            resolve(imagePaths);
                        },
                        fail: res2 => {
                            console.log(res2);
                            resolve([]);
                        },
                    })
                }
            },
            fail: res0 => {
                if (res0.errMsg == "chooseImage:fail cancel") { //用户取消了上传(ver. 22-05-25)
                } else {
                    console.log(res0);
                }
                resolve([]);
            }
        });
    });
    return imagePaths;
}

export {
    uploadImages
};