import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Films from './components/films';
import Login from './components/login';
import ProtectedRoute from './components/protected-route';

const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact>
        <Login />
      </Route>
      <ProtectedRoute path="/films" component={Films} />
    </Switch>
  </Router>
);

export default App;
