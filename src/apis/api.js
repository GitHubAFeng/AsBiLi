import { wxRequest,request } from '../utils/wxRequest';
import { domain } from '../config/default';

const apitest = 'https://www.bilibili.com/index/ding.json'

//查询列表
// const getIndexList = (url) => request(domain + 'index/list');
const getIndexList = (params) => wxRequest(params, domain + 'index/list');
// const getIndexList = (params={}) => wxRequest(params, apitest);


module.exports = {
    getIndexList,

  }


