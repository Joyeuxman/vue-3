import { RECORD_ADDRESS, ADD_CART, REDUCE_CART,INIT_BUYCART,CLEAR_CART } from './mutation-type'
import {getStore,setStore} from '@/config/mUtils'


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
    state.cartList = Object.assign({},cart);
    setStore('buyCart',state.cartList);
  }
  // 移除购物车
  ,[REDUCE_CART](state,{shopid, category_id, item_id, food_id, name, price, specs}){
    let cart = state.cartList;
    if (cart[shopid] && cart[shopid][category_id] && cart[shopid][category_id][item_id] && cart[shopid][category_id][item_id][food_id]) {
      if(cart[shopid][category_id][item_id][food_id]['num'] > 0){
        cart[shopid][category_id][item_id][food_id]['num'] --;
        state.cartList = Object.assign({},cart);
        setStore('buyCart',state.cartList);
      }else{
        cart[shopid][category_id][item_id][food_id] = null;
      }
    }
  }
  // 初始化购物车
  ,[INIT_BUYCART](state){
    const initCart = getStore('buyCart');
    if(initCart){
      state.cartList = JSON.parse(initCart);
    }
  }
  // 清空购物车
  ,[CLEAR_CART](state,shopid){
    state.cartList[shopid] = null;
    state.cartList = Object.assign({},cart);
    setStore('buyCart',state.cartList);
  }
}