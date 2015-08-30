import React from 'react';
import { Route, Redirect } from 'react-router';
import App from './containers/App';
import Slices from './components/Slices';
import SliceView from './components/SliceView';

export default (
	<Route path='/' component={App}>
		<Route path='slices' component={Slices} />
		<Route path='slices/:sliceID' component={SliceView} />
		<Redirect from='/' to='slices' />
	</Route>
)
