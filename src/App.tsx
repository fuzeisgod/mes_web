// import './App.less'
// import { Frame, Loading } from './components';
// import { Suspense, useState } from 'react'
// import { adminRoutes } from './routes'
// import { Route, Switch, Redirect } from 'react-router-dom'
// import { insertUserId } from './tools'

// function App() {
//   const [isLogin, setIsLogin] = useState(true)

//   return (
//     isLogin
//       ?
//       <Frame>
//         <Suspense fallback={<Loading />}>
//           <Switch>
//             {
//               adminRoutes.map(route => (
//                 route.isSubMenu ?
//                   route.subMenu.map(subRoute => (
//                     <Route
//                       path={subRoute.pathName}
//                       key={subRoute.pathName}
//                       component={subRoute.component}
//                       exact={subRoute.exact}
//                     />
//                   ))
//                   :
//                   <Route
//                     path={route.pathName}
//                     key={route.pathName}
//                     component={route.component}
//                     exact={route.exact}
//                   />
//               ))
//             }
//             <Redirect
//               // you need insert userid here
//               to={insertUserId(adminRoutes[0].pathName, 'my-userid')}
//               from="/"
//               exact />
//             <Redirect to="/404" />
//           </Switch>
//         </Suspense>
//       </Frame>
//       :
//       <Redirect to="/login" />
//   );
// }

// export default App;

import React from 'react';

const App = () => {
  return (
    <div>hello typescript</div>
  )
}

export default App;
