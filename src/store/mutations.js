import {
	RECORD_ADDRESS,
	ADD_CART,
	REDUCE_CART,
	INIT_BUYCART,
	CLEAR_CART,
	RECORD_SHOPDETAIL,
	RECORD_USERINFO,
	GET_USERINFO,
	CONFIRM_REMARK,
	CONFIRM_INVOICE,
	CHOOSE_SEARCH_ADDRESS,
	SAVE_GEOHASH,
	CHOOSE_ADDRESS,
	NEED_VALIDATION,
	SAVE_CART_ID_SIG,
	SAVE_ORDER_PARAM,
	CHANGE_ORDER_PARAM,
	ORDER_SUCCESS,
	SAVE_SHOPID,
	SAVE_ORDER,
	OUT_LOGIN,
	RETSET_NAME,
	SAVE_AVANDER,
	SAVE_ADDRESS,
	SAVE_ADDDETAIL,
	SAVE_QUESTION,
	ADD_ADDRESS,
	BUY_CART,
} from './mutation-type'
import { getStore, setStore } from '@/config/mUtils'


export default {
  // 记录当前位置经度纬度
  [RECORD_ADDRESS](state, { latitude, longitude }) {
    state.latitude = latitude;
    state.longitude = longitude;
  }
  // 加入购物车
  , [ADD_CART](state, { shopid, category_id, item_id, food_id, name, price, specs }) {
    let cart = state.cartList;
    if (cart[shopid] && cart[shopid][category_id] && cart[shopid][category_id][item_id] && cart[shopid][category_id][item_id][food_id]) {
      cart[shopid][category_id][item_id][food_id]['num']++;
    }
    else if (cart[shopid] && cart[shopid][category_id] && cart[shopid][category_id][item_id]) {
      cart[shopid][category_id][item_id][food_id] = {};
      cart[shopid][category_id][item_id][food_id]['num'] = 1;
      cart[shopid][category_id][item_id][food_id]['name'] = name;
      cart[shopid][category_id][item_id][food_id]['price'] = price;
      cart[shopid][category_id][item_id][food_id]['specs'] = specs;
    }
    else if (cart[shopid] && cart[shopid][category_id]) {
      cart[shopid][category_id][item_id] = {};
      cart[shopid][category_id][item_id][food_id] = {};
      cart[shopid][category_id][item_id][food_id]['num'] = 1;
      cart[shopid][category_id][item_id][food_id]['name'] = name;
      cart[shopid][category_id][item_id][food_id]['price'] = price;
      cart[shopid][category_id][item_id][food_id]['specs'] = specs;
    }
    else if (cart[shopid]) {
      cart[shopid][category_id] = {};
      cart[shopid][category_id][item_id] = {};
      cart[shopid][category_id][item_id][food_id] = {};
      cart[shopid][category_id][item_id][food_id]['num'] = 1;
      cart[shopid][category_id][item_id][food_id]['name'] = name;
      cart[shopid][category_id][item_id][food_id]['price'] = price;
      cart[shopid][category_id][item_id][food_id]['specs'] = specs;
    }
    else {
      cart[shopid] = {};
      cart[shopid][category_id] = {};
      cart[shopid][category_id][item_id] = {};
      cart[shopid][category_id][item_id][food_id] = {};
      cart[shopid][category_id][item_id][food_id]['num'] = 1;
      cart[shopid][category_id][item_id][food_id]['name'] = name;
      cart[shopid][category_id][item_id][food_id]['price'] = price;
      cart[shopid][category_id][item_id][food_id]['specs'] = specs;
    }
    state.cartList = Object.assign({}, cart);
    setStore('buyCart', state.cartList);
  }
  // 移除购物车
  , [REDUCE_CART](state, { shopid, category_id, item_id, food_id, name, price, specs }) {
    let cart = state.cartList;
    if (cart[shopid] && cart[shopid][category_id] && cart[shopid][category_id][item_id] && cart[shopid][category_id][item_id][food_id]) {
      if (cart[shopid][category_id][item_id][food_id]['num'] > 0) {
        cart[shopid][category_id][item_id][food_id]['num']--;
        state.cartList = Object.assign({}, cart);
        setStore('buyCart', state.cartList);
      } else {
        cart[shopid][category_id][item_id][food_id] = null;
      }
    }
  }
  // 初始化购物车
  , [INIT_BUYCART](state) {
    const initCart = getStore('buyCart');
    if (initCart) {
      state.cartList = JSON.parse(initCart);
    }
  }
  // 清空购物车
  , [CLEAR_CART](state, shopid) {
    state.cartList[shopid] = null;
    state.cartList = Object.assign({}, cart);
    setStore('buyCart', state.cartList);
  }
  // 获取用户信息存入vuex
  , [GET_USERINFO](state, info) {
    // state中的用户信息与获取的用户信息不一致，return
    if (state.userInfo && (state.userInfo.username !== info.username)) return;
    // 如果用户没有登录  return
    if (!state.login) return;
    if (!info.message) {
      state.userInfo = info;
      const validity = 30;//cookie的有效期为30天，30天之后将过期。
      let now = new Date();
      now.setTime(now.getTime() + validity * 24 * 60 * 60 * 1000);
      document.cookie = `USERID=${info.user_id};expires=${now.toGMTString()}`;
      document.cookie = `SID=huRyTRd9QLij7NkbpHJoj3PQrx1eRiO6bAiw;expires=${now.toGMTString()}`;
    } else {
      state.userInfo = null;
    }
  }
  // 保存用户信息
  ,[RECORD_USERINFO](state,info){
    state.userInfo = info;
    state.login = true;
    let validity = 30;
    let now = new Date();
    now.setTime(now.getTime() + validity*24*60*60*1000);
    document.cookie = `USERID=${info.user_id};expires=${now.toGMTString()}`;
    document.cookie = `SID=huRyTRd9QLij7NkbpHJoj3PQrx1eRiO6bAiw;expires=${now.toGMTString()}`;
  }
  // 删除地址列表
  ,[SAVE_ADDRESS](state,newAdress){
    state.removeAddress = newAdress;
  }
  ,//保存图片
  [SAVE_AVANDER](state,imgPath){
    state.imgPath = imgPath;
  }
  ,//退出登录
  [OUT_LOGIN](state){
    state.userInfo = null;
    state.login = false;
  }
}