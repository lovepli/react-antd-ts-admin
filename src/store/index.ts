import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import * as account from './account/reducer';

const reducer = combineReducers({
  ...account,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
