import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Route path="/" component={App}></Route>
      </Router>
    </Suspense>
  </ConfigProvider>
  ,
  document.getElementById('root')
);