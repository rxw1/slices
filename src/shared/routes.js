import React from 'react';
import { Route, Redirect } from 'react-router';
import App from './containers/App';
import Slices from './components/Slices';
import Slice from './components/Slice';

export default (
	<Route path='/' component={App}>
		<Route path='slices' component={Slices} />
		<Route path='slices/:sliceID' component={Slices} />
		<Redirect from='/' to='/slices' />
	</Route>
)
