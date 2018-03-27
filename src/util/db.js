
import {env} from '../config/index'
let prefix = "afeng.dev."
if (env == "prod") {
  prefix = "afeng.production."
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
