import wepy from 'wepy';
import util from './util';
import md5 from './md5';
import tip from './tip';

const API_SECRET_KEY = 'afeng'
const TIMESTAMP = util.getCurrentTime()
const SIGN = md5.hex_md5((TIMESTAMP + API_SECRET_KEY).toLowerCase())

const wxRequest = async(params = {}, url) => {
    tip.loading();
    let data = params.query || {};
    data.sign = SIGN;
    data.time = TIMESTAMP;
    let res = await wepy.request({
        url: url,
        method: params.method || 'GET',
        data: data,
        header: { 'Content-Type': 'application/json' },
    });
    tip.loaded();
    return res.data;
};


const request = (url ,method='GET', params = {}, handler = {}) => {
    handler.url = url;
    handler.data = params;
    handler.header = {
        'content-type': 'application/json'
    }
    handler.method = method;
    if (method === 'POST') {
        handler.header['content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    }

    return new Promise((resolve, reject) => {
        handler.success = res => {
            resolve(res.data)
        }
        handler.fail = () => {
            reject('Network request failed')
        }
        wepy.request(handler)
    })
}


module.exports = {
    wxRequest,
    request
}
