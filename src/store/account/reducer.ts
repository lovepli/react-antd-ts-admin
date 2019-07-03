import { SAVE_TOKEN } from './action-type';


function token(state = '', action: any) {
  switch (action.type) {
    case SAVE_TOKEN:
      return action.token
    default:
      return state
  }
}



export {
  token
}
