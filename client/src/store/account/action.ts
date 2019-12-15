import { SAVE_TOKEN, REMOVE_TOKEN, SAVE_USERINFO } from './actionType';


function saveToken(token: string) {
  sessionStorage.setItem('token', token);
  return {
    type: SAVE_TOKEN,
    token
  }
}

// 应该尽量减少在 action 中传递的数据。
function removeToken() {
  sessionStorage.removeItem('token');
  return {
    type: REMOVE_TOKEN
  }
}

function saveUserInfo(userInfo: any) {
  return {
    type: SAVE_USERINFO,
    userInfo
  }
}






export {
  saveToken,
  removeToken,
  saveUserInfo,
}
