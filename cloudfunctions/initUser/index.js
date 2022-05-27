// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRMENT_ENV
});
let {
    openid,
    appid,
    unionid
} = cloud.getWXContext();
// const db = cloud.database();
// let hasResigtered = await db.collection('cadre').where({
//     _openid = openid
// }).count();

// 云函数入口函数
exports.main = async (event, context) => {
    // const wxContext = cloud.getWXContext()

    return {
        a: 1,
        // hasResigtered,
        event,
        openid: openid,
        appid: appid,
        unionid: unionid,
    }
}