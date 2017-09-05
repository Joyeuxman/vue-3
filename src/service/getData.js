import fetch from '../config/fetch'
import * as home from './tempdata/home'
import * as city from './tempdata/city'
import * as msite from './tempdata/msite'

// 获取首页默认地址
const cityGuess = () => fetch('GET', '/v1/cities', { type: 'guess' });

// 获取首页热门城市
const hotcity = () => fetch('GET', '/v1/cities', { type: 'hot' });

// 获取首页所有城市
const groupcity = () => fetch('GET', '/v1/cities', { type: 'group' });

// 获取当前所在城市
const currentcity = number => fetch('GET', `/v1/cities/${number}`, {});

// 获取搜索地址
const searchplace = (cityid, value) => fetch('GET', '/v1/pois', { type: 'search', city_id: cityid, keyword: value });

// 临时数据
const setpromise = data => {
  // console.log('setPromise中，data====',data);
  return new Promise((resolve, reject) => {
    resolve(data);
  })
}
//  获取msite页面地址信息
const msiteAddress = geohash => setpromise(msite.msiteAdress);

// 获取msite页面食品分类列表
const msiteFoodTypes = geohash => setpromise(msite.foodTypes);

// 获取msite页面商铺列表
const msiteShopList = (latitude, longitude, offset) => setpromise(msite.shopList);


export { cityGuess, hotcity, groupcity, currentcity, searchplace, msiteAddress, msiteFoodTypes, msiteShopList }