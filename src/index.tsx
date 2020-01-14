import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/es/locale-provider/zh_CN';
import store from '@/store'
import App from '@/App';
import '@/assets/styles/app.less';

import '@/mock';


ReactDOM.render((
  <Provider store={store}>
    <ConfigProvider locale={zh_CN}>
      <App />
    </ConfigProvider>
  </Provider>
), document.getElementById('root'));




