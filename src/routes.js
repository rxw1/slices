import React from 'react';
import { Route, Redirect } from 'react-router';
import App from './containers/App';
import Slices from './components/Slices';
import SliceView from './components/SliceView';
import TestForm from './components/TestForm';

export default (
	<Route path='/' component={App}>
		<Route path='slices' component={Slices} />
		<Route path='slices/:sliceID' component={SliceView} />
		<Route path='form' component={TestForm} />
		<Redirect from='/' to='slices' />
	</Route>
)
