import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Login from './components/login';
import ProtectedRoute from './components/protected-route';
import FilmPage from './components/film-page';
import './global.css';
import Header from './components/header/header';
import Profile from './components/profile/profile';

const Films = React.lazy(() => import('./components/films'));

const App = () => (
  <Router>
    <Header />
    <Switch>
      <Route path="/" exact component={Login} />
      <ProtectedRoute path="/profile" component={Profile} />
      <ProtectedRoute path="/films/:id" component={FilmPage} />
      <Suspense fallback={<div>Loading...</div>}>
        <ProtectedRoute path="/films" component={Films} />
      </Suspense>
    </Switch>
  </Router>
);

export default App;
