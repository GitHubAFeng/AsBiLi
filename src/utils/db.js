
import {env} from '../config/index'
let prefix = "";  //前缀
if (env == "prod") {
  prefix = ""
}

const Set = (key, value) => {
  wx.setStorageSync(prefix + key, value)
}

const Get = (key) => {
  return wx.getStorageSync(prefix + key)
}

module.exports = {
  Set,
  Get
}
