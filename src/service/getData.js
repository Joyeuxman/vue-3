import fetch from '../config/fetch'
import * as home from './tempdata/home'
import * as city from './tempdata/city'
import * as msite from './tempdata/msite'
import * as search from './tempdata/search'
import * as food from './tempdata/food'
import * as shop from './tempdata/shop'


// 获取首页默认地址
export const cityGuess = () => fetch('GET', '/api/v1/cities', { type: 'guess' });

// 获取首页热门城市
export const hotcity = () => fetch('GET', '/api/v1/cities', { type: 'hot' });

// 获取首页所有城市
export const groupcity = () => fetch('GET', '/api/v1/cities', { type: 'group' });

// 获取当前所在城市
export const currentcity = number => fetch('GET', `/api/v1/cities/${number}`, {});

// 获取搜索地址
export const searchplace = (cityid, value) => fetch('GET', '/api/v1/pois', { type: 'search', city_id: cityid, keyword: value });

// 获取msite页面地址信息
export const msiteAddress = geohash => fetch('GET', `/api/v2/pois/${geohash}`, {});

// 获取msite页面食品分类列表
export const msiteFoodTypes = geohash => fetch('GET', `/api/v2/index_entry`, {geohash,group_type:'1','flags[]':'F'});

// 获取search页面搜索结果
export const searchRestaurant =(geohash,keyword)=>fetch('GET','/api/v4/restaurants',{'extras[]':'restaurant_activity',geohash,keyword,type:'search'});

// 获取food页面的category种类列表
export const foodCategory = (latitude,longitude) =>fetch('GET','/api/shopping/v2/restaurant/category',{latitude,longitude});

// 获取food页面的配送方式
export const foodDelivery =(latitude,longitude)=>fetch('GET','/api/shopping/v1/restaurants/delivery_modes',{latitude,longitude,kw:''});

// 获取food页面的商家属性活动列表
export const foodActivity =(latitude,longitude) =>fetch('GET','/api/shopping/v1/restaurants/activity_attributes',{latitude,longitude,kw:''});

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




// 临时数据
const setpromise = data => {
  // console.log('setPromise中，data====',data);
  return new Promise((resolve, reject) => {
    resolve(data);
  })
}

export const shopDetails = (shopid, latitude, longitude) => setpromise(shop.shopDetails);
export const foodMenu = restaurant_id => setpromise(shop.shopMenu);

// export const cityGuess = () => setpromise(home.guesscity);
// export const hotcity = () => setpromise(home.hotcity);
// export const groupcity = () => setpromise(home.groupcity);
// export const currentcity = number => setpromise(city.currentcity);
// export const searchplace = (cityid, value) => setpromise(city.searchdata);
// export const msiteAddress = geohash => setpromise(msite.msiteAdress);
// export const msiteFoodTypes = geohash => setpromise(msite.foodTypes);
