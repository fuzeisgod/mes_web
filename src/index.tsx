import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { mainRoutes } from './routes'
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Switch>
          {
            mainRoutes.map(route => (
              <Route path={route.pathName} component={route.component} key={route.pathName} />
            ))
          }
          <Route path="/" component={App} />
        </Switch>
      </Router>
    </Suspense>
  </ConfigProvider>
  ,
  document.getElementById('root')
);
