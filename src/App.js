import './App.less'
import { Frame } from './components';
import { Button } from 'antd'
import { Suspense } from 'react'


import { adminRoutes } from './routes'
import { Route, Switch, Redirect } from 'react-router-dom'

function App() {
  return (
    <>
      <Frame>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            {
              adminRoutes.map(route => (
                <Route
                  path={route.pathName}
                  key={route.pathName}
                  component={route.component}
                />
              ))
            }
          </Switch>
        </Suspense>
      </Frame>
    </>
  );
}

export default App;
