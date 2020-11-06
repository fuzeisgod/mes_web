import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';



ReactDOM.render(
  <Suspense fallback={<div>Loading...</div>}>
    <Router>
      <Route path="/" component={App}></Route>
    </Router>
  </Suspense>
  ,
  document.getElementById('root')
);