//获取进程启动方式，在系统环境变量设置，临时也就是指 npm run dev 和 npm run build
//暂时不知为什么在此获取不了process
// const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
const env = 'dev_egg';
const domains = {
  dev_php: 'http://127.0.0.1:8096/',
  dev_egg: 'http://127.0.0.1:7001/'
}
export const domain = domains[env];
export const version = '0.0.1';
export default {
    env
  }