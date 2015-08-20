import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import Layout from './components/Layout';

export default (
  <Route component={Layout}>
  	<Route name='home' path='/' component={App} />
  </Route>
)
