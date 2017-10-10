import fetch from '../config/fetch'
import * as home from './tempdata/home'
import * as city from './tempdata/city'
import * as msite from './tempdata/msite'
import * as search from './tempdata/search'
import * as food from './tempdata/food'
import * as shop from './tempdata/shop'
import * as login from './tempdata/login'
import * as confirm from './tempdata/confirm'
import * as order from './tempdata/order'
import * as service from './tempdata/service'
import * as addDetail from './tempdata/addDetail'
import * as addresspart from './tempdata/address'
import * as vip from './tempdata/vip'
import * as hongbao from './tempdata/hongbao'


// // 获取首页默认地址
// export const cityGuess = () => fetch('GET', '/api/v1/cities', { type: 'guess' });

// // 获取首页热门城市
// export const hotcity = () => fetch('GET', '/api/v1/cities', { type: 'hot' });

// // 获取首页所有城市
// export const groupcity = () => fetch('GET', '/api/v1/cities', { type: 'group' });

// // 获取当前所在城市
// export const currentcity = number => fetch('GET', `/api/v1/cities/${number}`, {});

// // 获取搜索地址
// export const searchplace = (cityid, value) => fetch('GET', '/api/v1/pois', { type: 'search', city_id: cityid, keyword: value });

// // 获取msite页面地址信息
// export const msiteAddress = geohash => fetch('GET', `/api/v2/pois/${geohash}`, {});

// // 获取msite页面食品分类列表
// export const msiteFoodTypes = geohash => fetch('GET', `/api/v2/index_entry`, {geohash,group_type:'1','flags[]':'F'});

// // 获取search页面搜索结果
// export const searchRestaurant =(geohash,keyword)=>fetch('GET','/api/v4/restaurants',{'extras[]':'restaurant_activity',geohash,keyword,type:'search'});

// // 获取food页面的category种类列表
// export const foodCategory = (latitude,longitude) =>fetch('GET','/api/shopping/v2/restaurant/category',{latitude,longitude});

// // 获取food页面的配送方式
// export const foodDelivery =(latitude,longitude)=>fetch('GET','/api/shopping/v1/restaurants/delivery_modes',{latitude,longitude,kw:''});

// // 获取food页面的商家属性活动列表
// export const foodActivity =(latitude,longitude) =>fetch('GET','/api/shopping/v1/restaurants/activity_attributes',{latitude,longitude,kw:''});

// // 获取msite商铺列表
// export const msiteShopList = (latitude, longitude, offset, restaurant_category_id = '', restaurant_category_ids = '', order_by = '', delivery_mode = '', support_ids = []) => {
// 	let supportStr = '';
// 	support_ids.forEach(item => {
// 		if (item.status) {
// 			supportStr += '&support_ids[]=' + item.id;
// 		}
// 	});
// 	let data = {latitude, longitude, offset, limit: '20', 'extras[]':'activities', keyword: '', restaurant_category_id, 'restaurant_category_ids[]': restaurant_category_ids, order_by, 'delivery_mode[]':delivery_mode + supportStr};
// 	return fetch('GET', '/api/shopping/restaurants', data);
// } 




// 临时数据
const setpromise = data => {
  // console.log('setPromise中，data====',data);
  return new Promise((resolve, reject) => {
    resolve(data);
  })
}


// export const cityGuess = () => setpromise(home.guesscity);
// export const hotcity = () => setpromise(home.hotcity);
// export const groupcity = () => setpromise(home.groupcity);
// export const currentcity = number => setpromise(city.currentcity);
// export const searchplace = (cityid, value) => setpromise(city.searchdata);
// export const msiteAddress = geohash => setpromise(msite.msiteAdress);
// export const msiteFoodTypes = geohash => setpromise(msite.foodTypes);

export const cityGuess = () => setpromise(home.guesscity);
export const hotcity = () => setpromise(home.hotcity);
export const groupcity = () => setpromise(home.groupcity);
export const currentcity = number => setpromise(city.currentcity);
export const searchplace = (cityid, value) => setpromise(city.searchdata);
// export const msiteAdress = geohash => setpromise(msite.msiteAdress);
export const msiteFoodTypes = geohash => setpromise(msite.foodTypes);
export const shopList = (latitude, longitude, offset) => setpromise(msite.shopList);
export const searchRestaurant = (geohash, keyword) => setpromise(search.searchData);
export const foodCategory = (latitude, longitude) => setpromise(food.category);
export const foodDelivery = (latitude, longitude) => setpromise(food.delivery);
export const foodActivity = (latitude, longitude) => setpromise(food.activity);
export const shopDetails = (shopid, latitude, longitude) => setpromise(shop.shopDetails);
export const foodMenu = restaurant_id => setpromise(shop.shopMenu);
export const getRatingList = (offset, tag_name = '') => setpromise(shop.ratingList);
export const ratingScores = shopid => setpromise(shop.scores);
export const ratingTags = shopid => setpromise(shop.tage);
export const mobileCode = phone => setpromise(login.validate_token);
export const accountLogin = (username, password, captcha_code) => setpromise(login.userInfo);
export const checkExsis = (checkNumber, type) => setpromise(login.checkExsis);
export const sendMobile = (sendData, captcha_code, type, password) => setpromise(login.send);
export const checkout = (geohash, entities) => setpromise(confirm.checkout);
export const getRemark = (id, sig) => setpromise(confirm.remark);
export const getAddress = (id, sig) => setpromise(confirm.addressList);
export const getcaptchas = () => setpromise(login.cpatchs);
export const searchNearby = keyword => setpromise(confirm.searchAddress);
export const postAddAddress = (userId, address, address_detail, geohash, name, phone, phone_bk, poi_type, sex, tag, tag_type) => setpromise(confirm.addAddress);
export const placeOrders = (user_id, cart_id, address_id, description, entities, geohash, sig) => setpromise(confirm.palceOrder);
export const rePostVerify = (cart_id, sig, type) => setpromise(confirm.verfiyCode);
export const validateOrders = ({
	user_id,
	cart_id,
	address_id,
	description,
	entities,
	geohash,
	sig,
	validation_code,
	validation_token
}) => setpromise(confirm.orderSuccess);
export const payRequest = (merchantOrderNo, userId) => setpromise(confirm.payDetail);
export const getService = () => setpromise(service.serviceData);
export const vipCart= (id, number, password) => setpromise(vip.vipcart);
export const getHongbaoNum= id => setpromise(hongbao.dataList);





export const getUser = () => setpromise(login.userInfo);
export const sendLogin = (code, mobile, validate_token) => setpromise(login.userInfo);
export const getOrderList = (user_id, offset) => setpromise(order.orderList);
export const getOrderDetail = (user_id, orderid) => setpromise(order.orderDetail);

export const getAddressList = (user_id) => setpromise(addresspart.address)
export const getSearchAddress=(keyword) => setpromise(addDetail.addData)
