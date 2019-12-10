import { SAVE_TOKEN } from './action-type';

function saveToken(token: string) {
  return {
    type: SAVE_TOKEN,
    token
  }
}


export {
  saveToken
}
