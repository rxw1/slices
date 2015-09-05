import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Layout from '../components/Layout/Layout';
import * as actions from '../actions/types';
import * as SlicesActions from '../actions/slices';
import * as PostsActions from '../actions/posts';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, location, ...other } = this.props;
    const { pathname } = location;
    const value = pathname.substring(1);

    return (
      <Layout value={value} {...other}>
        {children}
      </Layout>
    );
  }
}

App.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    ...state
  };
}

function mapDispatchToProps(dispatch) {
  // FIXME do children have all neccessary action-functions available?
  return bindActionCreators({...SlicesActions, ...PostsActions}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
