import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import routes from '../routes';
import configureStore from '../store/configureStore';
// import { DevTools, LogMonitor, DebugPanel } from 'redux-devtools/lib/react';

const store = configureStore();

export default class Root extends Component {
  renderRouter() {
    return (
      <Router {...this.props.initialRouterState} />
    );
  }

  render() {
    return (
      <div>
        <Provider store={store}>
          {() => this.renderRouter()}
        </Provider>
      </div>
    );
  }
}

Root.propTypes = {
  history: PropTypes.object,
  initialRouterState: PropTypes.object
};
