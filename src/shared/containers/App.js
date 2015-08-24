import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Layout from '../components/Layout/Layout';
import * as actions from '../actions/types';
import * as SlicesActions from '../actions/slices';

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
    slices: state.slices,
    languages: state.languages,
    selected: state.selected,
    references: state.references
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SlicesActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
