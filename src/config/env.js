/**
 * 配置编译环境和线上环境之间的环境
 * baseUrl:路由地址域名
 * routerMode:路由模式
 * imgBaseUrl:图片所在域名地址
 */
let baseUrl;
let routerMode;
const imgBaseUrl = 'https://fuss10.elemecdn.com';
if (process.env.NODE_ENV == 'development') {
  baseUrl = '';
  routerMode = 'hash';
} else {
  baseUrl = 'https://mainsite-restapi.ele.me';
  routerMode = 'hash';
}

export { baseUrl, routerMode, imgBaseUrl }