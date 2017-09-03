import App from '../App'
// 组件
const home = r => require.ensure([], () => r(require('@P/home/home')), 'home');
const city = r => require.ensure([], () => r(require('@P/city/city')), 'city');
const msite = r => require.ensure([], () => r(require('@P/msite/msite')), 'msite');


export default [{
  path: '',
  component: App,
  children: [
    {//地址为空时跳转home页面
      path: '',
      redirect: '/home'
    },
    {//首页城市列表页面
      path: '/home',
      component: home
    },
    {//当前选择城市页面
      path: '/city',
      component: city
    },
    {//所有商铺列表页面
      path: '/msite',
      component: msite
    }
  ]
}]