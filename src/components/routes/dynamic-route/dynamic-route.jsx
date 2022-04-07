import React from 'react';
import { Route } from 'react-router-dom';
import FilmPage from '../film-page';

const DynamicRoute = () => {
  return <Route path="/films/:id" component={FilmPage} />;
}

export default DynamicRoute;
