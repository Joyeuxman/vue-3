import App from '../App'
// 组件
const balance = r => require.ensure([], () => r(require('@P/balance/balance')), 'balance');
const balanceDetail = r => require.ensure([], () => r(require('@P/balance/children/balanceDetail')), 'balanceDetail');

const benefit = r => require.ensure([], () => r(require('@P/benefit/benefit')), 'benefit');
const commend = r => require.ensure([], () => r(require('@P/benefit/children/commend')), 'commend');
const coupon = r => require.ensure([], () => r(require('@P/benefit/children/coupon')), 'coupon');
const exchange = r => require.ensure([], () => r(require('@P/benefit/children/exchange')), 'exchange');
const hbDescription = r => require.ensure([], () => r(require('@P/benefit/children/hbDescription')), 'hbDescription');
const hbHistory = r => require.ensure([], () => r(require('@P/benefit/children/hbHistory')), 'hbHistory');

const city = r => require.ensure([], () => r(require('@P/city/city')), 'city');

const confirmOrder = r => require.ensure([], () => r(require('@P/confirmOrder/confirmOrder')), 'confirmOrder');
const remark = r => require.ensure([], () => r(require('@P/confirmOrder/children/remark')), 'remark');
const invoice = r => require.ensure([], () => r(require('@P/confirmOrder/children/invoice')), 'invoice');
const payment = r => require.ensure([], () => r(require('@P/confirmOrder/children/payment')), 'payment');
const userValidation = r => require.ensure([], () => r(require('@P/confirmOrder/children/userValidation')), 'userValidation');
const chooseAddress = r => require.ensure([], () => r(require('@P/confirmOrder/children/chooseAddress')), 'chooseAddress');
const addAddress = r => require.ensure([], () => r(require('@P/confirmOrder/children/children/addAddress')), 'addAddress');
const searchAddress = r => require.ensure([], () => r(require('@P/confirmOrder/children/children/children/searchAddress')), 'searchAddress');

const download = r => require.ensure([], () => r(require('@P/download/download')), 'download');

const find = r => require.ensure([], () => r(require('@P/find/find')), 'find');

const food = r => require.ensure([], () => r(require('@P/food/food')), 'food');

const forget = r => require.ensure([], () => r(require('@P/forget/forget')), 'forget');

const home = r => require.ensure([], () => r(require('@P/home/home')), 'home');

const login = r => require.ensure([], () => r(require('@P/login/login')), 'login');

const msite = r => require.ensure([], () => r(require('@P/msite/msite')), 'msite');

const order = r => require.ensure([], () => r(require('@P/order/order')), 'order');
const orderDetail = r => require.ensure([], () => r(require('@P/order/children/orderDetail')), 'orderDetail');

const points = r => require.ensure([], () => r(require('@P/points/points')), 'points');
const pointsDetail = r => require.ensure([], () => r(require('@P/points/children/pointsDetail')), 'pointsDetail');

const profile = r => require.ensure([], () => r(require('@P/profile/profile')), 'profile');
const info = r => require.ensure([], () => r(require('@P/profile/children/info')), 'info');
const address = r => require.ensure([], () => r(require('@P/profile/children/children/address')), 'address');
const add = r => require.ensure([], () => r(require('@P/profile/children/children/children/add')), 'add');
const addDetail = r => require.ensure([], () => r(require('@P/profile/children/children/children/children/addDetail')), 'addDetail');
const setusername = r => require.ensure([], () => r(require('@P/profile/children/setusername')), 'setusername');

const search = r => require.ensure([], () => r(require('@P/search/search')), 'search');

const service = r => require.ensure([], () => r(require('@P/service/service')), 'service');
const questionDetail = r => require.ensure([], () => r(require('@P/service/children/questionDetail')), 'questionDetail');

