import { SAVE_TOKEN, REMOVE_TOKEN, SAVE_USERINFO } from './actionType';



function token(state = sessionStorage.getItem('token'), action: any) {
  switch (action.type) {
    case SAVE_TOKEN:
      return action.token;
    case REMOVE_TOKEN:
      return ''
    default:
      return state
  }
}

function userInfo(state: object = {}, action: any) {
  switch (action.type) {
    case SAVE_USERINFO:
      return action.userInfo;
    default:
      return state
  }
}


export default {
  token,
  userInfo
};
