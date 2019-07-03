// js入口文件
import 'babel-polyfill';
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';


import store from './store'
import App from './App';
import "@/styles/antd.less";

import './mock';


ReactDOM.render((
  <Provider store={store}>
    <LocaleProvider locale={zh_CN}>
      <App />
    </LocaleProvider>
  </Provider>
), document.getElementById('root'));





