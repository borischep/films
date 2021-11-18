import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Login from './components/login';
import ProtectedRoute from './components/protected-route';
import DynamicRoute from './components/dynamic-route/dynamic-route';
import './global.css';
const Films = React.lazy(() => import('./components/films'));

const App = () => (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Suspense fallback={<div>Loading...</div>}>
          <ProtectedRoute path="/films" exact component={Films} />
        </Suspense>
        <DynamicRoute />
      </Switch>
    </Router>
);

export default App;