const shop = r => require.ensure([], () => r(require('@P/shop/shop')), 'shop');
const foodDetail = r => require.ensure([], () => r(require('@P/shop/children/foodDetail')), 'foodDetail');
const shopDetail = r => require.ensure([], () => r(require('@P/shop/children/shopDetail')), 'shopDetail');
const shopSafe = r => require.ensure([], () => r(require('@P/shop/children/children/shopSafe')), 'shopSafe');

const vipCard = r => require.ensure([], () => r(require('@P/vipCard/vipCard')), 'vipCard');
const invoiceRecord = r => require.ensure([], () => r(require('@P/vipCard/children/invoiceRecord')), 'invoiceRecord');
const useCart = r => require.ensure([], () => r(require('@P/vipCard/children/useCart')), 'useCart');
const vipDescription = r => require.ensure([], () => r(require('@P/vipCard/children/vipDescription')), 'vipDescription');



// 路由
export default [{
  path: '', component: App,//顶级路由，对应index.html
  children: [//二级路由  对应App.vue
    { path: '', redirect: '/home' },//地址为空时跳转home页面
    { path: '/home', component: home },//首页城市列表页面
    // 可以匹配 /city/ 和 /city/1
    { path: '/city/:cityid?', component: city },//当前选择城市页面
    { path: '/search/:geohash?', component: search },//搜索页面
    { path: '/msite', component: msite },//所有商铺列表页面
    { path: '/food', component: food },//特色商铺列表页面
    {
      path: '/shop', component: shop,//商铺详情页面
      children: [
        { path: 'foodDetail', component: foodDetail },    //食品详情页
        {
          path: 'shopDetail', component: shopDetail,//商铺详情页
          children: [{ path: 'shopSafe', component: shopSafe }]//商铺安全认证页
        },
      ]
    },
    { path: '/login', component: login },//登录注册页
    {
      path: '/profile', component: profile,//个人信息页
      children: [
        {
          path: 'info', component: info,//个人信息详情页
          children: [
            {
              path: 'address', component: address,//编辑地址页
              children: [
                {
                  path: 'add', component: add,
                  children: [{ path: 'addDetail', component: addDetail }], //添加地址页
                }
              ]
            }
          ]
        },
        { path: 'setusername', component: setusername },
        { path: 'service', component: service },//服务中心
      ]
    },
    {
      path: '/confirmOrder', component: confirmOrder,//确认订单页
      children: [
        { path: 'remark', component: remark },//订单备注
        { path: 'invoice', component: invoice },//发票抬头
        { path: 'payment', component: payment },//付款页面
        { path: 'userValidation', component: userValidation },//用户验证
        {
          path: 'chooseAddress', component: chooseAddress,//选择地址
          children: [{
            path: 'addAddress', component: addAddress,//添加地址
            children: [{ path: 'searchAddress', component: searchAddress }]//搜索地址
          }]
        },
      ]
    },
    {
      path: '/balance', component: balance,//我的余额
      children: [{ path: 'balanceDetail', component: balanceDetail }]
    },
    { path: '/benefit', component: benefit,
    children: [
      { path: 'hbDescription', component: hbDescription },//红包说明
      { path: 'hbHistory', component: hbHistory },//红包历史
      { path: 'exchange', component: exchange },//兑换红包
      { path: 'commend', component: commend },//推荐有奖
      { path: 'coupon', component: coupon },//代金券说明
    ]},//我的优惠
    { path: '/points', component: points },//我的积分
    {
      path: '/order', component: order,//我的订单
      children: [{ path: 'orderDetail', component: orderDetail, }]//订单详情页
    },
    {
      path: '/vipCard', component: vipCard,
      children: [
        { path: 'invoiceRecord', component: invoiceRecord },//开发票
        { path: 'useCart', component: useCart },//购买会员卡
        { path: 'vipDescription', component: vipDescription },//会员说明
      ]
    },//积分商城
    { path: '/download', component: download },//饿了吗会员卡
    {
      path: '/service', component: service,
      children: [{ path: 'questionDetail', component: questionDetail }]
    },//服务中心
    { path: '/download', component: download },//下载页
    { path: '/forget', component: forget },//修改密码页
  ]
}]