import { RECORD_ADDRESS } from './mutation-type'

export default {
  // 记录当前位置经度纬度
  [RECORD_ADDRESS](state, { latitude, longitude }) {
    state.latitude = latitude;
    state.longitude = longitude;
  }
}