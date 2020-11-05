import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Frame } from './components'


ReactDOM.render(
  <Frame>
    <App />
  </Frame>,
  document.getElementById('root')
);