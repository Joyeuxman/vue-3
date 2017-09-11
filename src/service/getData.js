import fetch from '../config/fetch'
import * as home from './tempdata/home'
import * as city from './tempdata/city'
import * as msite from './tempdata/msite'
import * as search from './tempdata/search'
import * as food from './tempdata/food'

// // 获取首页默认地址
// const cityGuess = () => fetch('GET', '/v1/cities', { type: 'guess' });

// // 获取首页热门城市
// const hotcity = () => fetch('GET', '/v1/cities', { type: 'hot' });

// // 获取首页所有城市
// const groupcity = () => fetch('GET', '/v1/cities', { type: 'group' });

// // 获取当前所在城市
// const currentcity = number => fetch('GET', `/v1/cities/${number}`, {});

// // 获取搜索地址
// const searchplace = (cityid, value) => fetch('GET', '/v1/pois', { type: 'search', city_id: cityid, keyword: value });

// 临时数据
const setpromise = data => {
  // console.log('setPromise中，data====',data);
  return new Promise((resolve, reject) => {
    resolve(data);
  })
}

//  获取msite页面地址信息
// export const msiteAddress = geohash => setpromise(msite.msiteAdress);

// // 获取msite页面食品分类列表
// const msiteFoodTypes = geohash => setpromise(msite.foodTypes);

// // 获取msite页面商铺列表
// const msiteShopList = (latitude, longitude, offset) => setpromise(msite.shopList);



// export { cityGuess, hotcity, groupcity, currentcity, searchplace, msiteAddress, msiteFoodTypes, msiteShopList }

// 获取msite商铺列表
export const msiteShopList = (latitude, longitude, offset, restaurant_category_id = '', restaurant_category_ids = '', order_by = '', delivery_mode = '', support_ids = []) => {
	let supportStr = '';
	support_ids.forEach(item => {
		if (item.status) {
			supportStr += '&support_ids[]=' + item.id;
		}
	});
	let data = {latitude, longitude, offset, limit: '20', 'extras[]':'activities', keyword: '', restaurant_category_id, 'restaurant_category_ids[]': restaurant_category_ids, order_by, 'delivery_mode[]':delivery_mode + supportStr};
	return fetch('GET', '/api/shopping/restaurants', data);
} 
// 获取search页面搜索结果
export const searchRestaurant =(geohash,keyword)=>fetch('GET','/api/v4/restaurants',{'extras[]':'restaurant_activity',geohash,keyword,type:'search'});
// 获取food页面的category种类列表
export const foodCategory = (latitude,longitude) =>fetch('GET','/api/shopping/v2/restaurant/category',{latitude,longitude});
// 获取food页面的配送方式
export const foodDelivery =(latitude,longitude)=>fetch('GET','/api/shopping/v1/restaurants/delivery_modes',{latitude,longitude,kw:''});
// 获取food页面的商家属性活动列表
export const foodActivity =(latitude,longitude) =>fetch('GET','/api/shopping/v1/restaurants/activity_attributes',{latitude,longitude,kw:''});

export const cityGuess = () => setpromise(home.guesscity);
export const hotcity = () => setpromise(home.hotcity);
export const groupcity = () => setpromise(home.groupcity);
export const currentcity = number => setpromise(city.currentcity);
export const searchplace = (cityid, value) => setpromise(city.searchdata);
export const msiteAddress = geohash => setpromise(msite.msiteAdress);
export const msiteFoodTypes = geohash => setpromise(msite.foodTypes);
