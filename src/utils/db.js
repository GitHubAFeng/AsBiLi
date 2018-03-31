
import {env} from '../config/default'
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
