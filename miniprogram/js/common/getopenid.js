import {
    acloud
} from 'promisify.js';
async function getopenid() {
    let {
        result: {
            openid
        }
    } = await acloud({
        name: 'getopenid'
    });
    return openid;
}
export {
    getopenid
};