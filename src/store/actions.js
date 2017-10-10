import { getUser, getAddressList } from '@/service/getData'
import { GET_USERINFO, SAVE_ADDRESS } from './mutation-type'

export default {
  // getData({ commit, state }) {
  //   cityGuess().then(res => {
  //     commit(GET_DATA, { data: res });
  //   })
  // }
  async getUserInfo({ commit, state }) {
    let res = await getUser();
    commit(GET_USERINFO, res);
  },
  async saveAddress({ commit, state }) {
    if (state.removeAddress.length > 0) return;
    let address = await getAddressList();
    commit(SAVE_ADDRESS, address);
  }
}