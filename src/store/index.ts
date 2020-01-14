import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import account from './account/reducer';

const reducer = combineReducers({
  ...account,
});

const store = createStore(reducer, applyMiddleware(thunk));

// store.subscribe(() => {
//   console.log('store发生了变化');
// });

export default store;


